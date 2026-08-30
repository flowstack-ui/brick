import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/em"); });

test("Em preserves native semantics and inherited contexts", async ({ page }) => {
  const overview = page.getByTestId("em-overview").locator(".brick-em");
  await expect(overview).toHaveJSProperty("tagName", "EM");
  await expect(overview).toHaveAttribute("data-slot", "em");
  await expect(overview).toHaveText("before");
  await expect(page.getByTestId("em-context").locator(".brick-em")).toHaveCount(4);

  const metrics = await page.getByTestId("em-context").locator("p").first().evaluate((paragraph) => {
    const emphasis = paragraph.querySelector("em")!;
    const parent = getComputedStyle(paragraph);
    const child = getComputedStyle(emphasis);
    return {
      parentSize: parent.fontSize,
      childSize: child.fontSize,
      parentLineHeight: parent.lineHeight,
      childLineHeight: child.lineHeight,
    };
  });
  expect(metrics.childSize).toBe(metrics.parentSize);
  expect(metrics.childLineHeight).toBe(metrics.parentLineHeight);
});

test("Em adds no interaction and has no accessibility violations", async ({ page }) => {
  await expect(page.getByTestId("em-native").locator(".brick-em")).toHaveAttribute("data-owner", "playground");
  await page.keyboard.press("Tab");
  await expect(page.locator(".brick-em:focus")).toHaveCount(0);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
