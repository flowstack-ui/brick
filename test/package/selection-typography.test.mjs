import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = (owner) => readFile(new URL(`../../src/components/${owner}/${owner}.css`, import.meta.url), "utf8");

test("selection sizes resolve through semantic text recipes at every breakpoint", async () => {
  const source = await readFile(new URL("../../src/components/_selection-mark/selection-mark.css", import.meta.url), "utf8");
  const values = [...source.matchAll(/--brick-selection-label-size:\s*([^;]+);/gu)].map((match) => match[1]);
  assert.equal(values.length, 20);
  assert.deepEqual([...new Set(values)], [
    "var(--brick-typography-caption-font-size)",
    "var(--brick-typography-body-sm-font-size)",
    "var(--brick-typography-body-md-font-size)",
  ]);
  for (const owner of ["checkbox", "checkbox-group", "radio-group"]) {
    const source = await css(owner);
    assert.match(source, /var\(--brick-selection-label-size, var\(--brick-typography-body-sm-font-size\)\)/u);
    assert.doesNotMatch(source, /line-height:\s*1\.5;/u);
  }
});

test("card selection and Data List aliases retain semantic fallbacks", async () => {
  for (const owner of ["checkbox-card", "radio-card"]) {
    const source = await css(owner);
    const values = [...source.matchAll(/--brick-(?:checkbox|radio)-card-text-size:\s*([^;]+);/gu)].map((match) => match[1]);
    assert.ok(values.length > 0);
    assert.ok(values.every((value) => /^var\(--brick-typography-body-(?:sm|md)-font-size\)$/u.test(value)));
    assert.match(source, /line-height: var\(--brick-typography-body-md-line-height\)/u);
  }
  const source = await css("data-list");
  for (const property of ["font-size", "line-height", "label-weight"]) {
    const values = [...source.matchAll(new RegExp(`--_dl-${property}:\\s*([^;]+);`, "gu"))].map((match) => match[1]);
    assert.ok(values.length > 0);
    assert.ok(values.every((value) => value.startsWith("var(--brick-typography-")));
  }
});
