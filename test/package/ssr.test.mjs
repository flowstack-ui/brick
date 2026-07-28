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
import { RadioGroup } from "../../dist/radio-group.js";
import { Switch } from "../../dist/switch.js";
import { Breadcrumb } from "../../dist/breadcrumb.js";
import { Tabs } from "../../dist/tabs.js";
import { Skeleton } from "../../dist/skeleton.js";
import { Progress } from "../../dist/progress.js";
import { ProgressCircle } from "../../dist/progress-circle.js";
import { Toast, Toaster } from "../../dist/toast.js";
import { Collapsible } from "../../dist/collapsible.js";
import { Accordion } from "../../dist/accordion.js";
import { Input } from "../../dist/input.js";
import { Textarea } from "../../dist/textarea.js";
import { Text } from "../../dist/text.js";
import { Link } from "../../dist/link.js";
import { List } from "../../dist/list.js";
import { Table } from "../../dist/table.js";
import { DataGrid } from "../../dist/data-grid.js";
import { Pagination } from "../../dist/pagination.js";
import { HStack, Stack, VStack } from "../../dist/stack.js";
import { Grid } from "../../dist/grid.js";
import { Container } from "../../dist/container.js";
import { Surface } from "../../dist/surface.js";
import { Divider } from "../../dist/divider.js";
import { ScrollArea } from "../../dist/scroll-area.js";
import { NavList } from "../../dist/nav-list.js";
import { Sidebar } from "../../dist/sidebar.js";
import { Code } from "../../dist/code.js";
import { CodeBlock } from "../../dist/code-block.js";
import { Icon } from "../../dist/icon.js";
import { Image } from "../../dist/image.js";
import { Input as AtomInput } from "@flowstack-ui/atom/input";

test("Pagination renders deterministic generated native anatomy during SSR", () => {
  const markup = renderToString(React.createElement(Pagination.Root, { "aria-label": "Result pages", defaultPage: 4, totalPages: 8, variant: "outline" }, React.createElement(Pagination.List, null, React.createElement(Pagination.Previous), React.createElement(Pagination.Items), React.createElement(Pagination.Next))));
  assert.match(markup, /<nav/);
  assert.match(markup, /class="brick-pagination"/);
  assert.match(markup, /data-variant="outline"/);
  assert.match(markup, /<ol[^>]*brick-pagination__list/);
  assert.match(markup, /aria-current="page"/);
  assert.match(markup, /brick-pagination__ellipsis/);
});

test("Table renders deterministic native static anatomy during SSR", () => {
  const markup = renderToString(React.createElement(Table.Root, { striped: true }, React.createElement(Table.Caption, null, "Results"), React.createElement(Table.Body, null, React.createElement(Table.Row, null, React.createElement(Table.Head, { scope: "row" }, "Atom"), React.createElement(Table.Cell, { numeric: true }, "42")))));
  assert.match(markup, /<table/);
  assert.match(markup, /<caption/);
  assert.match(markup, /scope="row"/);
  assert.match(markup, /data-numeric=""/);
  assert.doesNotMatch(markup, /role="grid"/);
});

test("Data Grid renders deterministic navigable tabular anatomy during SSR", () => {
  const markup = renderToString(React.createElement(DataGrid.Root, { "aria-label": "Results", columnCount: 1, rowCount: 2 }, React.createElement(DataGrid.Header, null, React.createElement(DataGrid.Row, { rowIndex: 1 }, React.createElement(DataGrid.ColumnHeader, { columnIndex: 1, sortDirection: "ascending" }, "Project"))), React.createElement(DataGrid.Body, null, React.createElement(DataGrid.Row, { rowIndex: 2, value: "atom" }, React.createElement(DataGrid.Cell, { columnIndex: 1 }, "Atom")))));
  assert.match(markup, /role="grid"/);
  assert.match(markup, /aria-colcount="1"/);
  assert.match(markup, /aria-rowcount="2"/);
  assert.match(markup, /aria-sort="ascending"/);
  assert.match(markup, /role="gridcell"/);
});

