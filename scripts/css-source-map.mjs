import assert from "node:assert/strict";
import { posix, win32 } from "node:path";
import { decode, encode } from "@jridgewell/sourcemap-codec";

// Lightning CSS can assign source indices in asynchronous import-read order.
// Reindex decoded mappings, not just the sources array, so debug locations stay
// correct while archives remain independent of scheduling and checkout paths.
export function canonicalCssSourceMap(input) {
  const map = typeof input === "string" ? JSON.parse(input) : input;
  assert.equal(map.version, 3, "Expected a version-three CSS source map");
  assert.ok(!map.sourceRoot, "CSS source maps must not retain a machine source root");
  assert.equal(map.sources.length, map.sourcesContent.length);
  const content = new Map();
  const normalized = map.sources.map((source, index) => {
    assert.equal(typeof source, "string");
    assert.ok(!posix.isAbsolute(source) && !win32.isAbsolute(source) && !/^[a-z][a-z\d+.-]*:/iu.test(source), "CSS source paths must be package-relative");
    const path = posix.normalize(source.replaceAll("\\", "/"));
    assert.ok(path.startsWith("src/") || path.startsWith(".brick-cache/"), "CSS source paths must stay within public package inputs");
    if (content.has(path)) assert.equal(content.get(path), map.sourcesContent[index], "Conflicting CSS source contents");
    content.set(path, map.sourcesContent[index]);
    return path;
  });
  const sources = [...content.keys()].sort();
  const names = [...new Set(map.names)].sort();
  const sourceIndices = normalized.map((source) => sources.indexOf(source));
  const nameIndices = map.names.map((name) => names.indexOf(name));
  const mappings = decode(map.mappings);
  for (const line of mappings) for (const segment of line) {
    if (segment.length > 1) {
      assert.ok(Number.isInteger(sourceIndices[segment[1]]), "Invalid CSS source index");
      segment[1] = sourceIndices[segment[1]];
    }
    if (segment.length > 4) {
      assert.ok(Number.isInteger(nameIndices[segment[4]]), "Invalid CSS name index");
      segment[4] = nameIndices[segment[4]];
    }
  }
  return { version: 3, sourceRoot: "", mappings: encode(mappings), sources, sourcesContent: sources.map((source) => content.get(source)), names };
}
