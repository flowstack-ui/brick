import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/section");
});

test("default is one semantic root with medium logical rhythm", async ({ page }) => {
  const section = page.getByTestId("section-default");
  await expect(section).toHaveJSProperty("tagName", "SECTION");
  await expect(section).toHaveClass(/brick-section/);
  await expect(section).toHaveAttribute("data-spacing", "md");
  await expect(section).toHaveAttribute("data-slot", "section");
  await expect(section).not.toHaveAttribute("role");
  await expect(section).toHaveCSS("box-sizing", "border-box");
  await expect(section).toHaveCSS("padding-top", "76.8px");
  await expect(section).toHaveCSS("padding-bottom", "76.8px");
});

test("closed rhythm scale grows monotonically and remains themeable", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const sections = page.getByTestId("section-scale").locator(".brick-section");
  const padding = await sections.evaluateAll((elements) => elements.map((element) =>
    parseFloat(getComputedStyle(element).paddingTop),
  ));
  expect(padding).toEqual([0, 48, 76.8, 102.4, 128, 153.6]);

  const custom = page.getByTestId("section-customization").locator(".brick-section");
  await expect(custom).toHaveCSS("padding-top", "115.2px");
  await expect(custom).toHaveCSS("padding-bottom", "76.8px");
});

test("responsive rhythm changes at Brick breakpoints without JavaScript", async ({ page }) => {
  const section = page.getByTestId("section-responsive").locator(".brick-section");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(section).toHaveCSS("padding-top", "32px");

  await page.setViewportSize({ width: 800, height: 900 });
  await expect(section).toHaveCSS("padding-top", "64px");

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(section).toHaveCSS("padding-top", "153.6px");
});

test("independent edges change only the requested logical edge", async ({ page }) => {
  const sections = page.getByTestId("section-edges").locator(".brick-section");
  await expect(sections.nth(0)).toHaveCSS("padding-top", "102.4px");
  await expect(sections.nth(0)).toHaveCSS("padding-bottom", "0px");
  await expect(sections.nth(1)).toHaveCSS("padding-top", "0px");
  await expect(sections.nth(1)).toHaveCSS("padding-bottom", "102.4px");
});

test("Surface asChild and Section share one painted semantic host", async ({ page }) => {
  const composition = page.getByTestId("section-composition");
  const painted = composition.locator(":scope > .brick-section.brick-surface");
  await expect(painted).toHaveCount(1);
  await expect(painted).toHaveJSProperty("tagName", "SECTION");
  await expect(painted).toHaveAttribute("data-level", "subtle");
  await expect(painted).toHaveAttribute("data-spacing", "lg");
  await expect(painted.locator(":scope > .brick-container")).toHaveCount(1);
  await expect(painted).toHaveCSS("padding-top", "102.4px");
  await expect(painted).toHaveCSS("background-color", "rgb(242, 240, 237)");
});

test("narrow, RTL, vertical writing, focus flow, and axe remain valid", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("section-stress");
  await expect(stress.locator('[dir="rtl"] .brick-section')).toHaveCSS("direction", "rtl");
  await expect(stress.locator(".section-vertical")).toHaveCSS("writing-mode", "vertical-rl");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
