import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/frame");

test("Frame qualified constraints", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("frame-cases"), "constraints-light.png");
});

test("Frame responsive mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("frame-responsive"), "responsive-mobile.png");
});

