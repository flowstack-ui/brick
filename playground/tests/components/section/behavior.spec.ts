import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectCssPixels(
  locator: Locator,
  property: string,
  expected: number,
) {
  const value = await locator.evaluate(
    (element, propertyName) =>
      Number.parseFloat(
        getComputedStyle(element).getPropertyValue(propertyName),
      ),
    property,
  );
  expect(value).toBeCloseTo(expected, 3);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/section");
});

test("default is one semantic root with medium logical rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const section = page.getByTestId("section-default");
  await expect(section).toHaveJSProperty("tagName", "SECTION");
  await expect(section).toHaveClass(/brick-section/);
  await expect(section).toHaveAttribute("data-spacing", "md");
  await expect(section).toHaveAttribute("data-slot", "section");
  await expect(section).not.toHaveAttribute("role");
  await expect(section).toHaveCSS("box-sizing", "border-box");
  await expectCssPixels(section, "padding-top", 76.8);
  await expectCssPixels(section, "padding-bottom", 76.8);
});

test("closed rhythm scale grows monotonically and remains themeable", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const sections = page.getByTestId("section-scale").locator(".brick-section");
  const padding = await sections.evaluateAll((elements) => elements.map((element) =>
    parseFloat(getComputedStyle(element).paddingTop),
  ));
  const expectedPadding = [0, 48, 76.8, 102.4, 128, 153.6];
  expect(padding).toHaveLength(expectedPadding.length);
  padding.forEach((value, index) => {
    expect(value).toBeCloseTo(expectedPadding[index], 3);
  });

  const custom = page.getByTestId("section-customization").locator(".brick-section");
  await expectCssPixels(custom, "padding-top", 115.2);
  await expectCssPixels(custom, "padding-bottom", 76.8);
});

test("responsive rhythm changes at Brick breakpoints without JavaScript", async ({ page }) => {
  const section = page.getByTestId("section-responsive").locator(".brick-section");

  await page.setViewportSize({ width: 390, height: 844 });
  await expectCssPixels(section, "padding-top", 32);

  await page.setViewportSize({ width: 800, height: 900 });
  await expectCssPixels(section, "padding-top", 64);

  await page.setViewportSize({ width: 1280, height: 900 });
  await expectCssPixels(section, "padding-top", 153.6);
});

test("independent edges change only the requested logical edge", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const sections = page.getByTestId("section-edges").locator(".brick-section");
  await expectCssPixels(sections.nth(0), "padding-top", 102.4);
  await expectCssPixels(sections.nth(0), "padding-bottom", 0);
  await expectCssPixels(sections.nth(1), "padding-top", 0);
  await expectCssPixels(sections.nth(1), "padding-bottom", 102.4);
});

test("Surface asChild and Section share one painted semantic host", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const composition = page.getByTestId("section-composition");
  const painted = composition.locator(":scope > .brick-section.brick-surface");
  await expect(painted).toHaveCount(1);
  await expect(painted).toHaveJSProperty("tagName", "SECTION");
  await expect(painted).toHaveAttribute("data-level", "subtle");
  await expect(painted).toHaveAttribute("data-spacing", "lg");
  await expect(painted.locator(":scope > .brick-container")).toHaveCount(1);
  await expectCssPixels(painted, "padding-top", 102.4);
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
