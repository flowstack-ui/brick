import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/blockquote?qualification=1"); });

test("docs expose recipes, semantic parts and stable icon geometry", async ({ page }) => {
  await page.goto("/blockquote");
  for (const id of ["with-cite", "tones", "variants", "icon", "custom-icon", "alignment", "with-avatar", "typography", "composition", "props-root", "props-content", "props-caption", "props-icon", "props-cite"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  const basic = page.locator('[data-component-page="blockquote"] .brick-blockquote').first();
  await expect(basic).toHaveCSS("padding-block-start", "0px");
  await expect(basic).toHaveCSS("border-top-left-radius", "0px");
  await expect(basic.locator("blockquote")).toHaveCSS("font-size", "16px");
  await expect(page.locator("#with-cite figcaption")).toHaveCSS("font-size", "14px");
  for (const icon of [page.locator("#icon .brick-blockquote__icon > svg"), page.locator("#custom-icon svg.brick-blockquote__icon")]) {
    await expect(icon).toHaveCSS("width", "20px");
    await expect(icon).toHaveCSS("height", "20px");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
  }
  const composition = page.locator("#composition .brick-blockquote");
  await expect(composition).toHaveJSProperty("tagName", "FIGURE");
  await expect(composition.locator(":scope > blockquote")).toHaveCount(1);
  await expect(composition.locator(":scope > figcaption")).toHaveCount(1);
  const subtle = page.locator('#variants [data-variant="subtle"]');
  const solid = page.locator('#variants [data-variant="solid"]');
  expect(await subtle.evaluate(n => getComputedStyle(n).borderInlineStartColor)).not.toBe(await solid.evaluate(n => getComputedStyle(n).borderInlineStartColor));
  await expect(solid).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate(n => n.scrollWidth)).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).include('[data-component-page="blockquote"]').analyze();
  expect(results.violations).toEqual([]);
});

test("Blockquote preserves native direct-child semantics and source metadata", async ({ page }) => {
  const root = page.getByTestId("blockquote-overview").locator(".brick-blockquote");
  await expect(root).toHaveJSProperty("tagName", "FIGURE");
  await expect(root.locator(":scope > blockquote")).toHaveCount(1);
  await expect(root.locator(":scope > figcaption")).toHaveCount(1);
  await expect(root.locator("blockquote figcaption")).toHaveCount(0);
  await expect(root.locator(":scope > blockquote")).toHaveAttribute("cite", "https://example.com/durable-systems");
  await expect(root.locator("cite")).toHaveText("Designing Durable Systems");
  await expect(root.locator(".brick-blockquote__icon")).toHaveAttribute("aria-hidden", "true");
});

test("Blockquote recipes stay passive, logical, and accessible", async ({ page }) => {
  await expect(page.getByTestId("blockquote-recipes").locator(".brick-blockquote")).toHaveCount(3);
  await expect(page.getByTestId("blockquote-adaptation").locator(".consumer-blockquote")).toHaveAttribute("dir", "rtl");
  await page.keyboard.press("Tab");
  await expect(page.locator(".brick-blockquote :focus")).toHaveCount(0);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
