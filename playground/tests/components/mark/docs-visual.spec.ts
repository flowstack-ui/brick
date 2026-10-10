import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/mark");
test("Mark documentation variants and tones",async({page})=>{
  await expectEvidenceScreenshot(page,page.locator("#variants"),"variants.png");
  await setAppearance(page,"dark");
  await expectEvidenceScreenshot(page,page.locator("#tones"),"tones-dark.png");
  await page.setViewportSize({width:390,height:844});
  await expectEvidenceScreenshot(page,page.locator("#wrapping"),"wrapping-mobile.png");
});
