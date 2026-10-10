import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "../../evidence-test.js";

test("comparison buttons have explicit spacing at wide and narrow widths", async ({ page }) => {
  for (const width of [1280, 320]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/toggle-tip");
    for (const id of ["sizes", "placement", "radius"]) {
      const row = page.locator(`#${id} .brick-stack[data-direction="row"][data-wrap="wrap"]`);
      await expect(row).toHaveAttribute("data-gap", "3");
      await expect(row).toHaveCSS("column-gap", "12px");
      await expect(row).toHaveCSS("row-gap", "12px");
      await expect(row).toHaveCSS("flex-wrap", "wrap");
      const boxes = await row.locator("button").evaluateAll(buttons => buttons.map(button => {
        const r = button.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      }));
      for (let i = 1; i < boxes.length; i++) {
        const previous = boxes[i - 1]!;
        const current = boxes[i]!;
        expect(current.left - previous.right >= 11 || current.top - previous.bottom >= 11).toBe(true);
      }
    }
  }
});

test("basic keyboard focus, naming, compact metrics and accessibility", async ({page}) => {
  await page.goto("/toggle-tip");
  const trigger=page.getByRole("button",{name:"More information",exact:true});
  await trigger.focus(); await page.keyboard.press("Enter");
  const tip=page.getByRole("dialog",{name:"More information",exact:true});
  await expect(tip).toBeVisible();
  const metrics=await tip.locator(".brick-toggle-tip__body").evaluate(el=>{const s=getComputedStyle(el);return [s.paddingInlineStart,s.paddingTop,s.fontSize]});
  expect(metrics).toEqual(["8px","4px","12px"]);
  expect((await new AxeBuilder({page}).include(".brick-toggle-tip").analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape"); await expect(tip).toBeHidden(); await expect(trigger).toBeFocused();
});
test("each size changes complete padding and type",async({page})=>{
  await page.goto("/toggle-tip");
  for(const [size,padding,font] of [["xs",8,12],["sm",12,14],["md",16,16],["lg",20,18]] as const){
    await page.locator("#sizes").getByRole("button",{name:size,exact:true}).click();
    const tip=page.getByRole("dialog",{name:size,exact:true}); await expect(tip).toBeVisible();
    expect(await tip.locator(".brick-toggle-tip__body").evaluate(el=>parseFloat(getComputedStyle(el).paddingInlineStart))).toBe(padding);
    expect(await tip.evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBe(font);
    await page.keyboard.press("Escape");
  }
});
test("dismissal policies retain explicit close",async({page})=>{
  await page.goto("/toggle-tip");
  await page.getByRole("button",{name:"Keep open on Escape",exact:true}).click();
  const tip=page.getByRole("dialog"); await expect(tip).toBeVisible();
  await page.keyboard.press("Escape"); await expect(tip).toBeVisible();
  await tip.getByRole("button",{name:"Done"}).click(); await expect(tip).toBeHidden();
  await page.getByRole("button",{name:"Keep open outside",exact:true}).click();
  await page.getByRole("heading",{name:"Outside",exact:true}).click(); await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape"); await expect(page.getByRole("dialog")).toBeHidden();
});
test("nested dialog and link are usable",async({page})=>{
  await page.goto("/toggle-tip");
  await page.getByRole("button",{name:"Open dialog",exact:true}).click();
  await page.getByRole("button",{name:"Storage help",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Storage help",exact:true})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog",{name:"Workspace settings",exact:true})).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button",{name:"Storage details",exact:true}).click();
  await expect(page.getByRole("link",{name:"Read the usage guide"})).toBeFocused();
});
test("narrow RTL and reduced motion stay within viewport",async({page})=>{
  await page.setViewportSize({width:320,height:700});
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/toggle-tip?appearance=dark&exampleDirection=rtl");
  await page.getByRole("button",{name:"With arrow",exact:true}).click();
  const tip=page.getByRole("dialog",{name:"With arrow",exact:true}); await expect(tip).toBeVisible();
  const box=await tip.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x+box!.width).toBeLessThanOrEqual(320);
  await expect(tip.locator("[data-slot=popover-arrow]")).toBeVisible();
});
test("controlled, controller, retained content and inline portal",async({page})=>{
  await page.goto("/toggle-tip");
  for(const name of ["Controlled help","Controller help","Inline portal","Retained help"]){
    await page.getByRole("button",{name,exact:true}).click();
    const tip=page.getByRole("dialog",{name,exact:true});await expect(tip).toBeVisible();
    if(name==="Inline portal")expect(await tip.evaluate(el=>!!el.closest('[data-component-page="toggle-tip"]'))).toBe(true);
    await page.keyboard.press("Escape");await expect(tip).toBeHidden();
  }
  await expect(page.locator('.brick-toggle-tip[aria-label="Retained help"]')).toHaveCount(1);
});
test("placement overrides default gutter and forced colors remain legible",async({page})=>{
  await page.goto("/toggle-tip");
  const trigger=page.getByRole("button",{name:"More information",exact:true});await trigger.click();
  const tip=page.getByRole("dialog",{name:"More information",exact:true});await expect(tip).toHaveAttribute("data-positioned","");
  let a=await trigger.boundingBox(),b=await tip.boundingBox();expect(Math.abs(b!.y-(a!.y+a!.height)-4)).toBeLessThan(1);
  await page.keyboard.press("Escape");
  const bottom=page.locator('#placement').getByRole('button',{name:'bottom',exact:true});await bottom.click();
  const panel=page.getByRole('dialog',{name:'bottom',exact:true});await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute("data-side", "bottom");
  // Gutter is the empty gap to the arrow tip, not to the panel boundary.
  const arrow = panel.locator('[data-slot="popover-arrow"]');
  await expect.poll(async () => {
    const triggerBox = (await bottom.boundingBox())!;
    const arrowBox = (await arrow.boundingBox())!;
    return Math.abs(arrowBox.y - triggerBox.y - triggerBox.height - 8);
  }).toBeLessThan(1);
  await page.emulateMedia({forcedColors:'active'});
  const paint=await panel.locator('[data-slot="popover-viewport"]').evaluate(el=>{const s=getComputedStyle(el);return [s.color,s.backgroundColor,s.borderTopWidth]});
  expect(paint[0]).not.toBe(paint[1]);expect(parseFloat(paint[2])).toBeGreaterThan(0);
});
