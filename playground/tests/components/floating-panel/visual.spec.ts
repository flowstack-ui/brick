import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/floating-panel?qualification=1");
for(const appearance of ["light","dark"] as const){
  test(`FloatingPanel ${appearance}`,async({page})=>{
    await setAppearance(page,appearance);
    await page.getByRole("button",{name:"Open basic",exact:true}).click();
    await expectEvidenceScreenshot(page,page.getByRole("dialog",{name:"Inspector basic",exact:true}),`floating-panel-${appearance}.png`);
  });
}
for(const appearance of ["light","dark"] as const){
  test(`FloatingPanel docs ${appearance}`,async({page})=>{
    await page.goto("/floating-panel");
    await setAppearance(page,appearance);
    await page.getByRole("button",{name:"Floating panel",exact:true}).click();
    await expectEvidenceScreenshot(page,page.getByRole("dialog",{name:"Floating panel",exact:true}),`floating-panel-docs-${appearance}.png`);
  });
}
test("FloatingPanel compact narrow header",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto("/floating-panel");
  await page.getByRole("button",{name:"Floating panel",exact:true}).click();
  await expectEvidenceScreenshot(page,page.getByRole("dialog",{name:"Floating panel",exact:true}),"floating-panel-docs-narrow.png");
});
