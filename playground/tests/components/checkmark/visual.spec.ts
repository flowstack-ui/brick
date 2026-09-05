import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/checkmark");
test("checkmark recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("checkmark-output"), "recipes-light.png");
});
