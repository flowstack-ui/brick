import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/highlight");
test("Highlight documentation recipes and custom composition", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator("#tones"), "tones-light.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#variants"), "variants-dark.png");
  await page.setViewportSize({width:390,height:844});
  await expectEvidenceScreenshot(page, page.locator("#wrapping"), "wrapping-mobile.png");
});
