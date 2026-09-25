import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { fileURLToPath } from "node:url";

const runner = fileURLToPath(new URL("../../scripts/run-release-browser-tests.mjs", import.meta.url));

for (const outcome of ["passed", "missing", "flaky"]) {
  const missingReport = outcome === "missing";
  const fails = outcome !== "passed";
  test(`release runner ${outcome} shard report`, { skip: process.platform === "win32" }, () => {
    const directory = mkdtempSync(join(tmpdir(), "brick-runner-test-"));
    try {
      const bin = join(directory, "bin");
      mkdirSync(bin);
      writeFileSync(join(bin, "npx"), `#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
if (!${missingReport}) {
  fs.mkdirSync(process.env.FLOWSTACK_TEST_ARTIFACT_DIR, {recursive:true});
  fs.writeFileSync(path.join(process.env.FLOWSTACK_TEST_ARTIFACT_DIR, "report.json"), JSON.stringify({stats:{expected:1,unexpected:0,skipped:0,flaky:${outcome === "flaky" ? 1 : 0}}}));
}
`, { mode: 0o755 });
      const result = spawnSync(process.execPath, [runner, "webkit"], { cwd: directory, encoding: "utf8", env: { ...process.env, FLOWSTACK_RELEASE_SHARD_GROUP: "", PATH: `${bin}${delimiter}${process.env.PATH}` } });
      assert.equal(result.status, fails ? 1 : 0, result.stderr);
      const releases = join(directory, "test-results");
      const summary = JSON.parse(readFileSync(join(releases, readdirSync(releases)[0], "summary.json"), "utf8"));
      assert.equal(summary.status, fails ? "failed" : "passed");
      assert.equal(summary.runs.length, fails ? 1 : 16);
      assert.equal(new Set(summary.runs.map(run => run.artifactDirectory)).size, summary.runs.length);
      for (const run of summary.runs) assert.ok(run.durationMs >= 0);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
}
