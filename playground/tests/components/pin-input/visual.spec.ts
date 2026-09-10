import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/pin-input");
test("PinInput full capability visual evidence",async({page})=>{
  for(let index=1;index<=12;index++)await expectEvidenceScreenshot(page,page.locator(`#scenario-pin-input-${index}`),`pin-input-${index}.png`);
  await page.setViewportSize({width:390,height:844});
  await expectEvidenceScreenshot(page,page.getByTestId("pin-input-stress"),"pin-input-mobile.png");
});
