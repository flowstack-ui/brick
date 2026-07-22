import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname } from "node:path";
import test from "node:test";

const packageRoot = new URL("../../", import.meta.url);
const roots = ["src", "scripts", "playground", "docs", "apps"];
const rootFiles = ["AGENTS.md", "README.md", "CHANGELOG.md", "package.json"];
const checkedExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".tsx"]);

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    if (["dist", "node_modules"].includes(entry.name)) continue;
    const url = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) result.push(...(await files(url)));
    else if (checkedExtensions.has(extname(entry.name))) result.push(url);
  }
  return result;
}

test("public repository content has no staging or private-product coupling", async () => {
  const prohibited = [
    "template" + "flow",
    "@template" + "flow/core",
    "packages/" + "core",
    "legacy " + "core",
    "core " + "retirement",
    "core-" + "retirement",
  ];
  const repositoryFiles = await Promise.all(
    rootFiles.map(async (file) => ({
      contents: (await readFile(new URL(file, packageRoot), "utf8")).toLowerCase(),
      name: file,
    })),
  );
  for (const file of repositoryFiles) {
    for (const phrase of prohibited) {
      assert.ok(!file.contents.includes(phrase), `${file.name} contains ${phrase}`);
    }
  }
  for (const root of roots) {
    for (const file of await files(new URL(`${root}/`, packageRoot))) {
      const contents = (await readFile(file, "utf8")).toLowerCase();
      for (const phrase of prohibited) {
        assert.ok(!contents.includes(phrase), `${file.pathname} contains ${phrase}`);
      }
    }
  }
});

test("source imports only public packages and local modules", async () => {
  for (const file of await files(new URL("src/", packageRoot))) {
    const contents = await readFile(file, "utf8");
    assert.doesNotMatch(contents, /@flowstack-ui\/atom\/src|@flowstack-ui\/atom\/dist/);
    assert.doesNotMatch(contents, /(?:^|\/)base(?:\/|$)/);
  }
});
