import assert from "node:assert/strict";
import test from "node:test";
import { compileTokens } from "../../scripts/token-compiler.mjs";

const tokenSource = new URL("../../src/styles/tokens.tokens.json", import.meta.url);

test("compact form-control minimum matches the 24px action recipe", async () => {
  const css = await compileTokens(tokenSource);
  assert.match(css, /--brick-control-min-block-size-2xs: 1\.5rem/);
  assert.match(css, /--brick-control-min-block-size-xs: 2rem/);
  assert.match(css, /--brick-control-min-block-size-lg: 2\.75rem/);
});

test("standard ratios have matching numeric and appearance-invariant CSS exports", async () => {
  const { aspectRatios } = await import("../../dist/aspect-ratio.js");
  const { aspectRatios: rootRatios } = await import("../../dist/index.js");
  assert.equal(rootRatios, aspectRatios);
  const css = await compileTokens(tokenSource);
  for (const [name, ratio] of Object.entries(aspectRatios)) {
    assert.ok(css.includes(`--brick-aspect-ratio-${name}: ${ratio}`));
    assert.ok(!declarationsFor(css, '[data-brick-appearance="dark"]').has(`--brick-aspect-ratio-${name}`));
  }
});

test("core radius choices and semantic roles are independently addressable", async () => {
  const css = await compileTokens(tokenSource);
  assert.match(css, /--brick-radius-core-sm: 0.25rem/);
  assert.match(css, /--brick-radius-core-md: 0.375rem/);
  assert.match(css, /--brick-radius-core-4xl: 2rem/);
  assert.match(css, /--brick-radius-control: 0.5rem/);
  assert.ok(!declarationsFor(css, '[data-brick-appearance="dark"]').has("--brick-radius-core-sm"));
});

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
