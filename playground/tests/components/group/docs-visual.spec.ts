import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/group");
test("group docs visual composition", async ({ page }) => {
 await expectEvidenceScreenshot(page, page.locator("#mixed [data-example-canvas]"), "docs-light.png");
 await page.evaluate(() => document.documentElement.dataset.brickAppearance = "dark");
 await expectEvidenceScreenshot(page, page.locator("#stacking [data-example-canvas]"), "docs-dark.png");
 await page.setViewportSize({width:375,height:800});
 await expectEvidenceScreenshot(page, page.locator("#vertical [data-example-canvas]"), "docs-mobile.png", { maxDiffPixelRatio: 0 });
});
