import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/spinner");
test("spinner size and weight recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="spinner.sizes"]'), "sizes-light.png");
});
