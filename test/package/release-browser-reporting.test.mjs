import assert from "node:assert/strict";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { withBrowserRunnerFixture } from "./release-browser-fixture.mjs";

const runner = fileURLToPath(
  new URL("../../scripts/run-release-browser-tests.mjs", import.meta.url),
);

for (const outcome of ["passed", "missing", "flaky", "mismatch"]) {
  test(
    `release runner ${outcome} shard report`,
    { skip: process.platform === "win32" },
    () => {
      withBrowserRunnerFixture({ outcome }, (cwd, env) => {
        const result = spawnSync(process.execPath, [runner, "webkit"], {
          cwd,
          encoding: "utf8",
          env,
        });
        const fails = outcome !== "passed";
        assert.equal(result.status, fails ? 1 : 0, result.stderr);
        const releases = join(cwd, "test-results");
        const summary = JSON.parse(
          readFileSync(
            join(releases, readdirSync(releases)[0], "summary.json"),
            "utf8",
          ),
        );
        assert.equal(summary.status, fails ? "failed" : "passed");
        assert.equal(summary.runs.length, fails ? 1 : 2);
        assert.equal(
          new Set(summary.runs.map((run) => run.artifactDirectory)).size,
          summary.runs.length,
        );
        for (const run of summary.runs) {
          assert.ok(run.durationMs >= 0);
          assert.equal(run.plannedTests, 40);
          assert.equal(run.contextBudget, 40);
        }
      });
    },
  );
}
