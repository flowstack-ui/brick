import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Status } from "../../dist/status.js";

test("Status renders sparse recipes and projected decorative parts on the server", () => {
  const html = renderToStaticMarkup(
    createElement(
      Status.Root,
      { size: { md: "lg" } },
      createElement(Status.Indicator, {
        asChild: true,
        children: createElement("i", { "aria-hidden": false }),
      }),
      "Available",
    ),
  );
  assert.match(html, /data-size="md"/);
  assert.match(html, /data-size-md="lg"/);
  assert.match(html, /<i[^>]*aria-hidden="true"/);
  assert.doesNotMatch(html, /asChild|aria-live|role="status"/);
});
test("Status modular CSS contains proportional geometry and all responsive sizes", async () => {
  const css = await readFile(
    new URL("../../dist/styles/status.css", import.meta.url),
    "utf8",
  );
  assert.match(css, /0?\.64em/);
  for (const bp of ["sm", "md", "lg", "xl"])
    for (const size of ["sm", "md", "lg"])
      assert.ok(
        css.replaceAll('"', "").includes("data-size-" + bp + "=" + size),
      );
});
