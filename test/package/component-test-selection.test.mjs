import assert from "node:assert/strict";
import test from "node:test";
import { componentTestPaths, componentTestSuites } from "../../scripts/component-test-manifest.mjs";

test("focused selection includes supplementary owner evidence and separates visuals", () => {
  const button = { ...componentTestPaths("button"), ...componentTestSuites("button") };
  assert.ok(Object.values(componentTestPaths("button")).every(path => typeof path === "string"));
  assert.ok(button.unitSuites.includes("test/components/button/parity.test.tsx"));
  assert.ok(button.browserSuites.includes("playground/tests/components/button/parity.spec.ts"));
  assert.ok(button.visualSuites.includes(button.visual));
  assert.ok(!button.browserSuites.includes(button.visual));
  const feed = componentTestSuites("feed");
  assert.ok(feed.browserSuites.includes("playground/tests/components/feed/documentation.spec.ts"));
  assert.throws(() => componentTestPaths("../unknown"), /Unknown component/);
});
