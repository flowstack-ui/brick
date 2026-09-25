import { readFile } from "node:fs/promises";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Paragraph } from "../../../../dist/text.js";
import { expect, test } from "@playwright/test";

test("Text responsive clamp resets and visual controls preserve semantic output", async ({page}) => {
  const css=await readFile("dist/styles.css","utf8");
  const markup=renderToStaticMarkup(h(Paragraph, {lineClamp:{initial:1,md:"none",lg:3}, align:{initial:"justify",lg:"end"}, fontStyle:"italic",numeric:"tabular-nums",decoration:"underline",decorationStyle:"dotted",style:{maxInlineSize:200}, children: "A sufficiently long paragraph that wraps across several lines and can be read completely after the responsive clamp is removed. 1234567890"}));
  await page.setContent(`<style>${css}</style>${markup}`);
  const text=page.locator("p");
  await page.setViewportSize({width:390,height:800});
  await expect(text).toHaveCSS("-webkit-line-clamp","1");
  await expect(text).toHaveCSS("text-align","justify");
  await expect(text).toHaveCSS("font-style","italic");
  await expect(text).toHaveCSS("font-variant-numeric","tabular-nums");
  await expect(text).toHaveCSS("text-decoration-style","dotted");
  await page.setViewportSize({width:800,height:800});
  await expect(text).toHaveCSS("overflow","visible");
  await expect(text).toHaveCSS("display","block");
  await page.setViewportSize({width:1200,height:800});
  await expect(text).toHaveCSS("-webkit-line-clamp","3");
  await expect(text).toHaveCSS("text-align","end");
});

test("Text docs show named recipes and typography part navigation", async ({page}) => {
  await page.goto("/text");
  for (const id of ["sizes","semantics","weights","tone","style","alignment","overflow","responsive","wrap","customization","props-text","props-heading-part","props-paragraph","props-caption","props-eyebrow"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
