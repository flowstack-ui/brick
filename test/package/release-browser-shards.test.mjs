import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { withBrowserRunnerFixture } from "./release-browser-fixture.mjs";

const script = fileURLToPath(
  new URL("../../scripts/run-release-browser-tests.mjs", import.meta.url),
);
const platform = { skip: process.platform === "win32" };

function plan(project, shardGroup, count = 1670) {
  return withBrowserRunnerFixture({ count }, (cwd, env) =>
    spawnSync(process.execPath, [script, "--plan", project], {
      cwd,
      encoding: "utf8",
      env: { ...env, FLOWSTACK_RELEASE_SHARD_GROUP: shardGroup ?? "" },
    }),
  );
}

function plannedShards(output) {
  return [...output.matchAll(/--shard=(\d+)\/(\d+)/g)].map((match) => ({
    shard: Number(match[1]),
    total: Number(match[2]),
  }));
}

for (const [project, budget] of [
  ["webkit", 40],
  ["mobile-webkit", 24],
]) {
  test(
    `${project} derives bounded test-level shards from catalog size`,
    platform,
    () => {
      for (const count of [budget, budget + 1, 1670]) {
        const result = plan(project, undefined, count);
        assert.equal(result.status, 0, result.stderr);
        assert.match(result.stdout, /--workers=1 --fully-parallel/);
        const total = Math.ceil(count / budget);
        if (total > 1)
          assert.deepEqual(
            plannedShards(result.stdout),
            Array.from({ length: total }, (_, index) => ({
              shard: index + 1,
              total,
            })),
          );
        else assert.deepEqual(plannedShards(result.stdout), []);
      }
    },
  );
  test(
    `six CI groups partition every ${project} shard exactly once`,
    platform,
    () => {
      const groups = Array.from({ length: 6 }, (_, i) =>
        plan(project, `${i + 1}/6`),
      );
      for (const result of groups)
        assert.equal(result.status, 0, result.stderr);
      const shards = groups.flatMap((result) => plannedShards(result.stdout));
      const total = Math.ceil(1670 / budget);
      assert.deepEqual(
        shards.map((item) => item.shard).sort((a, b) => a - b),
        Array.from({ length: total }, (_, i) => i + 1),
      );
      assert.ok(shards.every((item) => item.total === total));
    },
  );
}

for (const project of ["chromium", "firefox", "mobile-chromium"]) {
  test(
    `six CI groups partition every ${project} case batch once`,
    platform,
    () => {
      const groups = Array.from({ length: 6 }, (_, i) =>
        plan(project, `${i + 1}/6`),
      );
      for (const result of groups)
        assert.equal(result.status, 0, result.stderr);
      const shards = groups.flatMap((result) => plannedShards(result.stdout));
      const total = Math.ceil(1670 / 120);
      assert.deepEqual(
        shards.map((item) => item.shard).sort((a, b) => a - b),
        Array.from({ length: total }, (_, i) => i + 1),
      );
      assert.ok(shards.every((item) => item.total === total));
    },
  );
}
test("empty groups fail closed", platform, () => {
  const result = plan("chromium", "6/6", 1);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /no tests/);
});

test("invalid shard groups fail before browser work", platform, () => {
  const result = plan("webkit", "4/3");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /must select a valid group/);
});

for (const options of [{ count: 0 }, { invalid: true }, { overBudget: true }]) {
  test(
    `invalid browser inventory fails closed: ${JSON.stringify(options)}`,
    platform,
    () => {
      const result = withBrowserRunnerFixture(options, (cwd, env) =>
        spawnSync(process.execPath, [script, "webkit"], {
          cwd,
          env,
          encoding: "utf8",
        }),
      );
      assert.notEqual(result.status, 0);
      assert.match(
        result.stderr,
        /Cannot safely plan|exceeds its browser context budget/,
      );
    },
  );
}
