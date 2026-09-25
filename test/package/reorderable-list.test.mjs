import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReorderableList } from "../../dist/reorderable-list.js";

test("ReorderableList public SSR anatomy omits inactive preview", () => {
  const html = renderToStaticMarkup(createElement(ReorderableList.Root, {
    items: ["a"], getItemLabel: value => value, onItemsChange: () => {},
    size: { md: "lg" }, variant: "surface", radius: "none", motion: false,
  }, createElement(ReorderableList.Item, { value: "a" }, "A"), createElement(ReorderableList.Preview)));
  assert.match(html, /<ol/);
  assert.match(html, /data-size-md="lg"/);
  assert.match(html, /data-motion="false"/);
  assert.doesNotMatch(html, /reorderable-list-preview|radius="none"/);
});
test("ReorderableList modular CSS includes responsive recipes and reduced motion", async () => {
  const css = (await readFile(new URL("../../dist/styles/reorderable-list.css", import.meta.url), "utf8")).replaceAll('"', "");
  for (const bp of ["sm", "md", "lg", "xl"]) {
    for (const size of ["sm", "md", "lg"]) assert.ok(css.includes(`data-size-${bp}=${size}`));
    for (const variant of ["outline", "surface", "soft"]) assert.ok(css.includes(`data-variant-${bp}=${variant}`));
  }
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("--atom-reorder-x"));
  assert.ok(css.includes("data-previewing"));
});
