import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/center?qualification=1");

test("Center identities and painted composition", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("center-identities"), "identities-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("center-icon-wells"), "icon-wells-light.png");
});

test("Center constrained stress", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("center-flex-pressure"), "flex-pressure-mobile.png");
});

test("Center docs basic and shape examples", async ({ page }) => {
  await page.goto("/center");
  const basic = page.locator("[data-example-canvas]").first();
  await expectEvidenceScreenshot(page, basic, "docs-basic-light.png");
  await expectEvidenceScreenshot(page, page.locator("#circle [data-example-canvas]"), "docs-circles-light.png");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expectEvidenceScreenshot(page, basic, "docs-basic-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#responsive [data-example-canvas]"), "docs-responsive-mobile.png");
});
