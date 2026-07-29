import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/password-toggle-field");

test("Password Toggle Field visual evidence", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("password-toggle-field-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("password-toggle-field-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("password-toggle-field-states"), "states-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("password-toggle-field-appearance"), "appearance.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("password-toggle-field-stress"), "stress-mobile.png");
});
