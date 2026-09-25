import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/pin-input?qualification=1");
test("PinInput full capability visual evidence",async({page})=>{
  for(let index=1;index<=12;index++)await expectEvidenceScreenshot(page,page.locator(`#scenario-pin-input-${index}`),`pin-input-${index}.png`);
  await page.setViewportSize({width:390,height:844});
  await expectEvidenceScreenshot(page,page.getByTestId("pin-input-stress"),"pin-input-mobile.png");
});
test("PinInput focused docs recipes",async({page})=>{
 await page.goto("/pin-input?testMode=1");
 for(const id of ["variants","tones","separator","field","hookform","states"]){await expectEvidenceScreenshot(page,page.locator(`#${id}`),`docs-${id}.png`);}
});
