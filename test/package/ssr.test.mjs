import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { Card } from "../../dist/card.js";
import { Badge, NotificationBadge } from "../../dist/badge.js";
import { Avatar } from "../../dist/avatar.js";

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

test("Badge family renders server-safe markup without behavior", () => {
  const badgeMarkup = renderToString(
    React.createElement(Badge, { tone: "success" }, "Published"),
  );
  assert.match(badgeMarkup, /^<span/);
  assert.match(badgeMarkup, /class="brick-badge"/);
  assert.match(badgeMarkup, /data-tone="success"/);
  assert.doesNotMatch(badgeMarkup, /role=|aria-live|tabindex/i);

  const notificationMarkup = renderToString(
    React.createElement(
      NotificationBadge,
      { count: 4 },
      React.createElement("button", { "aria-label": "Inbox, 4 unread messages" }, "Inbox"),
    ),
  );
  assert.match(notificationMarkup, /class="brick-notification-badge"/);
  assert.match(notificationMarkup, /aria-label="Inbox, 4 unread messages"/);
  assert.match(notificationMarkup, /aria-hidden="true"/);
  assert.match(notificationMarkup, />4<\/span>/);
});

test("Avatar emits deterministic fallback and status metadata during SSR", () => {
  const markup = renderToString(
    React.createElement(Avatar, {
      alt: "Ada Lovelace",
      fallback: "AL",
      shape: "rounded",
      status: "online",
    }),
  );

  assert.match(markup, /^<span/);
  assert.match(markup, /class="brick-avatar"/);
  assert.match(markup, /data-shape="rounded"/);
  assert.match(markup, /data-status="online"/);
  assert.match(markup, /role="img"/);
  assert.match(markup, /aria-label="Ada Lovelace"/);
  assert.match(markup, />AL<\/span>/);
});
