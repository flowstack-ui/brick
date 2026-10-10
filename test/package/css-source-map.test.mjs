import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { bundleCss } from "../../scripts/css-bundler.mjs";
import { decode, encode } from "@jridgewell/sourcemap-codec";
import { canonicalCssSourceMap } from "../../scripts/css-source-map.mjs";

test("CSS map normalization preserves source locations and symbol names", () => {
  const map = canonicalCssSourceMap({ version: 3, sourceRoot: null,
    sources: ["src/b.css", ".brick-cache/production/../../src/a.css"],
    sourcesContent: ["b", "a"], names: ["z", "a"],
    mappings: encode([[[0, 0, 4, 2, 0], [8, 1, 6, 3, 1], [12]]]),
  });
  assert.deepEqual(map.sources, ["src/a.css", "src/b.css"]);
  assert.deepEqual(map.sourcesContent, ["a", "b"]);
  assert.deepEqual(map.names, ["a", "z"]);
  assert.deepEqual(decode(map.mappings), [[[0, 1, 4, 2, 1], [8, 0, 6, 3, 0], [12]]]);
  assert.deepEqual(canonicalCssSourceMap(map), map);
});

test("CSS map source permutations produce identical canonical maps", () => {
  const first = { version: 3, sources: ["src/a.css", "src/b.css"], sourcesContent: ["a", "b"], names: [], mappings: encode([[[0, 0, 0, 0], [4, 1, 1, 0]]]) };
  const second = { ...first, sources: [...first.sources].reverse(), sourcesContent: [...first.sourcesContent].reverse(), mappings: encode([[[0, 1, 0, 0], [4, 0, 1, 0]]]) };
  assert.deepEqual(canonicalCssSourceMap(first), canonicalCssSourceMap(second));
});

test("CSS maps reject machine paths, escapes and inconsistent references", () => {
  const map = { version: 3, sources: ["src/a.css"], sourcesContent: ["a"], names: [], mappings: "" };
  for (const source of ["/Users/example/a.css", "Users/example/a.css", "C:\\project\\a.css", "file:///tmp/a.css", "../private/a.css", "src/../../private/a.css"]) {
    assert.throws(() => canonicalCssSourceMap({ ...map, sources: [source] }));
  }
  assert.throws(() => canonicalCssSourceMap({ ...map, sourceRoot: "/private/project" }));
  assert.throws(() => canonicalCssSourceMap({ ...map, mappings: encode([[[0, 2, 0, 0]]]) }));
  assert.throws(() => canonicalCssSourceMap({ ...map, sources: ["src/a.css", "src/./a.css"], sourcesContent: ["a", "different"] }));
});

test("real asynchronous CSS bundles are identical across independent checkout roots", async () => {
  const root = await mkdtemp(join(tmpdir(), "brick-css-maps-"));
  try {
    const results = [];
    for (const folder of ["first", "second"]) {
      const projectRoot = join(root, folder);
      await mkdir(join(projectRoot, "src"), { recursive: true });
      await writeFile(join(projectRoot, "src/main.css"), '@import "./a.css"; @import "./b.css";');
      await writeFile(join(projectRoot, "src/a.css"), ".a { color: red; }");
      await writeFile(join(projectRoot, "src/b.css"), ".b { padding: 4px; }");
      for (let index = 0; index < 100; index++) {
        const result = await bundleCss({ filename: join(projectRoot, "src/main.css"), projectRoot, minify: true, sourceMap: true });
        results.push({ code: result.code.toString(), map: canonicalCssSourceMap(result.map.toString()) });
      }
    }
    for (const result of results) assert.deepEqual(result, results[0]);
    assert.ok(results[0].map.sources.every((source) => source.startsWith("src/")));
    const segments = decode(results[0].map.mappings)[0];
    assert.equal(results[0].map.sources[segments[0][1]], "src/a.css");
    assert.equal(results[0].map.sources[segments[1][1]], "src/b.css");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
