import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { hasWorkflowTimeout } from "../../scripts/workflow-timeouts.mjs";

const workflow = (name) =>
  readFileSync(
    new URL(`../../.github/workflows/${name}.yml`, import.meta.url),
    "utf8",
  );

test("nightly inherits a verified timeout from its local reusable workflow", async () => {
  assert.equal(
    await hasWorkflowTimeout(".github/workflows/nightly.yml", (path) =>
      readFileSync(new URL(`../../${path}`, import.meta.url), "utf8"),
    ),
    true,
  );
});

test("timeout delegation fails closed for missing, cyclic or unbounded targets", async () => {
  const caller =
    "jobs:\n  release:\n    uses: ./.github/workflows/target.yml\n";
  for (const target of [
    undefined,
    caller,
    "jobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: []\n",
  ]) {
    assert.equal(
      await hasWorkflowTimeout("caller", (path) => {
        if (path === "caller") return caller;
        if (target === undefined) throw new Error("missing");
        return target;
      }),
      false,
    );
  }
});

for (const name of ["ci", "publish"]) {
  test(`${name} distributes all profiles and retains success evidence`, () => {
    const source = workflow(name);
    assert.match(
      source,
      /project: \[chromium, firefox, mobile-chromium, webkit, mobile-webkit\]/,
    );
    assert.match(source, /group: \[1, 2, 3, 4, 5, 6\]/);
    assert.match(source, /fail-fast: false/);
    assert.match(
      source,
      /FLOWSTACK_RELEASE_SHARD_GROUP: \$\{\{ matrix.group \}\}\/6/,
    );
    assert.doesNotMatch(source, /if: failure\(\)/);
    assert.match(source, /if: always\(\)/);
    assert.match(source, /npm run test:surface-effects/);
    assert.match(source, /--strip-components=1 package\/dist/);
    assert.match(source, /retention-days: 14/);
  });
}

test("nightly reuses distributed CI and cannot cancel its caller", () => {
  const nightly = workflow("nightly");
  assert.match(nightly, /uses: \.\/\.github\/workflows\/ci.yml/);
  assert.doesNotMatch(nightly, /npm run check:release/);
  assert.match(workflow("ci"), /workflow_call:/);
  assert.match(nightly, /group: nightly-/);
  assert.match(workflow("ci"), /group: ci-/);
});

test("publication waits for surface effects as well as all browser groups", () => {
  assert.match(
    workflow("publish"),
    /needs: \[validate, repository, browser, package-consumers, app-consumer, surface-effects\]/,
  );
});

for (const [name, jobs, archive] of [
  ["ci", ["browser-pull-request-shards", "browser-main"], "brick-package"],
  ["publish", ["browser"], "brick-release-package"],
]) {
  for (const job of jobs) {
    test(`${name} ${job} restores the exact package before browser discovery`, () => {
      const source = workflow(name);
      const section = source.split(`\n  ${job}:`)[1].split(/\n  [a-z][a-z-]*:/)[0];
      assert.match(section, new RegExp(`name: ${archive}\\n`));
      const extract = section.indexOf('--strip-components=1 package/dist');
      const run = section.indexOf('npm run test:browser:release:project:built');
      assert.ok(extract >= 0 && extract < run);
    });
  }
}
