import { readFile } from "node:fs/promises";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Prose } from "../../../../dist/prose.js";
import { expect, test } from "@playwright/test";

test("Prose isolates embedded descendants and trims wrapped content", async ({ page }) => {
  const css = await readFile("dist/styles.css", "utf8");
  const markup = renderToStaticMarkup(h(Prose, {size: {initial: "sm", sm: "lg", md: "md", lg: "lg", xl: "sm"}},
    h(Prose.Content, null, h("h2", {id: "first"}, "Heading"), h("p", null, "Document copy")),
    h("ul", null, h("li", null, h("p", {id:"list-copy"}, "First item"))),
    h(Prose.Exclude, null, h("p", {id:"excluded"}, "Outside prose"), h("svg", {id:"icon", width:20, height:20})),
    h("table", null, h("thead", null, h("tr", null, h("th", null, "Header"))))));
  await page.setContent(`<meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style>${markup}`);
  for (const [width,size] of [[390,14],[600,18],[800,16],[1200,18],[1400,14]] as const) {
    await page.setViewportSize({width,height:800});
    await expect(page.locator(".brick-prose")).toHaveCSS("font-size", `${size}px`);
    await expect(page.locator("#first")).toHaveCSS("margin-block-start", "0px");
    await expect(page.locator("#list-copy")).toHaveCSS("margin-block-start", "0px");
    await expect(page.locator("#excluded")).toHaveCSS("font-size", "16px");
    await expect(page.locator("#icon")).toHaveCSS("display", "inline");
    await expect(page.locator("th")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }
  await page.emulateMedia({forcedColors:"active"});
  await expect(page.locator("#first")).toHaveCSS("color", await page.locator(".brick-prose").evaluate(el => getComputedStyle(el).color));
});

test("Prose docs expose parts, copyable examples and narrow containment", async ({page}) => {
  await page.goto("/prose");
  for (const id of ["sizes","lists","quote","table","code","media","measure","tone","boundaries","responsive","props-prose","props-content","props-exclude"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await expect(page.locator("#boundaries .brick-prose-content h2")).toHaveCSS("margin-block-start","0px");
});
