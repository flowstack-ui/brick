import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/qr-code");
test("qr-code scan-safe sizes and logo surfaces", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="qr-code.sizes"]'), "sizes-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="qr-code.logos"]'), "logos-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="qr-code.actions"]'), "action-states-light.png");
});
