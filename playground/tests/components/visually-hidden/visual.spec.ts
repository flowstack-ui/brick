import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";

installVisualDefaults("/visually-hidden?qualification=1");

test("Visually Hidden naming, output, and composition", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator(".visually-hidden-page"), "page-spacing-light.png");
  await expect(page.locator("#scenario-visually-hidden-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-visually-hidden-naming")).toHaveScreenshot("naming-light.png");
  await expect(page.locator("#scenario-visually-hidden-output")).toHaveScreenshot("output-light.png");
  await expect(page.locator("#scenario-visually-hidden-composition")).toHaveScreenshot("composition-light.png");
});

test("Visually Hidden dark and mobile stress", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.locator("#scenario-visually-hidden-stress")).toHaveScreenshot("stress-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-visually-hidden-stress")).toHaveScreenshot("stress-mobile.png");
});
