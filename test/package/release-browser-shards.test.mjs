import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../../scripts/run-release-browser-tests.mjs", import.meta.url));

function plan(project, shardGroup) {
  return spawnSync(process.execPath, [script, "--plan", project], {
    encoding: "utf8",
    env: {
      ...process.env,
      ...(shardGroup ? { FLOWSTACK_RELEASE_SHARD_GROUP: shardGroup } : {}),
    },
  });
}

function plannedShards(output) {
  return [...output.matchAll(/--shard=(\d+)\/(\d+)/g)].map((match) => ({
    shard: Number(match[1]),
    total: Number(match[2]),
  }));
}

test("the complete WebKit plan preserves all 12 one-worker restarts", () => {
  const result = plan("webkit");
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    plannedShards(result.stdout),
    Array.from({ length: 12 }, (_, index) => ({ shard: index + 1, total: 12 })),
  );
});

test("three CI groups partition every WebKit shard exactly once", () => {
  const groups = ["1/3", "2/3", "3/3"].map((group) => plan("mobile-webkit", group));
  for (const result of groups) assert.equal(result.status, 0, result.stderr);

  const shards = groups.flatMap((result) => plannedShards(result.stdout));
  assert.equal(shards.length, 12);
  assert.deepEqual(
    shards.map(({ shard }) => shard).sort((left, right) => left - right),
    Array.from({ length: 12 }, (_, index) => index + 1),
  );
  assert.ok(shards.every(({ total }) => total === 12));
});

test("non-WebKit projects reject a WebKit shard group", () => {
  const result = plan("chromium", "1/3");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /only valid for WebKit projects/);
});

test("invalid shard groups fail before browser work", () => {
  const result = plan("webkit", "4/3");
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /must select a valid group/);
});
