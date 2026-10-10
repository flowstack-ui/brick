import { expectEvidenceScreenshot, installVisualDefaults, test } from '../../visual-harness.js';
installVisualDefaults('/z-stack');
test('ZStack docs light and dark layers', async ({ page }) => {
  for (const appearance of ['light','dark']) {
    await page.goto(`/z-stack?testMode=1&appearance=${appearance}`);
    await expectEvidenceScreenshot(page, page.locator('[data-example-canvas]').first(), `docs-basic-${appearance}.png`);
    await expectEvidenceScreenshot(page, page.locator('#placement [data-example-canvas]'), `docs-placement-${appearance}.png`);
  }
});
test('ZStack narrow composition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator('#composition [data-example-canvas]'), 'docs-composition-mobile.png');
});
