import AxeBuilder from "@axe-core/playwright";
import { expect,test } from "../../evidence-test.js";
test.beforeEach(async({page})=>{await page.goto("/rating?qualification=1")});

test("documentation composition, geometry and part headings stay focused", async ({ page }) => {
  await page.goto("/rating?appearance=light");
  const basic = page.getByRole("slider", { name: "Your rating", exact: true });
  await expect(basic).toBeVisible();
  const item = basic.locator(".brick-rating__item").first();
  const art = item.locator(".brick-rating__artwork").first();
  expect((await item.boundingBox())!.width).toBe(44);
  expect((await art.boundingBox())!.width).toBe(20);
  const strip = basic.locator(".brick-rating__control");
  expect((await strip.boundingBox())!.width).toBe(220);
  await basic.focus();
  await expect(strip).toHaveCSS("outline-style", "solid");
  await expect(basic).toHaveCSS("outline-width", "0px");
  for (const size of ["xs", "sm", "md", "lg"]) {
    const root = page.locator("#sizes").getByRole("slider", { name: size + " rating" });
    const width = (await root.locator(".brick-rating__artwork").first().boundingBox())!.width;
    expect(width).toBe(({ xs: 14, sm: 16, md: 20, lg: 24 })[size]);
  }
  expect((await page.getByRole("slider", { name: "Compact targets" }).locator(".brick-rating__item").first().boundingBox())!.width).toBe(24);
  for (const title of ["Root", "RootProvider", "PropsProvider", "Control", "Label", "Item", "ItemIndicator", "Items", "HiddenInput", "Display", "Summary"]) {
    await expect(page.getByRole("heading", { name: title, exact: true })).toHaveCount(1);
    await expect(page.getByRole("table", { name: `Rating.${title} props` })).toHaveCount(1);
  }
  await expect(page.locator("#artwork").getByText("🙂", { exact: true })).toHaveCount(1);
  await expect(page.locator("#aggregates [role='slider']")).toHaveCount(0);
});

