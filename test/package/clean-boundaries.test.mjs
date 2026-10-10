import assert from "node:assert/strict";
import { mkdtemp, mkdir, access, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("package cleaning preserves the built playground and verification evidence", async () => {
  const directory = await mkdtemp(resolve(tmpdir(), "brick-clean-test-"));
  const script = resolve(import.meta.dirname, "../../scripts/clean.mjs");
  try {
    for (const path of ["dist", ".brick-cache", "coverage", "playground/dist", "test-results", "src"]) {
      await mkdir(resolve(directory, path), { recursive: true });
    }
    const run = (args) => {
      const result = spawnSync(process.execPath, [script, ...args], { cwd: directory, encoding: "utf8" });
      assert.equal(result.status, 0, result.stderr);
    };
    run(["--package-only"]);
    await assert.rejects(access(resolve(directory, "dist")));
    await assert.rejects(access(resolve(directory, ".brick-cache")));
    for (const path of ["coverage", "playground/dist", "test-results", "src"]) await access(resolve(directory, path));
    run([]);
    await assert.rejects(access(resolve(directory, "coverage")));
    await assert.rejects(access(resolve(directory, "playground/dist")));
    for (const path of ["test-results", "src"]) await access(resolve(directory, path));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
