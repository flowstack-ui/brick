import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("every SVG arrow owner ships the shared paint in its modular CSS", async () => {
  for (const owner of ["dropdown-menu", "context-menu", "menubar", "popover", "hover-card", "tooltip", "toggle-tip"]) {
    const css = await readFile(new URL(`../../dist/styles/${owner}.css`, import.meta.url), "utf8");
    assert.ok(css.includes(".brick-floating-arrow__edge"), owner);
    assert.ok(css.includes(".brick-floating-arrow__join"), owner);
    assert.ok(css.includes("--brick-overlay-arrow-size"), owner);
    assert.ok(!css.includes("var(--brick-floating-arrow-fill,var(--brick-tooltip-background))"), owner);
  }
});
test("span arrows and navigation indicators share the size seed without changing DOM contracts", async () => {
  for (const owner of ["select", "multi-select", "navigation-menu"]) {
    const css = await readFile(new URL(`../../dist/styles/${owner}.css`, import.meta.url), "utf8");
    assert.ok(css.includes("--brick-overlay-arrow-size"), owner);
  }
});
