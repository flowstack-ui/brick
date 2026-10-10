import { readFile } from "node:fs/promises";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Blockquote } from "../../../../dist/blockquote.js";
import { Prose } from "../../../../dist/prose.js";
import { expect, test } from "@playwright/test";

test("Blockquote owns its border and padding inside Prose across CSS entries", async ({ page }) => {
  const [complete, core, prose, blockquote] = await Promise.all(
    ["styles.css", "styles/core.css", "styles/prose.css", "styles/blockquote.css"]
      .map((path) => readFile(`dist/${path}`, "utf8")),
  );
  const markup = renderToStaticMarkup(h(Prose, { size: "lg" },
    h("blockquote", { id: "native-quote" }, "An ordinary editorial quotation."),
    ...(["accent", "surface", "plain"] as const).map((variant) =>
      h(Blockquote.Root, { key: variant, variant },
        h(Blockquote.Content, null, "Clarity compounds."),
        h(Blockquote.Caption, null, "— Rowan Chen"),
      )),
  ));

  for (const css of [complete, [core, prose, blockquote].join("\n"), [core, blockquote, prose].join("\n")]) {
    await page.setContent(`<style>${css}</style>${markup}`);
    for (const appearance of ["light", "dark"]) {
      for (const direction of ["ltr", "rtl"]) {
        await page.locator("html").evaluate((node, state) => {
          node.setAttribute("data-brick-appearance", state.appearance);
          node.setAttribute("dir", state.direction);
        }, { appearance, direction });
        for (const variant of ["accent", "surface", "plain"]) {
          const root = page.locator(`.brick-blockquote[data-variant="${variant}"]`);
          const content = root.locator(".brick-blockquote__content");
          await expect(content).toHaveCSS("border-inline-start-width", "0px");
          await expect(content).toHaveCSS("padding", "0px");
          await expect(content).toHaveCSS("font-size", "18px");
          await expect(root).toHaveCSS("border-inline-start-width", variant === "plain" ? "0px" : "4px");
        }
        await expect(page.locator("#native-quote")).toHaveCSS("border-inline-start-width", "4px");
        await expect(page.locator("#native-quote")).not.toHaveCSS("padding-inline-start", "0px");
      }
    }
  }
});
