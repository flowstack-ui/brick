import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Switch,
  SwitchField,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  useSwitch,
} from "../../dist/switch.js";

test("Switch packed subpath exports compound API and stable SSR associations", () => {
  assert.equal(Switch.Field, SwitchField);
  assert.equal(Switch.Control, SwitchControl);
  assert.equal(Switch.HiddenInput, SwitchHiddenInput);
  assert.equal(typeof useSwitch, "function");
  const html = renderToStaticMarkup(
    createElement(
      Switch.Field,
      { id: "digest", defaultChecked: true, name: "digest", size: { initial: "sm", md: "lg" }, variant: { md: "raised" } },
      createElement(Switch.Control),
      createElement(Switch.Label, null, "Daily digest"),
      createElement(Switch.HiddenInput),
    ),
  );
  assert.match(html, /id="digest-control"/);
  assert.match(html, /for="digest-control"/);
  assert.match(html, /id="digest-input"/);
  assert.match(html, /data-size-md="lg"/);
  assert.match(html, /data-variant-md="raised"/);
  assert.equal((html.match(/type="checkbox"/g) ?? []).length, 1);
  assert.equal((html.match(/brick-switch-thumb/g) ?? []).length, 1);
});

test("Switch modular CSS closes responsive, color, direction and preference recipes", async () => {
  const css = (await readFile(new URL("../../dist/styles/switch.css", import.meta.url), "utf8")).replaceAll('"', "");
  for (const breakpoint of ["sm", "md", "lg", "xl"]) {
    for (const size of ["xs", "sm", "md", "lg"]) assert.ok(css.includes(`data-size-${breakpoint}=${size}`));
    for (const variant of ["solid", "raised"]) assert.ok(css.includes(`data-variant-${breakpoint}=${variant}`));
  }
  for (const token of ["--brick-switch-checked-hover-background", "--brick-switch-checked-pressed-background", "--brick-switch-raised-checked-rail"]) assert.ok(css.includes(token));
  assert.ok(css.includes(":dir(rtl)"));
  assert.ok(css.includes("prefers-reduced-motion"));
  assert.ok(css.includes("forced-colors"));
});
