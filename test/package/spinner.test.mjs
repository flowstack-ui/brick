import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Spinner } from "../../dist/spinner.js";

test("Spinner built entry supports responsive rings and passive projected artwork on the server", () => {
  assert.match(renderToStaticMarkup(h(Spinner, {size:{md:"lg"}})), /data-size-md="lg"/);
  const svg=renderToStaticMarkup(h(Spinner,{asChild:true,label:"Working"},h("svg",{viewBox:"0 0 24 24"})));
  assert.match(svg,/^<svg/); assert.match(svg,/data-spinner-artwork=""/);
  assert.match(svg,/aria-label="Working"/); assert.doesNotMatch(svg,/<span|asChild=/);
});
test("Spinner modular CSS includes ring, artwork, breakpoints and preference rules", async () => {
  const css=await readFile(new URL("../../dist/styles/spinner.css",import.meta.url),"utf8");
  for (const marker of ["data-spinner-artwork","data-size-md","prefers-reduced-motion","brick-spinner-spin","--brick-spinner-duration"]) assert.ok(css.includes(marker),marker);
});
