import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToString } from "react-dom/server";
import { Card } from "../../dist/card.js";
import { Badge, NotificationBadge } from "../../dist/badge.js";
import { Avatar } from "../../dist/avatar.js";
import { Toggle } from "../../dist/toggle.js";
import { ToggleGroup } from "../../dist/toggle-group.js";
import { AppBar } from "../../dist/app-bar.js";

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

test("Toggle family emits deterministic pressed semantics during SSR", () => {
  const toggleMarkup = renderToString(
    React.createElement(Toggle, { pressed: true, variant: "outline" }, "Pinned"),
  );
  assert.match(toggleMarkup, /^<button/);
  assert.match(toggleMarkup, /class="brick-toggle"/);
  assert.match(toggleMarkup, /aria-pressed="true"/);
  assert.match(toggleMarkup, /data-variant="outline"/);

  const groupMarkup = renderToString(
    React.createElement(
      ToggleGroup.Root,
      { ariaLabel: "View", value: "cards" },
      React.createElement(ToggleGroup.Item, { value: "cards" }, "Cards"),
      React.createElement(ToggleGroup.Item, { value: "list" }, "List"),
    ),
  );
  assert.match(groupMarkup, /^<div/);
  assert.match(groupMarkup, /class="brick-toggle-group"/);
  assert.match(groupMarkup, /role="group"/);
  assert.match(groupMarkup, /aria-label="View"/);
  assert.match(groupMarkup, /class="brick-toggle-group-item"/);
});

test("AppBar emits server-safe landmark and layout anatomy", () => {
  const markup = renderToString(
    React.createElement(
      AppBar.Root,
      { "aria-label": "Application", position: "sticky", variant: "solid" },
      React.createElement(
        AppBar.Toolbar,
        { density: "compact" },
        React.createElement(AppBar.Start, null, "Brand"),
        React.createElement(AppBar.Center, null, "Workspace"),
        React.createElement(AppBar.End, null, "Actions"),
      ),
    ),
  );
  assert.match(markup, /^<header/);
  assert.match(markup, /class="brick-app-bar"/);
  assert.match(markup, /data-position="sticky"/);
  assert.match(markup, /data-density="compact"/);
  assert.match(markup, /data-slot="appbar-(?:start|center|end)"/);
  assert.doesNotMatch(markup, /role="toolbar"/);
});
