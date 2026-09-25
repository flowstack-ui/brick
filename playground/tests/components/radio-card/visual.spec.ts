import { expect, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/radio-card?qualification=1");
test("RadioCard recipes and anatomy",async({page},info)=>{
  test.skip(info.project.name!=="chromium","Chromium visual review; other profiles verify behavior.");
  for(const section of ["variants","sizes","attached"]) await expect(page.locator(`[data-scenario="radio-card.${section}"]`)).toHaveScreenshot(`${section}-light.png`);
  await setAppearance(page,"dark");
  for(const section of ["variants","states","addon"]) await expect(page.locator(`[data-scenario="radio-card.${section}"]`)).toHaveScreenshot(`${section}-dark.png`);
});
