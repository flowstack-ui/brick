import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/center");

test("Center identities and painted composition", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("center-identities"), "identities-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("center-icon-wells"), "icon-wells-light.png");
});

test("Center constrained stress", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("center-flex-pressure"), "flex-pressure-mobile.png");
});
