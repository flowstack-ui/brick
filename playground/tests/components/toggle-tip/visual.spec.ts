import { test, expect } from "../../evidence-test.js";
for(const appearance of ["light","dark"]){
  test(`compact help ${appearance}`,async({page},testInfo)=>{
    test.skip(testInfo.project.name!=="chromium","Reviewed desktop Chromium visual baseline.");
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto(`/toggle-tip?appearance=${appearance}&font=inter`);
    await page.getByRole("button",{name:"With arrow",exact:true}).click();
    const tip=page.getByRole("dialog",{name:"With arrow",exact:true});
    await expect(tip).toBeVisible();
    await page.evaluate(()=>document.fonts.ready);
    await expect(tip).toHaveCSS("scale","1");
    const box=await tip.boundingBox();
    await expect(page).toHaveScreenshot(`tip-${appearance}.png`,{clip:{x:Math.max(0,box!.x-12),y:Math.max(0,box!.y-12),width:box!.width+24,height:box!.height+24}});
  });
}
