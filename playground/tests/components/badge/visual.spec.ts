import { expect, expectEvidenceScreenshot, installVisualDefaults, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/badge?qualification=1");

test.beforeEach(async ({ page }) => {
  // Component-only captures exclude the sticky application header, not Badge content.
  await page.addStyleTag({ content: "[data-playground-app-bar] { visibility: hidden !important; }" });
});

test("Badge documentation icons and passive circles", async ({page}) => {
  await page.goto('/badge');
  await expectEvidenceScreenshot(page,page.locator('#icons'),'docs-icons.png');
  await expectEvidenceScreenshot(page,page.locator('#shapes'),'docs-shapes.png');
});

test("Badge recipes and geometry", async ({ page }) => {
  await expect(page.getByTestId("badge-variants")).toHaveScreenshot("variants-light.png");
  // Capture one paint at a time so a tall matrix cannot pass behind sticky shell chrome.
  for (const [index, variant] of ["soft", "solid", "outline", "surface", "plain"].entries()) {
    await expectEvidenceScreenshot(page, page.getByTestId("badge-tones").locator(":scope > *").nth(index), `tones-${variant}-light.png`);
  }
  await expect(page.getByTestId("badge-sizes")).toHaveScreenshot("sizes-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("badge-composition"), "composition-output-light.png");
  await expect(page.getByTestId("badge-appearance")).toHaveScreenshot("appearance-light.png");
  await expectEvidenceScreenshot(page, page.locator(".badge-customization"), "customization-light.png");
});

test("Badge constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("badge-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("badge-variants")).toHaveScreenshot("variants-forced-colors.png");
});
