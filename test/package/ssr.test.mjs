import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { Card } from "../../dist/card.js";

test("Card renders on the server without browser state or a client boundary", () => {
  const markup = renderToString(
    React.createElement(
      Card.Root,
      { as: "article", "aria-labelledby": "ssr-title", variant: "elevated" },
      React.createElement(
        Card.Header,
        null,
        React.createElement(Card.Title, { as: "h1", id: "ssr-title" }, "Server report"),
      ),
      React.createElement(Card.Content, null, "Rendered on the server"),
    ),
  );

  assert.match(markup, /^<article/);
  assert.match(markup, /class="brick-card"/);
  assert.match(markup, /data-variant="elevated"/);
  assert.match(markup, /<h1[^>]*>Server report<\/h1>/);
  assert.doesNotMatch(markup, /tabindex|role=/i);
});
