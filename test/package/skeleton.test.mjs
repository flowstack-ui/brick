import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Skeleton } from "../../dist/skeleton.js";
test("Skeleton built SSR retains its composed host and loading exclusion", () => {
  const markup = renderToStaticMarkup(createElement(Skeleton, {asChild:true, radius:"lg"}, createElement("article", null, "Profile")));
  assert.match(markup, /^<article/);
  assert.match(markup, /inert=""/);
  assert.doesNotMatch(markup, /<span/);
  const loaded = renderToStaticMarkup(createElement(Skeleton, {loading:false, lines:3}));
  assert.doesNotMatch(loaded, /data-loading|aria-hidden|inert=/);
});
test("Skeleton modular CSS gates line paint and provides motion safeguards", async () => {
  const css = await readFile(new URL("../../dist/styles/skeleton.css", import.meta.url), "utf8");
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("forced-colors"));
  assert.ok(css.includes("--brick-skeleton-fade-duration"));
  assert.ok(css.includes("--brick-skeleton-last-line-width"));
});
