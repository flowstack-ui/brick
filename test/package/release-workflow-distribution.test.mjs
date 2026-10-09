import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { hasWorkflowTimeout } from "../../scripts/workflow-timeouts.mjs";

const workflow = (name) =>
  readFileSync(
    new URL(`../../.github/workflows/${name}.yml`, import.meta.url),
    "utf8",
  );

test("scoped browser follow-up builds one current archive without enabling the full matrix", () => {
  const source = workflow("ci");
  const build = source.split("\n  release-diagnostic-build:")[1].split("\n  release-blocker-diagnostics:")[0];
  const diagnostic = source.split("\n  release-blocker-diagnostics:")[1].split("\n  package:")[0];
  assert.match(build, /timeout-minutes: 10/);
  assert.match(build, /npm run build:playground/);
  assert.match(build, /verify-release-diagnostic-archive.mjs.*--record/);
  assert.match(diagnostic, /needs: release-diagnostic-build/);
  assert.equal((diagnostic.match(/- case:/g) ?? []).length, 24);
  assert.match(diagnostic, /runs-on: \$\{\{ matrix\.os \|\| 'ubuntu-latest' \}\}/);
  for (const name of ["textarea-resize-webkit", "textarea-corners-webkit"]) {
    assert.match(diagnostic, new RegExp(`case: ${name}\\n\\s+engine: webkit\\n\\s+os: macos-latest`));
  }
  for (const name of [
    "center-docs-mobile-webkit",
    "typography-titles-webkit",
    "typography-webkit",
    "sidebar-paint-mobile-webkit",
    "button-mobile-webkit",
    "card-mobile-webkit",
    "reorderable-mobile-webkit",
    "marquee-pause-webkit",
    "marquee-contrast-webkit",
    "marquee-contrast-mobile-webkit",
    "popover-mobile-webkit",
    "popover-chromium",
    "mobile-button",
    "mobile-card",
    "sidebar-paint-mobile",
    "dropdown-choice-firefox",
    "typography-mobile-webkit",
    "marquee-pause-firefox",
    "reorder-grid-mobile-chromium",
    "reorder-grid-mobile-webkit",
    "reorder-cursor-mobile-webkit",
    "textarea-resize-webkit",
    "textarea-corners-webkit",
    "radio-group-firefox",
  ]) assert.match(diagnostic, new RegExp(`case: ${name}`));
  assert.match(diagnostic, /timeout-minutes: 16/);
  assert.match(diagnostic, /timeout-minutes: 8/);
  assert.match(diagnostic, /name: brick-diagnostic-package/);
  assert.doesNotMatch(diagnostic, /run-id:|check:repository|test:browser:release/);
  assert.match(source.split("\n  package:")[1], /inputs.diagnostic != 'release-blockers'/);
});

test("nightly inherits a verified timeout from its local reusable workflow", async () => {
  assert.equal(
    await hasWorkflowTimeout(".github/workflows/nightly.yml", (path) =>
      readFileSync(new URL(`../../${path}`, import.meta.url), "utf8"),
    ),
    true,
  );
});

test("CI and publication qualify desktop WebKit native controls on macOS without dropping a profile", () => {
  for (const [name, job] of [["ci", "browser-main"], ["publish", "browser"]]) {
    const body = workflow(name).split(`\n  ${job}:`)[1].split(/\n  [a-z-]+:/)[0];
    assert.match(body, /runs-on: \$\{\{ matrix\.project == 'webkit' && 'macos-latest' \|\| 'ubuntu-latest' \}\}/);
    assert.match(body, /project: \[chromium, firefox, mobile-chromium, webkit, mobile-webkit\]/);
  }
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
    assert.match(source, /group: \[1, 2, 3, 4, 5, 6, 7, 8\]/);
    assert.match(source, /fail-fast: false/);
    assert.match(
      source,
      /FLOWSTACK_RELEASE_SHARD_GROUP: \$\{\{ matrix.group \}\}\/8/,
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
    /needs:\s*\[\s*validate,\s*repository,\s*browser,\s*package-consumers,\s*app-consumer,\s*surface-effects,?\s*\]/,
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
