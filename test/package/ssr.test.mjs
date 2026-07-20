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
import { HoverCard } from "../../dist/hover-card.js";
import { Popover } from "../../dist/popover.js";
import { Form } from "../../dist/form.js";
import { Field } from "../../dist/field.js";
import { Fieldset } from "../../dist/fieldset.js";
import { Checkbox } from "../../dist/checkbox.js";
import { CheckboxGroup } from "../../dist/checkbox-group.js";
import { Input } from "@flowstack-ui/atom/input";

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

test("HoverCard trigger renders server-safe link semantics without popup ARIA", () => {
  const markup = renderToString(
    React.createElement(
      HoverCard.Root,
      null,
      React.createElement(
        HoverCard.Trigger,
        { asChild: true },
        React.createElement("a", { href: "/people/ada" }, "Ada Lovelace"),
      ),
    ),
  );

  assert.match(markup, /^<a/);
  assert.match(markup, /class="brick-hover-card__trigger"/);
  assert.match(markup, /href="\/people\/ada"/);
  assert.doesNotMatch(markup, /aria-(?:expanded|haspopup|describedby)|role=/i);
});

test("Popover renders server-stable generated naming when semantic parts are direct children", () => {
  const markup = renderToString(
    React.createElement(
      Popover.Root,
      { defaultOpen: true },
      React.createElement(Popover.Trigger, null, "Settings"),
      React.createElement(
        Popover.Portal,
        { disabled: true },
        React.createElement(
          Popover.Content,
          null,
          React.createElement(Popover.Title, null, "Workspace settings"),
          React.createElement(Popover.Description, null, "Compact options"),
          React.createElement(Popover.Body, null, "Controls"),
        ),
      ),
    ),
  );

  const labelledBy = markup.match(/aria-labelledby="([^"]+)"/)?.[1];
  const describedBy = markup.match(/aria-describedby="([^"]+)"/)?.[1];
  assert.ok(labelledBy);
  assert.ok(describedBy);
  assert.match(markup, new RegExp(`id="${labelledBy}"[^>]*>Workspace settings`));
  assert.match(markup, new RegExp(`id="${describedBy}"[^>]*>Compact options`));
  assert.match(markup, /class="brick-popover"/);
  assert.match(markup, /class="brick-popover__body"/);
});

test("Form foundation preserves styled semantic relationships in server markup", () => {
  const markup = renderToString(
    React.createElement(
      Form,
      { "aria-label": "Profile" },
      React.createElement(
        Field.Root,
        { id: "profile-email", invalid: true },
        React.createElement(Field.Label, null, "Email"),
        React.createElement(Input.Root, { name: "email" }),
        React.createElement(Field.Description, null, "Use a work address."),
        React.createElement(Field.Error, null, "Invalid address."),
      ),
      React.createElement(
        Fieldset.Root,
        { id: "contact-methods", invalid: true },
        React.createElement(Fieldset.Legend, null, "Contact methods"),
        React.createElement(Fieldset.Description, null, "Choose one."),
        React.createElement(Fieldset.Error, null, "Selection required."),
      ),
    ),
  );

  assert.match(markup, /^<form/);
  assert.match(markup, /class="brick-form"/);
  assert.match(markup, /class="brick-field"/);
  assert.match(markup, /class="brick-field-description"/);
  assert.match(
    markup,
    /aria-describedby="profile-email-description profile-email-error"/,
  );
  assert.match(markup, /class="brick-fieldset"/);
  assert.match(markup, /id="contact-methods-legend"/);
  assert.match(
    markup,
    /aria-describedby="contact-methods-description contact-methods-error"/,
  );
});

test("Checkbox family renders server-stable visual and semantic anatomy", () => {
  const directMarkup = renderToString(
    React.createElement(Checkbox, { defaultChecked: "indeterminate", size: "lg" }, "Terms"),
  );
  assert.match(directMarkup, /^<button/);
  assert.match(directMarkup, /class="brick-checkbox"/);
  assert.match(directMarkup, /data-size="lg"/);
  assert.match(directMarkup, /aria-checked="mixed"/);
  assert.match(directMarkup, /class="brick-checkbox-control"/);
  assert.match(directMarkup, /aria-hidden="true"/);

  const groupMarkup = renderToString(
    React.createElement(
      CheckboxGroup.Root,
      { "aria-label": "Channels", allValues: ["email", "sms"] },
      React.createElement(CheckboxGroup.Parent, null, "All channels"),
      React.createElement(
        CheckboxGroup.Item,
        { value: "email" },
        React.createElement(CheckboxGroup.ItemLabel, null, "Email"),
        React.createElement(CheckboxGroup.ItemDescription, null, "Weekly summary"),
      ),
    ),
  );
  const labelledBy = groupMarkup.match(/aria-labelledby="([^"]+)"/)?.[1];
  const describedBy = groupMarkup.match(/aria-describedby="([^"]+)"/)?.[1];
  assert.ok(labelledBy);
  assert.ok(describedBy);
  assert.match(groupMarkup, /class="brick-checkbox-group"/);
  assert.match(groupMarkup, /class="brick-checkbox-group-parent"/);
  assert.match(groupMarkup, /class="brick-checkbox-group-item"/);
  assert.match(groupMarkup, new RegExp(`id="${labelledBy}"[^>]*>Email`));
  assert.match(groupMarkup, new RegExp(`id="${describedBy}"[^>]*>Weekly summary`));
});
