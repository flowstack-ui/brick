import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/frame");
});

test("the four qualified constraint families resolve without prop leakage", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const cases = page.getByTestId("frame-cases").locator(".brick-frame");
  await expect(cases.nth(0)).toHaveCSS("min-width", "144px");
  await expect(cases.nth(1)).toHaveCSS("max-width", /px$/);
  expect(
    await cases
      .nth(1)
      .evaluate((element) =>
        element.style.getPropertyValue("--brick-frame-max-inline-size"),
      ),
  ).toBe("48ch");
  await expect(cases.nth(2)).toHaveCSS("min-height", "288px");
  await expect(cases.nth(3)).toHaveCSS("max-height", "256px");
  await expect(cases.nth(3).locator(".brick-scroll-area")).toHaveCSS(
    "height",
    "256px",
  );
});

test("responsive constraints carry forward through standard breakpoints", async ({
  page,
}) => {
  const frame = page.getByTestId("frame-responsive");
  await page.setViewportSize({ width: 390, height: 844 });
  const previewWidth = await frame
    .locator("xpath=parent::*")
    .evaluate((element) => element.getBoundingClientRect().width);
  expect(
    await frame.evaluate((element) => element.getBoundingClientRect().width),
  ).toBeCloseTo(previewWidth, 3);
  await expect(frame).toHaveCSS("min-height", "128px");
  await page.setViewportSize({ width: 800, height: 900 });
  expect(
    await frame.evaluate((element) => getComputedStyle(element).width),
  ).toMatch(/px$/);
  await expect(frame).toHaveCSS("min-height", "128px");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(frame).toHaveCSS("min-height", "192px");
});

test("asChild keeps one semantic painted host", async ({ page }) => {
  const frame = page.getByTestId("frame-composed");
  await expect(frame).toHaveJSProperty("tagName", "ARTICLE");
  await expect(frame).toHaveClass(/brick-frame/);
  await expect(frame).toHaveClass(/brick-surface/);
  await expect(frame).toHaveCSS("max-width", "576px");
});

test("nested Frames do not inherit any parent constraints", async ({
  page,
}) => {
  const parent = page.getByTestId("frame-nested-parent");
  const child = page.getByTestId("frame-nested-child");
  const autoChild = page.getByTestId("frame-nested-auto");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(parent).toHaveCSS("height", "384px");
  await expect(child).toHaveCSS("height", "192px");
  await expect(autoChild).not.toHaveCSS("height", "384px");
});

test("logical stress and axe remain valid", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.brick-frame[dir="rtl"]')).toHaveCSS(
    "direction",
    "rtl",
  );
  await expect(page.locator(".frame-vertical")).toHaveCSS(
    "writing-mode",
    "vertical-rl",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
