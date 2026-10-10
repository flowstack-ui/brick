import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/kbd");
test("documentation tones and sizes", async ({page}) => {
  await expectEvidenceScreenshot(page, page.locator("#variants"), "variants.png");
  await expectEvidenceScreenshot(page, page.locator("#sizes"), "sizes.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#tones"), "tones-dark.png");
  await page.setViewportSize({width:390,height:844});
  await expectEvidenceScreenshot(page, page.locator("#modifier-keys"), "modifiers-mobile.png");
});
