import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageRoot = new URL("../", import.meta.url);

test("package metadata defines the Brick boundary", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", packageRoot), "utf8"),
  );

  assert.equal(packageJson.name, "@flowstack-ui/brick");
  assert.equal(packageJson.dependencies["@flowstack-ui/atom"], "0.2.0");
  assert.deepEqual(packageJson.exports["."], {
    types: "./dist/index.d.ts",
    default: "./dist/index.js",
  });
});

test("built package entrypoint can be imported", async () => {
  const brick = await import(new URL("../dist/index.js", import.meta.url));
  assert.deepEqual(Object.keys(brick), []);
});
