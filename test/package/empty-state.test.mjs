import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EmptyState } from "../../dist/empty-state.js";

test("EmptyState built public API preserves SSR, responsive defaults and heading semantics", () => {
  const html = renderToStaticMarkup(createElement(EmptyState.Root, {
    size: { md: "lg" }, align: { lg: "start" }, asChild: true,
    children: createElement("section", { "aria-label": "Projects" },
      createElement(EmptyState.Content, null,
        createElement(EmptyState.Title, { as: "h2" }, "No projects"))),
  }));
  assert.match(html, /<section/);
  assert.match(html, /data-size="md"/);
  assert.match(html, /data-size-md="lg"/);
  assert.match(html, /data-align="center"/);
  assert.match(html, /data-align-lg="start"/);
  assert.match(html, /<h2/);
  assert.doesNotMatch(html, /asChild|aria-live|\[object Object\]/);
});

test("EmptyState modular CSS ships every responsive size and alignment", async () => {
  const css = (await readFile(new URL("../../dist/styles/empty-state.css", import.meta.url), "utf8")).replaceAll('"', "");
  for (const breakpoint of ["sm", "md", "lg", "xl"]) {
    for (const size of ["sm", "md", "lg"]) assert.ok(css.includes(`data-size-${breakpoint}=${size}`));
    for (const align of ["start", "center"]) assert.ok(css.includes(`data-align-${breakpoint}=${align}`));
  }
  assert.ok(css.includes("--brick-empty-state-title-line-height"));
  assert.ok(css.includes("forced-colors"));
});