test("responsive geometry, disabled cursor and local RTL clipping", async ({ page }) => {
  await page.goto("/rating?appearance=dark");
  await page.setViewportSize({ width: 1000, height: 900 });
  const root = page.getByRole("slider", { name: "Responsive rating" });
  await expect(root.locator(".brick-rating__artwork").first()).toHaveCSS("width", "24px");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(root.locator(".brick-rating__artwork").first()).toHaveCSS("width", "16px");
  await expect(root.locator(".brick-rating__item").first()).toHaveCSS("width", "44px");
  const disabled = page.getByRole("slider", { name: "Disabled", exact: true });
  await expect(disabled).toHaveAttribute("tabindex", "-1");
  await expect(disabled.locator(".brick-rating__item").first()).toHaveCSS("cursor", "not-allowed");
  const nested = page.getByRole("slider", { name: "Half stars" });
  await nested.evaluate(element => { element.parentElement!.dir = "rtl"; element.setAttribute("dir", "ltr"); });
  const fill = nested.locator(".brick-rating__item").nth(3).locator(".brick-rating__artwork--fill");
  await expect(fill).toHaveCSS("clip-path", "inset(0px 50% 0px 0px)");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("native form submits and resets, and custom hosts preserve composition", async ({ page }) => {
  await page.goto("/rating");
  const form = page.locator("#form form");
  const root = form.getByRole("slider");
  await root.focus(); await root.press("End");
  await form.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(form).toContainText("Submitted rating: 5");
  await form.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(root).toHaveAttribute("aria-valuenow", "0");
  await expect(page.locator('#composition input[name="quality"]')).toHaveCount(1);
  const custom = page.locator("#composition").getByRole("slider");
  await expect(custom.locator(".brick-rating__item")).toHaveCount(5);
  await expect(custom.locator("svg")).toHaveCount(10);
});

test("hover preview stays independent and right-click does not commit", async ({ page, isMobile }) => {
  test.skip(isMobile, "Hover is a fine-pointer capability; touch commitment has its own test.");
  await page.goto("/rating");
  const section = page.locator("#hover");
  const root = section.getByRole("slider");
  const last = root.locator(".brick-rating__item").last();
  await last.hover();
  await expect(section).toContainText("Preview: 5");
  await expect(root).toHaveAttribute("aria-valuenow", "3");
  await page.mouse.move(1, 1);
  await expect(section).toContainText("Selected: 3");
  // Native context menus can suspend page pointer events in WebKit. Verify
  // ordinary hover exit first, then independently check secondary activation.
  await last.click({ button: "right" });
  await expect(root).toHaveAttribute("aria-valuenow", "3");
});
test("one-slider semantics, fractional fill, recipes, and Field states are complete",async({page})=>{const root=page.getByTestId("rating-overview").getByRole("slider",{name:"Product rating"});await expect(root).toHaveAttribute("aria-valuenow","3");await expect(root.locator(".brick-rating__item")).toHaveCount(5);await expect(page.getByTestId("rating-values").getByRole("slider").nth(2)).toHaveAttribute("aria-valuenow","3.5");for(const size of ["sm","md","lg"])expect(await page.getByTestId("rating-recipes").locator(`.brick-rating[data-size='${size}']`).count()).toBeGreaterThan(0);await expect(page.getByTestId("rating-states").locator(".brick-rating[data-invalid]")).toHaveCount(1)});
test("forced colors retain a visible selected-versus-empty shape",async({page,browserName})=>{
 test.skip(browserName==='webkit','WebKit does not emulate forced-colors');
 await page.emulateMedia({forcedColors:'active'});
 for(const state of ['data-disabled','data-invalid']) {
  const root=page.getByTestId('rating-states').locator(`.brick-rating[${state}]`);
  await expect(root.locator('.brick-rating__artwork--empty .brick-rating__star').first()).toHaveCSS('fill','none');
  await expect(root.locator('.brick-rating__artwork--fill .brick-rating__star').first()).not.toHaveCSS('fill','none');
 }
});
test("keyboard and RTL are direction aware while read-only remains focusable",async({page})=>{const root=page.getByTestId("rating-input").getByRole("slider").first();await root.focus();await root.press("ArrowRight");await expect(root).toHaveAttribute("aria-valuenow","3");const rtl=page.getByTestId("rating-stress").getByRole("slider",{name:"تقييم الخدمة"});await rtl.focus();await rtl.press("ArrowLeft");await expect(rtl).toHaveAttribute("aria-valuenow","4");const readonly=page.getByTestId("rating-states").locator(".brick-rating[data-readonly]");await expect(readonly).toHaveAttribute("tabindex","0")});
test("repeated selection is stable while clearing remains explicit",async({page})=>{
  const input=page.getByTestId("rating-input");
  const stable=input.getByRole("slider").first();
  const stableItem=stable.locator(".brick-rating__item").nth(1);
  await stableItem.click();
  await stableItem.click();
  await expect(stable).toHaveAttribute("aria-valuenow","2");
  const clearable=input.getByRole("slider").last();
  const clearableItem=clearable.locator(".brick-rating__item").nth(1);
  await clearableItem.click();
  await expect(clearable).toHaveAttribute("aria-valuenow","0");
  await clearableItem.click();
  await expect(clearable).toHaveAttribute("aria-valuenow","2");
});
test("pointer drags cross the complete scale and capture loss keeps the live value",async({page})=>{
  const root=page.getByTestId("rating-input").getByRole("slider").first();
  await root.evaluate(element=>element.scrollIntoView({block:"center"}));
  const items=root.locator(".brick-rating__item");
  const start=await items.nth(1).boundingBox();
  const end=await items.nth(4).boundingBox();
  await page.mouse.move(start!.x+start!.width/2,start!.y+start!.height/2);
  await page.mouse.down();
  await page.mouse.move(end!.x+end!.width/2,end!.y+end!.height/2,{steps:8});
  await expect(root).toHaveAttribute("aria-valuenow","5");
  await page.mouse.up();
  await expect(root).toHaveAttribute("aria-valuenow","5");
  const reverse=await items.nth(3).boundingBox();
  await page.mouse.move(end!.x+end!.width/2,end!.y+end!.height/2);
  await page.mouse.down();
  await page.mouse.move(reverse!.x+reverse!.width/2,reverse!.y+reverse!.height/2,{steps:4});
  await expect(root).toHaveAttribute("aria-valuenow","4");
  await items.nth(4).dispatchEvent("lostpointercapture",{pointerId:1,pointerType:"mouse",isPrimary:true});
  await page.mouse.up();
  await expect(root).toHaveAttribute("aria-valuenow","4");
});
test("fractional pointer segments and RTL dragging are precise",async({page})=>{
  const fractional=page.getByTestId("rating-values").getByRole("slider").nth(2);
  const fourth=fractional.locator(".brick-rating__item").nth(3);
  const fourthBox=await fourth.boundingBox();
  await fourth.click({position:{x:fourthBox!.width*.25,y:fourthBox!.height/2}});
  await expect(fractional).toHaveAttribute("aria-valuenow","3.5");
  await fourth.click({position:{x:fourthBox!.width*.75,y:fourthBox!.height/2}});
  await expect(fractional).toHaveAttribute("aria-valuenow","4");
  const rtl=page.getByTestId("rating-stress").getByRole("slider",{name:"تقييم الخدمة"});
  await rtl.evaluate(element=>element.scrollIntoView({block:"center"}));
  const rtlItems=rtl.locator(".brick-rating__item");
  const rtlStart=await rtlItems.nth(1).boundingBox();
  const rtlEnd=await rtlItems.nth(4).boundingBox();
  await page.mouse.move(rtlStart!.x+rtlStart!.width/2,rtlStart!.y+rtlStart!.height/2);
  await page.mouse.down();
  await page.mouse.move(rtlEnd!.x+1,rtlEnd!.y+rtlEnd!.height/2,{steps:8});
  await page.mouse.up();
  await expect(rtl).toHaveAttribute("aria-valuenow","5");
});
test("native touch taps and drags remain committed",async({page},testInfo)=>{
  test.skip(!testInfo.project.name.startsWith("mobile-"),"requires a touch-enabled project");
  const root=page.getByTestId("rating-input").getByRole("slider").first();
  await root.evaluate(element=>element.scrollIntoView({block:"center"}));
  const items=root.locator(".brick-rating__item");
  const third=await items.nth(2).boundingBox();
  await page.touchscreen.tap(third!.x+third!.width/2,third!.y+third!.height/2);
  await expect(root).toHaveAttribute("aria-valuenow","3");
  await page.waitForTimeout(100);
  await expect(root).toHaveAttribute("aria-valuenow","3");
  test.skip(testInfo.project.name!=="mobile-chromium","native drag requires Chromium touch input");
  const fifth=await items.nth(4).boundingBox();
  const session=await page.context().newCDPSession(page);
  await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:third!.x+third!.width/2,y:third!.y+third!.height/2,id:1,radiusX:4,radiusY:4,force:1}]});
  for(let index=1;index<=6;index++){
    const x=third!.x+third!.width/2+(fifth!.x+fifth!.width/2-(third!.x+third!.width/2))*(index/6);
    await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x,y:fifth!.y+fifth!.height/2,id:1,radiusX:4,radiusY:4,force:1}]});
  }
  await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  await expect(root).toHaveAttribute("aria-valuenow","5");
});
test("mobile containment, targets, and accessibility remain correct",async({page})=>{await page.setViewportSize({width:390,height:844});expect((await page.getByTestId("rating-stress").boundingBox())!.width).toBeLessThanOrEqual(390);const box=await page.getByTestId("rating-overview").locator(".brick-rating__item").first().boundingBox();expect(box!.width).toBeGreaterThanOrEqual(44);expect((await new AxeBuilder({page}).analyze()).violations).toEqual([])});
