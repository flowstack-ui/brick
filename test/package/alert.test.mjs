import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Alert } from "../../dist/alert.js";
test("Alert built API preserves responsive SSR and semantic defaults", () => {
  const html = renderToStaticMarkup(createElement(Alert.Root, { size: { md: "lg" }, inline: { lg: true }, radius: "none", accentStart: true }, "Notice"));
  assert.match(html, /data-size="md"/); assert.match(html, /data-size-md="lg"/);
  assert.doesNotMatch(html, /data-inline=/); assert.match(html, /data-inline-lg="true"/);
  assert.match(html, /--brick-alert-radius:0px/);
  assert.doesNotMatch(html, /aria-live|role=|\[object Object\]/);
});
test("Alert modular CSS includes complete responsive recipe resets", async () => {
  const css = (await readFile(new URL("../../dist/styles/alert.css", import.meta.url), "utf8")).replaceAll('"', "");
  for (const bp of ["sm", "md", "lg", "xl"]) {
    for (const size of ["sm", "md", "lg"]) assert.ok(css.includes(`data-size-${bp}=${size}`));
    for (const variant of ["soft", "surface", "outline", "solid"]) assert.ok(css.includes(`data-variant-${bp}=${variant}`));
    for (const inline of [true, false]) assert.ok(css.includes(`data-inline-${bp}=${inline}`));
    for (const align of ["start", "center"]) assert.ok(css.includes(`data-align-${bp}=${align}`));
  }
  assert.ok(css.includes("--brick-alert-line-height"));
  assert.ok(css.includes("forced-colors"));
});
