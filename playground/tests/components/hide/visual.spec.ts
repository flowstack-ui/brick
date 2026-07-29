import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/hide");
test("Hide overview, breakpoints, and stress", async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 900 }); await expectEvidenceScreenshot(page, page.getByTestId("hide-overview"), "overview-light.png"); await expectEvidenceScreenshot(page, page.getByTestId("hide-breakpoints"), "breakpoints-light.png"); await expectEvidenceScreenshot(page, page.getByTestId("hide-stress"), "stress-mobile.png");
});
