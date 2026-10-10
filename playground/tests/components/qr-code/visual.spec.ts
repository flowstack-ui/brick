import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/qr-code?qualification=1");
test("qr-code scan-safe sizes and logo surfaces", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="qr-code.sizes"]'), "sizes-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="qr-code.logos"]'), "logos-light.png");
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="qr-code.actions"]'), "action-states-light.png");
});

test("portable overlay presents matching brand artwork in light and dark", async ({ page }) => {
  await page.goto("/qr-code");
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    await expectEvidenceScreenshot(page, page.locator("#overlay-export .brick-qr-code"), `portable-overlay-${appearance}.png`);
  }
});
