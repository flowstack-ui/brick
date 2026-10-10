import { expect, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/carousel?qualification=1");
test("Carousel overview and optional controls", async ({ page }) => { await page.setViewportSize({ width: 1120, height: 1300 }); await expect(page.locator("#scenario-carousel-overview")).toHaveScreenshot("overview-light.png"); await expect(page.locator("#scenario-carousel-controls")).toHaveScreenshot("controls-light.png"); });
test("Carousel rotation and appearance", async ({ page }) => { await page.setViewportSize({ width: 1120, height: 1500 }); await page.locator("#scenario-carousel-rotation").getByRole("button", { name: "Stop slide rotation" }).click(); await expect(page.locator("#scenario-carousel-rotation")).toHaveScreenshot("rotation-light.png"); await expect(page.locator("#scenario-carousel-appearance")).toHaveScreenshot("appearance-light.png"); });

test("Carousel measured layouts and shared text actions",async({page})=>{
  await page.setViewportSize({width:1120,height:900});await page.goto("/carousel?appearance=light");
  for(const name of ["Basic","Arrows","Multiple","Variable","Vertical"]){
    const root=page.getByRole("group",{name:`${name} carousel`,exact:true});
    await root.scrollIntoViewIfNeeded();await expect(root).toHaveAttribute("data-initialized","");
    await expect(root).toHaveScreenshot(`${name.toLowerCase()}-measured-light.png`);
  }
});

test("Carousel dark and narrow RTL",async({page})=>{
  await page.setViewportSize({width:480,height:900});await page.goto("/carousel?appearance=dark&exampleDirection=rtl");
  const root=page.getByRole("group",{name:"Basic carousel",exact:true});
  await root.scrollIntoViewIfNeeded();await expect(root).toHaveAttribute("data-initialized","");
  await expect(root.locator('.brick-carousel__controls')).toHaveCSS("display","grid");
  await expect(root.locator('.brick-carousel__picker')).toHaveCSS("grid-row-start","2");
  await expect(root).toHaveScreenshot("basic-narrow-dark-rtl.png", { maxDiffPixelRatio: 0.001 });
});
