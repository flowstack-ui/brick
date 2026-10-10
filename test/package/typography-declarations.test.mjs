import assert from "node:assert/strict";
import test from "node:test";
import { semanticTypographyAlias, typographyDeclarations } from "../../scripts/typography-declarations.mjs";

test("typography audit includes compact, nested and multiline declarations", () => {
  const source = `.a { color: red; font-family: inherit; font-size: 12px;
    line-height: 1.5; @media (width > 30rem) { letter-spacing: 0; }
    --custom-font-weight: var(\n --brick-typography-label-md-font-weight\n );
  }`;
  assert.deepEqual([...typographyDeclarations(source)].map((match) => match.groups.property), [
    "font-family", "font-size", "line-height", "letter-spacing", "--custom-font-weight",
  ]);
});

test("final declarations cannot escape the audit by omitting an optional semicolon", () => {
  const source = ".a{font-size:12px}.b{--size:var(--brick-typography-body-sm-font-size)}";
  assert.equal([...typographyDeclarations(source)][0].groups.value, "12px");
  assert.equal(semanticTypographyAlias("var(--size)", source), true);
  assert.equal(semanticTypographyAlias("var(--size)", source + ".c{--size:99px}"), false);
});

test("semantic aliases require all assignments, including responsive overrides, to resolve", () => {
  const source = `.a { --size: var(--base); --base: var(--brick-typography-body-sm-font-size); }
    @media (width > 30rem) { .a { --size: var(--brick-typography-body-md-font-size); } }`;
  assert.equal(semanticTypographyAlias("var(--size)", source), true);
  assert.equal(semanticTypographyAlias("var(--size)", source + ".b { --size: 99px; }"), false);
  assert.equal(semanticTypographyAlias("var(--missing)", source), false);
  assert.equal(semanticTypographyAlias("var(--size)", ".a { --other--size: var(--brick-typography-body-sm-font-size); }"), false);
  assert.equal(semanticTypographyAlias("var(--a)", ".a { --a: var(--b); --b: var(--a); }"), false);
});

test("typography audit ignores comments without losing source offsets", () => {
  const source = `/* font-size: 99px; */\n.a { /* line-height: 99; */ font-size: 12px; }`;
  const matches = [...typographyDeclarations(source)];
  assert.equal(matches.length, 1);
  assert.equal(matches[0].groups.value, "12px");
  assert.equal(source.slice(0, matches[0].index).split("\n").length, 2);
});
