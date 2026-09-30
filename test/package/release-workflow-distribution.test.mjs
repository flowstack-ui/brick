import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const workflow = (name) =>
  readFileSync(
    new URL(`../../.github/workflows/${name}.yml`, import.meta.url),
    "utf8",
  );

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
