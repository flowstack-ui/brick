import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Breadcrumb as PublicBreadcrumb, BreadcrumbTrigger } from "../../dist/index.js";
import { Breadcrumb } from "../../dist/breadcrumb.js";

test("Breadcrumb public entries preserve eight parts and server-rendered native names", () => {
  assert.equal(PublicBreadcrumb, Breadcrumb);
  assert.equal(Breadcrumb.Trigger, BreadcrumbTrigger);
  assert.deepEqual(Object.keys(Breadcrumb).sort(), ["Ellipsis", "Item", "Link", "List", "Page", "Root", "Separator", "Trigger"]);
  const html = renderToStaticMarkup(React.createElement(Breadcrumb.Root, { "aria-label": "Server path" }, React.createElement(Breadcrumb.Trigger, null, "Ancestors")));
  assert.match(html, /aria-label="Server path"/);
  assert.match(html, /<button[^>]*type="button"/);
  assert.doesNotMatch(html, / tone="neutral"/);
});

test("Breadcrumb modular CSS carries default Icon direction and responsive styles", async () => {
  const css = await readFile(new URL("../../dist/styles/breadcrumb.css", import.meta.url), "utf8");
  assert.match(css, /\.brick-icon/);
  assert.match(css, /data-directional/);
  assert.match(css, /data-size-md/);
  assert.match(css, /data-variant-lg/);
  assert.match(css, /brick-breadcrumb-link-gap/);
  assert.match(css, /brick-breadcrumb-trigger/);
  assert.doesNotMatch(css, /\.brick-breadcrumb\[data-tone=["']?(?:danger|success|warning|info)/);
});

test("Breadcrumb copyable collections use For rather than JSX map", async () => {
  for (const name of ["Closed", "Sizes", "Variants", "Tones"]) {
    const source = await readFile(new URL(`../../playground/src/components/breadcrumb/examples/Breadcrumb${name}.tsx`, import.meta.url), "utf8");
    assert.match(source, /<For each=/);
    assert.doesNotMatch(source, /\.map\(/);
  }
});

test("Breadcrumb compact navigation metrics use semantic recipes at every breakpoint", async () => {
  const css = await readFile(new URL("../../src/components/breadcrumb/breadcrumb.css", import.meta.url), "utf8");
  for (const size of ["sm", "md", "lg"]) {
    assert.match(css, new RegExp(`--_brick-breadcrumb-line-height: var\\(--brick-typography-menu-${size}-line-height\\)`));
    assert.match(css, new RegExp(`--_brick-breadcrumb-font-size: var\\(--brick-typography-menu-${size}-font-size\\)`));
  }
  assert.doesNotMatch(css, /--_brick-breadcrumb-line-height: (?:calc\(|var\(--brick-space-)/);
});
