import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/timeline");
test.use({ viewport: { width: 1120, height: 1500 } });
test("Timeline geometry and appearance", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1500 });
  for (const id of ["basic", "sizes", "recipes", "alternating", "indicators", "appearance"]) await expectEvidenceScreenshot(page, page.locator(`#scenario-timeline-${id}`), `${id}.png`);
});
