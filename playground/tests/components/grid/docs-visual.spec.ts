import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/grid");
test("grid docs visual composition", async ({ page }) => {
 await expectEvidenceScreenshot(page, page.locator("#areas [data-example-canvas]"), "docs-light.png");
 await page.evaluate(() => document.documentElement.dataset.brickAppearance = "dark");
 await expectEvidenceScreenshot(page, page.locator("#spans [data-example-canvas]"), "docs-dark.png");
 await page.setViewportSize({width:375,height:800});
 await expectEvidenceScreenshot(page, page.locator("#responsive [data-example-canvas]"), "docs-mobile.png");
});
