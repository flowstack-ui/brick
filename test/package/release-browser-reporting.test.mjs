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

test("failed discovery retains stdout diagnostics and launches no browser shards", () => {
  withBrowserRunnerFixture({ discoveryError: true }, (cwd, env) => {
    const result = spawnSync(process.execPath, [runner, "webkit"], { cwd, env, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /missing packed dist/);
    const releases = join(cwd, "test-results");
    const directory = join(releases, readdirSync(releases)[0]);
    const diagnostic = JSON.parse(readFileSync(join(directory, "inventory-1.json"), "utf8"));
    assert.equal(diagnostic.status, 1);
    assert.match(diagnostic.stdout, /missing packed dist/);
    const summary = JSON.parse(readFileSync(join(directory, "summary.json"), "utf8"));
    assert.equal(summary.status, "failed");
    assert.deepEqual(summary.runs, []);
  });
});
