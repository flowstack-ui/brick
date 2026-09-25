import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/format-number?qualification=1");
test("number formats", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("format-number-output"), "formats-light.png");
});
