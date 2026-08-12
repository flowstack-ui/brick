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
  assert.equal(packed, serializeThemeContract(generated));
  assert.deepEqual(generated.css.themeLayerPosition, {
    after: "brick.tokens",
    before: "brick.foundations",
  });
  assert.deepEqual(
    generated.componentThemeInputs.map(({ name }) => name),
    ["--brick-drawer-background", "--brick-drawer-radius"],
  );
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
