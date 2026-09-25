import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/alert?qualification=1");
test("alert appearance recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="alert.appearance"]'), "appearances.png");
});
test("alert compact documentation recipes in light and dark", async ({ page }) => {
  for (const appearance of ["light", "dark"]) {
    await page.goto(`/alert?appearance=${appearance}`);
    await page.evaluate(() => document.fonts.ready);
    for (const id of ["statuses", "variants", "sizes", "customization"]) {
      await expectEvidenceScreenshot(page, page.locator(`#${id}`), `docs-${id}-${appearance}.png`);
    }
  }
});
test("alert narrow content and dismiss action remain contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/alert?appearance=dark");
  await page.evaluate(() => document.fonts.ready);
  for (const id of ["with-close-button", "with-spinner", "inline", "responsive"]) {
    await expectEvidenceScreenshot(page, page.locator(`#${id}`), `docs-${id}-narrow.png`);
  }
});