test("Collapsible renders deterministic linked disclosure anatomy", () => {
  const markup = renderToString(
    React.createElement(
      Collapsible.Root,
      { defaultOpen: true, size: "lg", variant: "outline" },
      React.createElement(Collapsible.Trigger, null, "Advanced settings", React.createElement(Collapsible.Indicator)),
      React.createElement(Collapsible.Content, null, React.createElement(Collapsible.ContentInner, null, "Settings content")),
    ),
  );
  assert.match(markup, /class="brick-collapsible"/);
  assert.match(markup, /data-size="lg"/);
  assert.match(markup, /data-variant="outline"/);
  assert.match(markup, /aria-expanded="true"/);
  assert.match(markup, /aria-controls="[^"]+-content"/);
  assert.match(markup, /role="region"/);
  assert.match(markup, /aria-labelledby="[^"]+-trigger"/);
  assert.match(markup, /class="brick-collapsible-content-inner"/);
});

test("Accordion renders deterministic linked disclosure-group anatomy", () => {
  const markup = renderToString(
    React.createElement(Accordion.Root, { defaultValue: "account", orientation: "horizontal", size: "lg", variant: "outline" },
      React.createElement(Accordion.Item, { value: "account" },
        React.createElement(Accordion.Header, { as: "h3" }, React.createElement(Accordion.Trigger, null, "Account", React.createElement(Accordion.Indicator))),
        React.createElement(Accordion.Content, null, React.createElement(Accordion.ContentInner, null, "Account settings")),
      ),
    ),
  );
  assert.match(markup, /class="brick-accordion"/);
  assert.match(markup, /data-orientation="horizontal"/);
  assert.match(markup, /data-size="lg"/);
  assert.match(markup, /data-variant="outline"/);
  assert.match(markup, /aria-expanded="true"/);
  assert.match(markup, /role="region"/);
  assert.match(markup, /class="brick-accordion-content-inner"/);
});

