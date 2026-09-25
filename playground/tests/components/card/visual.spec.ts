import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/card?qualification=1");
test("Card documentation basic, media and local recipe", async ({ page }) => {
  await page.goto("/card");
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-component-page="card"] .brick-card').first(),
    "docs-basic.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#image"),
    "docs-image.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#media"),
    "docs-horizontal.png",
    { maxDiffPixelRatio: 0 },
  );
  await expect.poll(() => page.locator("#avatar img").evaluate(n => (n as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expectEvidenceScreenshot(page, page.locator("#avatar"), "docs-avatar.png");
  await expectEvidenceScreenshot(
    page,
    page.locator("#variants"),
    "docs-variants.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#profile"),
    "docs-overflow.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#customization"),
    "docs-customization.png",
  );
});
test.beforeEach(async ({ page }) => {
  // Component crops must not contain the sticky application chrome.
  await page.addStyleTag({
    content: ".brick-app-bar { visibility: hidden !important; }",
  });
});

test("Card hierarchy and recipes", async ({ page }) => {
  await expect(page.getByTestId("card-variants")).toHaveScreenshot(
    "variants-light.png",
  );
  await expect(page.getByTestId("card-sizes")).toHaveScreenshot(
    "sizes-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator(".card-customization-list"),
    "customization-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("card-overview")).toHaveScreenshot(
    "overview-dark.png",
  );
  await expect(page.getByTestId("card-appearance")).toHaveScreenshot(
    "appearance-scopes.png",
  );
});

test("Card constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("card-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("card-variants")).toHaveScreenshot(
    "variants-forced-colors.png",
  );
});
