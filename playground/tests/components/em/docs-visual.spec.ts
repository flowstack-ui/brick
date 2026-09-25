import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/em");
test("Em documentation typography and mobile wrapping",async({page})=>{
 await expectEvidenceScreenshot(page,page.locator("#typography"),"typography-light.png");
 await setAppearance(page,"dark");
 await expectEvidenceScreenshot(page,page.locator("#composition"),"composition-dark.png");
 await page.setViewportSize({width:390,height:844});
 await expectEvidenceScreenshot(page,page.locator("#wrapping"),"wrapping-mobile.png");
});
