import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { isVisualSuite } from "../../scripts/browser-suite-kind.mjs";

test("visual classification includes supplementary suites, not owner names", () => {
  for (const path of ["visual.spec.ts", "grid/docs-visual.spec.ts", "grid/screenshot-regressions.spec.ts", "grid\\docs-visual.spec.ts"]) assert.equal(isVisualSuite(path), true, path);
  for (const path of ["visually-hidden/behavior.spec.ts", "visually-hidden\\behavior.spec.ts", "navigation-menu/layout-regressions.spec.ts"]) assert.equal(isVisualSuite(path), false, path);
});

test("pixel baselines remain in visual suites and navigation geometry stays portable", async () => {
  const root = new URL("../../playground/tests/", import.meta.url);
  const paths = await readdir(root, { recursive: true });
  for (const path of paths.filter((path) => path.endsWith(".spec.ts"))) {
    const source = await readFile(new URL(path, root), "utf8");
    if (source.includes("toHaveScreenshot")) assert.equal(isVisualSuite(path), true, path);
  }
  const navigation = await readFile(new URL("components/navigation-menu/layout-regressions.spec.ts", root), "utf8");
  assert.match(navigation, /\.toBeLessThan\(2\)/);
  assert.match(navigation, /toHaveAttribute\("data-variant", "destination"\)/);
});

test("visual entrypoints use the same complete classification as release projects", async () => {
  const pkg = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
  for (const script of ["test:visual", "test:visual:update"]) {
    assert.match(pkg.scripts[script], /run-browser-project\.mjs chromium --visual/);
    assert.doesNotMatch(pkg.scripts[script], /components\/\*\/visual/);
  }
  const runner = await readFile(new URL("../../scripts/run-browser-project.mjs", import.meta.url), "utf8");
  assert.match(runner, /forwardedArguments\.unshift\(visualSuitePattern\.source\)/);
  assert.match(runner, /visualOnly && project !== "chromium"/);
});
