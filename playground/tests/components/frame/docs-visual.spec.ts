import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults('/frame');
test('Frame docs in light and dark', async ({ page }) => {
  for (const appearance of ['light', 'dark']) {
    await page.goto(`/frame?appearance=${appearance}&testMode=1`);
    await expectEvidenceScreenshot(page, page.locator('[data-example-canvas]').first(), `docs-basic-${appearance}.png`);
  }
});
test('Frame narrow composition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('#composition [data-example-canvas]'), 'docs-composition-mobile.png');
});
