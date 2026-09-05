import assert from "node:assert/strict";
import test from "node:test";
import { compileTokens } from "../../scripts/token-compiler.mjs";

const tokenSource = new URL("../../src/styles/tokens.tokens.json", import.meta.url);

function declarationsFor(css, selector) {
  const start = css.indexOf(selector);
  assert.notEqual(start, -1, `Missing selector: ${selector}`);
  const bodyStart = css.indexOf("{", start);
  const bodyEnd = css.indexOf("}", bodyStart);
  return new Set(
    [...css.slice(bodyStart + 1, bodyEnd).matchAll(/(--brick-[\w-]+)\s*:/g)].map(
      ([, name]) => name,
    ),
  );
}

test("explicit scopes emit matching complete appearance-dependent contracts", async () => {
  const css = await compileTokens(tokenSource);
  const light = declarationsFor(css, '[data-brick-appearance="light"]');
  const dark = declarationsFor(css, '[data-brick-appearance="dark"]');

  assert.ok(light.size > 50);
  assert.deepEqual(dark, light);
  assert.ok([...light].every((name) => /^--brick-(?:color|shadow)-/.test(name)));
  assert.ok(!light.has("--brick-font-family-body"));
  assert.ok(!light.has("--brick-space-4"));
  assert.ok(!light.has("--brick-radius-surface"));
  assert.ok(light.has("--brick-color-selection-background"));
  assert.ok(light.has("--brick-color-selection-foreground"));
  assert.match(css, /\[data-brick-appearance="light"\]\s*\{\s*color-scheme: light/);
  assert.match(css, /\[data-brick-appearance="dark"\]\s*\{\s*color-scheme: dark/);
});
