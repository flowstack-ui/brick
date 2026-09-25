import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("publication credentials are scoped to their owning jobs", async () => {
  const source = await readFile(new URL("../../.github/workflows/publish.yml", import.meta.url), "utf8");
  const [header, jobs] = source.split("\njobs:\n");
  assert.match(header, /permissions:\n  contents: read\n/);
  assert.doesNotMatch(header, /id-token:|contents: write/);
  const sections = [...jobs.matchAll(/^  ([a-z-]+):\n([\s\S]*?)(?=^  [a-z-]+:\n|$(?![\s\S]))/gm)];
  assert.ok(sections.length >= 7);
  for (const [, name, section] of sections) {
    if (name === "publish") assert.match(section, /permissions:\n      contents: read\n      id-token: write/);
    else assert.doesNotMatch(section, /id-token: write/, name);
    if (name === "release") assert.match(section, /permissions:\n      contents: write/);
    else assert.doesNotMatch(section, /contents: write/, name);
  }
});
