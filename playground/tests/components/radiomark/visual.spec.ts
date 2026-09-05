import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/radiomark");
test("radiomark recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("radiomark-output"), "recipes-light.png");
});
