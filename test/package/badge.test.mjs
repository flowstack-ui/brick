import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Badge } from "../../dist/badge.js";

test("Badge renders sparse responsive defaults on the server", () => {
  const html = renderToStaticMarkup(React.createElement(Badge, {size:{md:"xl"},variant:{lg:"plain"}}, "Published"));
  assert.match(html, /data-size="md"/);
  assert.match(html, /data-size-md="xl"/);
  assert.match(html, /data-variant="soft"/);
  assert.match(html, /data-variant-lg="plain"/);
  assert.doesNotMatch(html, /\[object Object\]/);
});
test("Badge modular CSS includes every static responsive recipe", async () => {
  const css=await readFile(new URL("../../dist/styles/badge.css",import.meta.url),"utf8");
  for(const bp of ["sm","md","lg","xl"]) {
    for(const size of ["xs","sm","md","lg","xl"]) assert.match(css,new RegExp(`data-size-${bp}=${size}`));
    for(const variant of ["soft","solid","outline","surface","plain"]) assert.match(css,new RegExp(`data-variant-${bp}=${variant}`));
  }
  assert.match(css,/brick-notification-badge/);
});
