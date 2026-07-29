import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/number-input");

test("Number Input visual evidence", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("number-input-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("number-input-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("number-input-states"), "states-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("number-input-appearance"), "appearance.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("number-input-stress"), "stress-mobile.png");
});