test("Progress families render deterministic accessible server anatomy", () => {
  const linear = renderToString(
    React.createElement(
      Progress.Root,
      { value: 40, bufferValue: 70, orientation: "vertical", size: "lg", shape: "pill", tone: "info" },
      React.createElement(Progress.Label, null, "Upload files"),
      React.createElement(Progress.Value, null),
      React.createElement(
        Progress.Track,
        null,
        React.createElement(Progress.Buffer, null),
        React.createElement(Progress.Indicator, null),
      ),
    ),
  );
  assert.match(linear, /role="progressbar"/);
  assert.match(linear, /aria-valuenow="40"/);
  assert.doesNotMatch(linear, /aria-orientation=/);
  assert.match(linear, /data-orientation="vertical"/);
  assert.match(linear, /class="brick-progress"/);
  assert.match(linear, /data-size="lg"/);
  assert.match(linear, /--brick-progress-buffer-percent:70/);
  assert.match(linear, /--brick-progress-percent:40/);

  const circular = renderToString(
    React.createElement(
      ProgressCircle.Root,
      { value: 75, size: "xl", thickness: "thick", cap: "butt", tone: "success" },
      React.createElement(
        ProgressCircle.Circle,
        null,
        React.createElement(ProgressCircle.Track, null),
        React.createElement(ProgressCircle.Indicator, null),
      ),
      React.createElement(ProgressCircle.Value, null),
      React.createElement(ProgressCircle.Label, null, "Export report"),
    ),
  );
  assert.match(circular, /class="brick-progress-circle"/);
  assert.match(circular, /aria-valuenow="75"/);
  assert.match(circular, /viewBox="0 0 100 100"/);
  assert.match(circular, /stroke-dasharray="282\.743/);
  assert.match(circular, /data-percent="75"/);
  assert.match(circular, />75%<\/span>/);
});

test("Toast imports server-safely and declarative parts render deterministic anatomy", () => {
  assert.equal(renderToString(React.createElement(Toaster)), "");
  const markup = renderToString(
    React.createElement(Toast.Root, { forceMount: true, type: "success", closeButton: true },
      React.createElement(Toast.Icon, { type: "success" }),
      React.createElement(Toast.Content, null,
        React.createElement(Toast.Title, null, "Workspace saved"),
        React.createElement(Toast.Description, null, "Available in history"),
      ),
      React.createElement(Toast.Close),
    ),
  );
  assert.match(markup, /class="brick-toast"/);
  assert.match(markup, /data-type="success"/);
  assert.match(markup, /data-slot="toast-icon"/);
  assert.match(markup, /Workspace saved/);
  assert.match(markup, /Dismiss notification/);
  assert.doesNotMatch(markup, /aria-live=/);
});

test("Sidebar renders deterministic app-shell anatomy", () => {
  const markup = renderToString(React.createElement(Sidebar.Root, { defaultState: "rail", collapsedState: "rail", side: "right", variant: "floating" }, React.createElement(Sidebar.Panel, { "aria-label": "Workspace" }, React.createElement(Sidebar.Content, null, "Navigation")), React.createElement(Sidebar.Main, null, "Main")));
  assert.match(markup, /^<div/);
  assert.match(markup, /class="brick-sidebar"/);
  assert.match(markup, /data-state="rail"/);
  assert.match(markup, /data-side="right"/);
  assert.match(markup, /data-variant="floating"/);
  assert.match(markup, /class="brick-sidebar__content"/);
  assert.match(markup, /<main/);
});

test("Nav List renders deterministic navigation anatomy", () => {
  const markup = renderToString(
    React.createElement(
      NavList.Root,
      { "aria-label": "Workspace", variant: "outline" },
      React.createElement(
        NavList.List,
        null,
        React.createElement(
          NavList.Item,
          null,
          React.createElement(NavList.Link, { active: true, href: "/overview" }, "Overview"),
        ),
      ),
    ),
  );
  assert.match(markup, /^<nav/);
  assert.match(markup, /class="brick-nav-list"/);
  assert.match(markup, /data-variant="outline"/);
  assert.match(markup, /aria-current="page"/);
});

test("Scroll Area renders deterministic native Root and Viewport anatomy", () => {
  const markup = renderToString(
    React.createElement(
      ScrollArea.Root,
      { orientation: "horizontal", scrollbarGutter: "stable", scrollbarVisibility: "interaction" },
      React.createElement(ScrollArea.Viewport, { "aria-label": "Timeline", focusable: true }, "Activity"),
    ),
  );
  assert.match(markup, /class="brick-scroll-area"/);
  assert.match(markup, /data-orientation="horizontal"/);
  assert.match(markup, /data-scrollbar-gutter="stable"/);
  assert.match(markup, /data-scrollbar-visibility="interaction"/);
  assert.match(markup, /class="brick-scroll-area-viewport"/);
  assert.match(markup, /role="region"/);
  assert.match(markup, /tabindex="0"/);
});

test("Code and Code Block render deterministic technical content", () => {
  const inline = renderToString(React.createElement(Code, null, "aria-label"));
  assert.match(inline, /^<code/);
  assert.match(inline, /class="brick-code"/);
  assert.match(inline, /data-variant="subtle"/);

  const block = renderToString(
    React.createElement(
      CodeBlock.Root,
      { value: "const value = 1", language: "js" },
      React.createElement(CodeBlock.Content, { "aria-label": "JavaScript source" }),
    ),
  );
  assert.match(block, /class="brick-code-block"/);
  assert.match(block, /data-language="js"/);
  assert.match(block, /<pre[^>]*><code/);
  assert.match(block, /const value = 1/);
});

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
        React.createElement(AtomInput.Root, { name: "email" }),
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

test("Input renders styled native semantics and adornment order during SSR", () => {
  const markup = renderToString(
    React.createElement(Input, {
      "aria-label": "Search",
      defaultValue: "Brick",
      startAdornment: React.createElement("span", null, "Start"),
      endAdornment: React.createElement("span", null, "End"),
      clearable: true,
    }),
  );

  assert.match(markup, /^<span/);
  assert.match(markup, /class="brick-input"/);
  assert.match(markup, /data-variant="outline"/);
  assert.match(markup, /data-size="md"/);
  assert.match(markup, /data-shape="rounded"/);
  assert.match(markup, /<input[^>]*aria-label="Search"[^>]*value="Brick"/);
  assert.match(markup, /aria-label="Clear input"/);
  assert.ok(markup.indexOf(">Start<") < markup.indexOf("<input"));
  assert.ok(markup.indexOf("<input") < markup.indexOf(">End<"));
  assert.ok(markup.indexOf(">End<") < markup.indexOf('aria-label="Clear input"'));
});

test("Textarea renders styled native semantics and Count during SSR", () => {
  const markup = renderToString(
    React.createElement(
      Textarea.Root,
      {
        "aria-label": "Project summary",
        defaultValue: "Brick notes",
        maxLength: 80,
      },
      React.createElement(Textarea.Count),
    ),
  );

  assert.match(markup, /^<span/);
  assert.match(markup, /class="brick-textarea"/);
  assert.match(markup, /data-variant="outline"/);
  assert.match(markup, /data-size="md"/);
  assert.match(markup, /data-shape="rounded"/);
  assert.match(markup, /data-resize="vertical"/);
  assert.match(markup, /<textarea[^>]*aria-label="Project summary"/);
  assert.match(markup, /data-slot="textarea-control"/);
  assert.match(markup, />Brick notes<\/textarea>/);
  assert.match(markup, /data-slot="textarea-count"/);
  assert.match(markup, />11\/80<\/span>/);
});

test("Radio Group renders complete styled radio semantics during SSR", () => {
  const markup = renderToString(React.createElement(RadioGroup.Root, { "aria-label": "Channel", defaultValue: "email", readOnly: true }, React.createElement(RadioGroup.Item, { value: "email" }, "Email"), React.createElement(RadioGroup.Item, { value: "sms" }, "SMS")));
  assert.match(markup, /class="brick-radio-group"/);
  assert.match(markup, /role="radiogroup"/);
  assert.match(markup, /aria-readonly="true"/);
  assert.match(markup, /data-size="md"/);
  assert.match(markup, /class="brick-radio-group-item"/);
  assert.match(markup, /data-slot="radio-group-control"/);
  assert.match(markup, /data-slot="radio-group-dot"/);
  assert.match(markup, /data-slot="radio-group-label"/);
});

test("Switch renders complete styled binary semantics during SSR", () => {
  const markup = renderToString(React.createElement(Switch.Root, { "aria-label": "Reports", defaultChecked: true, readOnly: true, size: "lg" }, React.createElement(Switch.Thumb)));
  assert.match(markup, /class="brick-switch"/);
  assert.match(markup, /role="switch"/);
  assert.match(markup, /aria-checked="true"/);
  assert.match(markup, /aria-readonly="true"/);
  assert.match(markup, /data-size="lg"/);
  assert.match(markup, /class="brick-switch-thumb"/);
  assert.match(markup, /aria-hidden="true"/);
});

test("Breadcrumb renders complete styled hierarchy semantics during SSR", () => {
  const markup = renderToString(
    React.createElement(
      Breadcrumb.Root,
      { ariaLabel: "Project path", size: "lg", variant: "underline" },
      React.createElement(
        Breadcrumb.List,
        null,
        React.createElement(Breadcrumb.Item, null, React.createElement(Breadcrumb.Link, { href: "/" }, "Home")),
        React.createElement(Breadcrumb.Separator, null),
        React.createElement(Breadcrumb.Item, null, React.createElement(Breadcrumb.Page, null, "Report")),
      ),
    ),
  );
  assert.match(markup, /^<nav/);
  assert.match(markup, /aria-label="Project path"/);
  assert.match(markup, /class="brick-breadcrumb"/);
  assert.match(markup, /data-size="lg"/);
  assert.match(markup, /data-variant="underline"/);
  assert.match(markup, /<ol[^>]*class="brick-breadcrumb-list"/);
  assert.match(markup, /<a[^>]*class="brick-breadcrumb-link"[^>]*href="\/"/);
  assert.match(markup, /role="presentation"/);
  assert.match(markup, /aria-hidden="true"/);
  assert.match(markup, /aria-current="page"/);
});

test("Tabs renders complete selected relationships during SSR", () => {
  const markup = renderToString(React.createElement(Tabs.Root, { defaultValue: "one", size: "lg", variant: "soft", fullWidth: true }, React.createElement(Tabs.List, { ariaLabel: "Sections" }, React.createElement(Tabs.Trigger, { value: "one" }, "One"), React.createElement(Tabs.Trigger, { value: "two" }, "Two")), React.createElement(Tabs.Content, { value: "one" }, "Panel one"), React.createElement(Tabs.Content, { value: "two" }, "Panel two")));
  assert.match(markup, /class="brick-tabs"/); assert.match(markup, /data-size="lg"/); assert.match(markup, /data-variant="soft"/); assert.match(markup, /data-full-width=""/); assert.match(markup, /role="tablist"/); assert.match(markup, /aria-selected="true"/); assert.match(markup, /role="tabpanel"/);
});

test("Skeleton renders deterministic loading geometry during SSR", () => {
  const markup = renderToString(React.createElement(Skeleton, { animation: "wave", lines: 3, variant: "text", width: "12rem" }));
  assert.match(markup, /^<span/); assert.match(markup, /class="brick-skeleton"/); assert.match(markup, /data-animation="wave"/); assert.match(markup, /data-lines="3"/); assert.match(markup, /aria-hidden="true"/); assert.match(markup, /--brick-skeleton-width:12rem/);
});

test("Text renders one deterministic semantic host during SSR", () => {
  const markup = renderToString(
    React.createElement(
      Text,
      {
        as: "h2",
        id: "server-heading",
        tone: "secondary",
        variant: "title-sm",
      },
      "Server heading",
    ),
  );

  assert.match(markup, /^<h2/);
  assert.match(markup, /class="brick-text"/);
  assert.match(markup, /data-slot="text"/);
  assert.match(markup, /data-tone="secondary"/);
  assert.match(markup, /data-variant="title-sm"/);
  assert.match(markup, /id="server-heading"/);
  assert.match(markup, />Server heading<\/h2>$/);
  assert.doesNotMatch(markup, /role=|aria-level|tabindex/i);
});

test("Link renders deterministic native navigation without a client boundary", () => {
  const markup = renderToString(
    React.createElement(
      Link,
      {
        "aria-current": "page",
        href: "/guides",
        tone: "neutral",
      },
      "Read the guides",
    ),
  );

  assert.match(markup, /^<a/);
  assert.match(markup, /class="brick-link"/);
  assert.match(markup, /data-slot="link"/);
  assert.match(markup, /data-variant="underline"/);
  assert.match(markup, /data-tone="neutral"/);
  assert.match(markup, /data-size="inherit"/);
  assert.match(markup, /href="\/guides"/);
  assert.match(markup, /aria-current="page"/);
  assert.match(markup, /brick-link__content/);
  assert.doesNotMatch(markup, /role=|tabindex|aria-disabled/i);
});

test("Stack family renders deterministic semantic layout without behavior", () => {
  const markup = renderToString(
    React.createElement(
      Stack,
      { as: "section", gap: "3", id: "server-stack" },
      React.createElement(HStack, { gap: "2", wrap: true }, "Actions"),
      React.createElement(VStack, { gap: "1" }, "Details"),
    ),
  );

  assert.match(markup, /^<section/);
  assert.match(markup, /class="brick-stack"/);
  assert.match(markup, /data-direction="column"/);
  assert.match(markup, /data-gap="3"/);
  assert.match(markup, /id="server-stack"/);
  assert.match(markup, /data-direction="row"/);
  assert.match(markup, /data-align="center"/);
  assert.match(markup, /data-wrap=""/);
  assert.doesNotMatch(markup, /role=|tabindex|aria-orientation/i);
});

test("Grid renders deterministic Root and optional Item layout without behavior", () => {
  const markup = renderToString(
    React.createElement(
      Grid.Root,
      { as: "section", columns: 3, gap: "3", id: "server-grid" },
      React.createElement("article", null, "Ordinary"),
      React.createElement(
        Grid.Item,
        { as: "article", columnSpan: 2 },
        "Featured",
      ),
    ),
  );

  assert.match(markup, /^<section/);
  assert.match(markup, /class="brick-grid"/);
  assert.match(markup, /data-mode="explicit"/);
  assert.match(markup, /data-columns="3"/);
  assert.match(markup, /data-gap="3"/);
  assert.match(markup, /class="brick-grid-item"/);
  assert.match(markup, /data-column-span="2"/);
  assert.match(markup, /id="server-grid"/);
  assert.doesNotMatch(markup, /role=|tabindex/i);
});

test("Container renders one deterministic semantic host without behavior", () => {
  const markup = renderToString(
    React.createElement(
      Container,
      {
        as: "main",
        gutter: "lg",
        id: "server-container",
        measure: "max",
      },
      React.createElement("section", null, "Measured content"),
    ),
  );

  assert.match(markup, /^<main/);
  assert.match(markup, /class="brick-container"/);
  assert.match(markup, /data-measure="max"/);
  assert.match(markup, /data-gutter="lg"/);
  assert.match(markup, /data-slot="container"/);
  assert.match(markup, /id="server-container"/);
  assert.doesNotMatch(markup, /role=|tabindex/i);
});

test("Surface renders one deterministic semantic host without behavior", () => {
  const markup = renderToString(
    React.createElement(
      Surface,
      {
        as: "section",
        bordered: true,
        elevation: "medium",
        id: "server-surface",
        inset: "lg",
        level: "raised",
        radius: "subtle",
      },
      React.createElement("p", null, "Painted content"),
    ),
  );

  assert.match(markup, /^<section/);
  assert.match(markup, /class="brick-surface"/);
  assert.match(markup, /data-bordered=""/);
  assert.match(markup, /data-elevation="medium"/);
  assert.match(markup, /data-inset="lg"/);
  assert.match(markup, /data-level="raised"/);
  assert.match(markup, /data-radius="subtle"/);
  assert.match(markup, /data-slot="surface"/);
  assert.match(markup, /id="server-surface"/);
  assert.doesNotMatch(markup, /role=|tabindex/i);
});

test("Divider renders deterministic Atom-backed line and label anatomy", () => {
  const line = renderToString(React.createElement(Divider, {
    decorative: false,
    orientation: "vertical",
    stretch: true,
    thickness: "regular",
    variant: "dashed",
  }));
  assert.match(line, /^<hr/);
  assert.match(line, /class="brick-divider"/);
  assert.match(line, /role="separator"/);
  assert.match(line, /aria-orientation="vertical"/);
  assert.match(line, /data-thickness="regular"/);
  assert.match(line, /data-variant="dashed"/);

  const label = renderToString(
    React.createElement(Divider, { labelAlign: "start" }, "or continue with"),
  );
  assert.match(label, /^<div/);
  assert.match(label, /data-label-align="start"/);
  assert.match(label, /data-slot="divider-line-start"/);
  assert.match(label, /data-slot="divider-label">or continue with/);
  assert.match(label, /data-slot="divider-line-end"/);
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

test("Icon renders deterministic decorative and informative SVG presentation", () => {
  const graphic = React.createElement("svg", { viewBox: "0 0 16 16" }, React.createElement("circle", { cx: 8, cy: 8, r: 4 }));
  const decorative = renderToString(React.createElement(Icon, null, graphic));
  assert.match(decorative, /^<span/);
  assert.match(decorative, /aria-hidden="true"/);
  assert.match(decorative, /data-size="md"/);
  assert.match(decorative, /data-tone="inherit"/);
  const informative = renderToString(React.createElement(Icon, { label: "Status", tone: "success" }, graphic));
  assert.match(informative, /role="img"/);
  assert.match(informative, /aria-label="Status"/);
  assert.doesNotMatch(informative, /aria-hidden/);
});

test("Image renders deterministic idle and loading fallback anatomy on the server", () => {
  const idle = renderToString(React.createElement(Image.Root, null,
    React.createElement(Image.Content, { alt: "Workspace" }),
    React.createElement(Image.Fallback, null, "Unavailable")));
  assert.match(idle, /class="brick-image"/);
  assert.match(idle, /data-state="idle"/);
  assert.match(idle, /data-fit="cover"/);
  assert.match(idle, /data-position="center"/);
  assert.match(idle, /data-radius="none"/);
  assert.match(idle, /data-frame="none"/);
  assert.match(idle, /brick-image__fallback/);
  assert.doesNotMatch(idle, /<img/);
});

test("List renders deterministic ordered and structured native anatomy", () => {
  const markup = renderToString(React.createElement(List.Root, { ordered: true, reversed: true, start: 4, variant: "bordered" },
    React.createElement(List.Item, { value: 7 },
      React.createElement(List.Leading, null, "✓"),
      React.createElement(List.Content, null,
        React.createElement(List.Title, null, "Package build"),
        React.createElement(List.Description, null, "Verified")),
      React.createElement(List.Trailing, null, "Ready"))));
  assert.match(markup, /^<ol/);
  assert.match(markup, /start="4"/);
  assert.match(markup, /reversed=""/);
  assert.match(markup, /data-variant="bordered"/);
  assert.match(markup, /value="7"/);
  assert.match(markup, /brick-list__leading/);
  assert.match(markup, /brick-list__description/);
  assert.match(markup, /brick-list__trailing/);
});
