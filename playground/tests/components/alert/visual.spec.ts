import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/alert");
test("alert appearance recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="alert.appearance"]'), "appearances.png");
});
