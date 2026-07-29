import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/show");
test("Show overview, breakpoints, and stress", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 }); await expectEvidenceScreenshot(page, page.getByTestId("show-overview"), "overview-light.png"); await expectEvidenceScreenshot(page, page.getByTestId("show-breakpoints"), "breakpoints-light.png");
  await page.setViewportSize({ width: 390, height: 844 }); await expectEvidenceScreenshot(page, page.getByTestId("show-stress"), "stress-mobile.png");
});
