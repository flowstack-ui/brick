import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/empty-state?qualification=1");
test("empty state appearance recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="empty-state.appearance"]'), "appearances.png");
});
test("empty state documentation recipes", async ({ page }) => {
  await page.goto("/empty-state");
  for (const appearance of ["light", "dark"] as const) {
    await page.evaluate(value => { document.documentElement.dataset.brickAppearance = value; }, appearance);
    await expectEvidenceScreenshot(page, page.locator('#sizes'), `sizes-${appearance}.png`);
    await expectEvidenceScreenshot(page, page.locator('#with-action'), `actions-${appearance}.png`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ["with-list", "responsive", "illustration", "composition"]) {
    await expectEvidenceScreenshot(page, page.locator(`#${id}`), `${id}-narrow.png`, { maxDiffPixelRatio: 0 });
  }
});
