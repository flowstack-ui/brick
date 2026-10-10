import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Card } from "../../dist/card.js";

test("Card sparse recipes and composed parts render on the server", () => {
  const html = renderToStaticMarkup(React.createElement(Card.Root, { size: { md: "lg" }, variant: { xl: "subtle" } },
    React.createElement(Card.Content, { asChild: true, gap: { md: 4 } }, React.createElement("section", { "aria-label": "Summary" }, "Report"))));
  for (const value of ['data-size="md"', 'data-size-md="lg"', 'data-variant="outline"', 'data-variant-xl="subtle"', '<section', 'aria-label="Summary"']) assert.ok(html.includes(value), value);
  assert.doesNotMatch(html, /asChild=|\[object Object\]/);
});

test("Card static CSS contains each breakpoint recipe and explicit border precedence", async () => {
  const css = await readFile(new URL("../../dist/styles/card.css", import.meta.url), "utf8");
  for (const bp of ["sm", "md", "lg", "xl"]) {
    for (const size of ["sm", "md", "lg"]) assert.ok(css.includes(`data-size-${bp}=${size}`));
    for (const variant of ["outline", "elevated", "subtle"]) assert.ok(css.includes(`data-variant-${bp}=${variant}`));
  }
  assert.ok(css.lastIndexOf('data-bordered=true') > css.lastIndexOf('data-variant-xl=subtle'));
  assert.ok(css.includes('--brick-card-foreground'));
});
