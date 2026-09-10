import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/overlay-manager");
for(const appearance of ["light","dark"] as const){
  test(`OverlayManager Drawer ${appearance}`,async({page})=>{
    await setAppearance(page,appearance);
    await page.getByRole("button",{name:"Open drawer",exact:true}).click();
    await expectEvidenceScreenshot(page,page.getByRole("dialog",{name:"Workspace drawer",exact:true}),`overlay-manager-drawer-${appearance}.png`);
  });
  test(`OverlayManager Dialog ${appearance}`,async({page})=>{
    await setAppearance(page,appearance);
    await page.getByRole("button",{name:"Open dialog",exact:true}).click();
    await expectEvidenceScreenshot(page,page.getByRole("dialog",{name:"Workspace dialog",exact:true}),`overlay-manager-dialog-${appearance}.png`);
  });
}
