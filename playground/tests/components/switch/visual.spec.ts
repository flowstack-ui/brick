import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/switch?qualification=1");

test("Switch defaults, sizes, composition, and appearance", async ({ page }) => {
  await expect(page.getByTestId("switch-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("switch-sizes")).toHaveScreenshot("sizes-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("switch-composition"), "composition-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("switch-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Switch responsive, RTL, and forced-color states", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("switch-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("switch-states")).toHaveScreenshot("states-forced-colors.png");
});

test("Switch public examples are visually coherent", async ({ page }) => {
  await page.goto("/switch");
  await expectEvidenceScreenshot(page, page.locator("#tones"), "docs-tones-light.png");
  await expectEvidenceScreenshot(page, page.locator("#indicators"), "docs-indicators-light.png");
  await expectEvidenceScreenshot(page, page.locator("#hook-form"), "docs-hook-form-light.png");
  await expectEvidenceScreenshot(page, page.locator("#rtl-composition"), "docs-rtl-composition-light.png");
  await expectEvidenceScreenshot(page, page.locator("#custom-colors"), "docs-custom-colors-light.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#states"), "docs-states-dark.png");
  await expectEvidenceScreenshot(page, page.locator("#tones"), "docs-tones-dark.png");
  await expectEvidenceScreenshot(page, page.locator("#custom-colors"), "docs-custom-colors-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#label-placement"), "docs-label-placement-narrow.png");
  await expectEvidenceScreenshot(page, page.locator("#responsive"), "docs-responsive-narrow.png");
});
