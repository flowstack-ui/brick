import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/floating-panel");
for(const appearance of ["light","dark"] as const){
  test(`FloatingPanel ${appearance}`,async({page})=>{
    await setAppearance(page,appearance);
    await page.getByRole("button",{name:"Open basic",exact:true}).click();
    await expectEvidenceScreenshot(page,page.getByRole("dialog",{name:"Inspector basic",exact:true}),`floating-panel-${appearance}.png`);
  });
}
