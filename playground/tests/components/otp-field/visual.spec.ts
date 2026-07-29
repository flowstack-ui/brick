import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/otp-field");

test("OTP Field visual evidence", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("otp-field-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("otp-field-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("otp-field-states"), "states-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("otp-field-appearance"), "appearance.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("otp-field-stress"), "stress-mobile.png");
});
