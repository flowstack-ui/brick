import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  createThemeContract,
  inspectThemeSources,
  serializeThemeContract,
  themeContractSchema,
} from "../../scripts/theme-contract.mjs";

const packageRoot = new URL("../../", import.meta.url);

test("generated theme contract stays aligned with Brick authority", async () => {
  const generated = await createThemeContract(packageRoot.pathname);
  const packed = await readFile(new URL("../../dist/theme-contract.json", import.meta.url), "utf8");

  assert.equal(generated.$schema, themeContractSchema);
  assert.equal(generated.contractVersion, 2);
  assert.equal(packed, serializeThemeContract(generated));
  assert.deepEqual(generated.css.themeLayerPosition, {
    after: "brick.tokens",
    before: "brick.foundations",
  });
  assert.deepEqual(
    generated.componentThemeInputs.map(({ name }) => name),
    ["--brick-drawer-background", "--brick-drawer-radius"],
  );
  assert.equal(generated.contrast.algorithm, "wcag2-relative-luminance");
  assert.equal(generated.contrast.colorSpace, "srgb");
  assert.equal(generated.contrast.pairs.length, 76);
  assert.deepEqual(
    [...new Set(generated.contrast.pairs.map(({ kind }) => kind))].sort(),
    ["non-text", "text"],
  );
  assert.ok(generated.contrast.pairs.every(({ foreground, background, minimumRatio }) =>
    foreground.startsWith("--brick-color-") &&
    background.startsWith("--brick-color-") &&
    minimumRatio >= 3));
  assert.ok(generated.tokens.every(({ classification }) => classification));
  assert.ok(generated.tokens.some(({ classification }) => classification === "required"));
  assert.ok(generated.tokens.some(({ classification }) => classification === "derived"));
  assert.ok(generated.tokens.some(({ classification }) => classification === "optional-extension"));
  assert.ok(generated.tokens.some(({ classification }) => classification === "internal"));
});

test("every source token reference resolves or supplies a local fallback", async () => {
  const source = await inspectThemeSources(packageRoot.pathname);
  const defined = new Set([
    ...source.semanticNames,
    ...source.declaredBy.keys(),
    ...source.runtimeBy.keys(),
  ]);
  const unresolved = source.references.filter(({ name, hasFallback }) =>
    !defined.has(name) && !hasFallback);
  assert.deepEqual(unresolved, []);
});
