import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async({page})=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/floating-panel?qualification=1");});
for (const stage of ["default", "minimized", "maximized"] as const) {
  test(`normal-motion ${stage} close preserves geometry throughout exit`, async ({page}) => {
    await page.emulateMedia({reducedMotion:"no-preference"});
    await page.getByRole("button",{name:"Open basic",exact:true}).click();
    const panel=page.getByRole("dialog",{name:"Inspector basic",exact:true});
    if(stage!=="default") await page.getByRole("button",{name:stage==="minimized"?"Minimize basic":"Maximize basic",exact:true}).click();
    const before=await panel.boundingBox();
    const samples=panel.evaluate(node=>new Promise<Array<{x:number;y:number;width:number;height:number;stage:string|null;animation:string}>>(resolve=>{
      const frames:Array<{x:number;y:number;width:number;height:number;stage:string|null;animation:string}>=[];
      const tick=()=>{
        if(!node.isConnected || (node as HTMLElement).hidden){resolve(frames);return;}
        const style=getComputedStyle(node);
        if(node.getAttribute("data-presence")==="closed" && style.display!=="none") {
          const r=node.getBoundingClientRect();
          frames.push({x:r.x,y:r.y,width:r.width,height:r.height,stage:node.getAttribute("data-stage"),animation:style.animationName});
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }));
    await page.getByRole("button",{name:"Close basic",exact:true}).click();
    const frames=await samples;
    expect(frames.length).toBeGreaterThan(0);
    for(const frame of frames){
      expect(frame.animation).toBe("brick-floating-panel-exit");
      expect(frame.stage).toBe(stage);
      expect({x:frame.x,y:frame.y,width:frame.width,height:frame.height}).toEqual(before);
    }
    await page.getByRole("button",{name:"Open basic",exact:true}).click();
    await expect(panel).toHaveAttribute("data-stage","default");
    await expect(panel).toBeFocused();
  });
}
test("polished header controls, keyboard geometry and minimized border box",async({page})=>{
  await page.getByRole("button",{name:"Open basic",exact:true}).click();
  const panel=page.getByRole("dialog",{name:"Inspector basic",exact:true});
  await expect(panel).toBeFocused();
  const before=await panel.boundingBox();
  await page.keyboard.press("ArrowRight");
  await expect.poll(async()=>(await panel.boundingBox())!.x).toBe(before!.x+1);
  await page.getByRole("button",{name:"Minimize basic",exact:true}).click();
  await expect(panel).toHaveAttribute("data-stage","minimized");
  const minimized=await panel.evaluate(node=>({height:node.clientHeight,scroll:node.scrollHeight}));
  expect(minimized.scroll).toBeLessThanOrEqual(minimized.height+1);
  await page.getByRole("button",{name:"Restore basic",exact:true}).click();
  await expect.poll(async()=>(await panel.boundingBox())!.height).toBe(before!.height);
  const scan=await new AxeBuilder({page}).include(".brick-floating-panel-content").analyze();
  expect(scan.violations.filter(v=>v.impact==="serious"||v.impact==="critical")).toEqual([]);
  await page.getByRole("button",{name:"Close basic",exact:true}).click();
  await expect(panel).toBeHidden();
});
test("nested popover and modal paint above their owning panel",async({page})=>{
  await page.getByRole("button",{name:"Open focus",exact:true}).click();
  const panel=page.getByRole("dialog",{name:"Inspector focus",exact:true});
  const panelIndex=await panel.locator("..").evaluate(node=>Number(getComputedStyle(node).zIndex));
  await page.getByRole("button",{name:"Open inspector options",exact:true}).click();
  const popover=page.getByRole("dialog",{name:"Inspector options",exact:true});
  await expect(popover).toBeVisible();
  expect(await popover.evaluate(node=>Number(getComputedStyle(node).zIndex))).toBeGreaterThan(panelIndex);
  await page.keyboard.press("Escape");
  await expect(popover).toBeHidden();
  await page.getByRole("button",{name:"Confirm workspace change",exact:true}).click();
  const modal=page.getByRole("dialog",{name:"Apply workspace changes?",exact:true});
  await expect(modal).toBeVisible();
  expect(await modal.evaluate(node=>Number(getComputedStyle(node).zIndex))).toBeGreaterThan(panelIndex);
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();await expect(panel).toBeVisible();
});
test("retained drafts and rejected controlled changes remain stable",async({page})=>{
  await page.getByRole("button",{name:"Open presence",exact:true}).click();
  await page.getByLabel("Workspace name presence",{exact:true}).fill("Retained draft");
  await page.getByRole("button",{name:"Close presence",exact:true}).click();
  await page.getByRole("button",{name:"Open presence",exact:true}).click();
  await expect(page.getByLabel("Workspace name presence",{exact:true})).toHaveValue("Retained draft");
  await page.getByRole("button",{name:"Close presence",exact:true}).click();
  const specimen=page.locator('[data-scenario="floating-panel.position"]');
  await specimen.getByRole("button",{name:"Reject changes",exact:true}).click();
  await page.getByRole("button",{name:"Open position",exact:true}).click();
  const panel=page.getByRole("dialog",{name:"Inspector position",exact:true});
  const before=await panel.boundingBox();await panel.focus();await page.keyboard.press("ArrowRight");
  expect((await panel.boundingBox())!.x).toBe(before!.x);
});
test("iframe and shadow-root hosts retain independent geometry",async({page})=>{
  const frame=page.frameLocator('iframe[title="Independent panel document"]');
  await frame.getByRole("button",{name:"Open iframe",exact:true}).click();
  const panel=frame.getByRole("dialog",{name:"Inspector iframe",exact:true});
  await expect(panel).toBeVisible();
  const expectedX=await panel.evaluate(el=>{
    const positioner=el.parentElement!;
    const boundary=(positioner as HTMLElement).offsetParent as HTMLElement;
    return Math.min(parseFloat(positioner.style.left)+1,Math.max(0,boundary.clientWidth-positioner.offsetWidth));
  });
  await panel.focus();await page.keyboard.press("ArrowRight");
  await expect(frame.getByRole("status")).toContainText(`accepted x ${Math.round(expectedX)}`);
  await frame.getByRole("button",{name:"Close iframe",exact:true}).click();await expect(panel).toBeHidden();
  await page.getByRole("button",{name:"Open shadow root",exact:true}).click();
  const shadow=page.getByRole("dialog",{name:"Inspector shadow root",exact:true});await expect(shadow).toBeVisible();
  await page.getByRole("button",{name:"Close shadow root",exact:true}).click();await expect(shadow).toBeHidden();
});
test("Activity retention and presentation suppression preserve disclosure",async({page})=>{
  await page.getByRole("button",{name:"Open activity retention",exact:true}).click();
  await page.getByLabel("Workspace name activity retention",{exact:true}).fill("Activity draft");
  await page.getByRole("button",{name:"Close activity retention",exact:true}).click();
  await page.getByRole("button",{name:"Open activity retention",exact:true}).click();
  await expect(page.getByLabel("Workspace name activity retention",{exact:true})).toHaveValue("Activity draft");
  await page.getByRole("button",{name:"Close activity retention",exact:true}).click();
  await page.getByRole("button",{name:"Open presentation override",exact:true}).click();
  await page.getByRole("button",{name:"Suppress presentation",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Inspector presentation override",exact:true})).toBeHidden();
  await expect(page.getByRole("button",{name:"Open presentation override",exact:true})).toHaveAttribute("aria-expanded","true");
  await page.getByRole("button",{name:"Restore presentation",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Inspector presentation override",exact:true})).toBeVisible();
});
for(const axis of ["n","s","e","w","ne","nw","se","sw"]){
  test(`resize ${axis} preserves the opposite edge`,async({page})=>{
    await page.getByRole("button",{name:"Open basic",exact:true}).click();
    const panel=page.getByRole("dialog",{name:"Inspector basic",exact:true});
    const before=(await panel.boundingBox())!;
    const handle=panel.locator(`[data-axis="${axis}"]`),box=(await handle.boundingBox())!;
    const dx=axis.includes("e")?20:axis.includes("w")?-20:0,dy=axis.includes("s")?20:axis.includes("n")?-20:0;
    await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
    await page.mouse.move(box.x+box.width/2+dx,box.y+box.height/2+dy);await page.mouse.up();
    const after=(await panel.boundingBox())!;
    expect(after.width).toBeCloseTo(before.width+(dx?20:0),0);expect(after.height).toBeCloseTo(before.height+(dy?20:0),0);
    expect(after.x).toBeCloseTo(before.x+(axis.includes("w")?-20:0),0);expect(after.y).toBeCloseTo(before.y+(axis.includes("n")?-20:0),0);
  });
}
test("small boundaries override impossible minimum dimensions without clipping",async({page})=>{
  await page.getByRole("button",{name:"Open small boundary",exact:true}).click();
  const panel=page.getByRole("dialog",{name:"Inspector small boundary",exact:true});await expect(panel).toBeVisible();
  // Firefox can report subpixel serialization noise at the exact boundary.
  const rect=(await panel.boundingBox())!;expect(rect.width).toBeLessThanOrEqual(220.01);expect(rect.height).toBeLessThanOrEqual(360.01);
  await expect(panel.locator("..")).toHaveAttribute("data-constrained","");
});
test("a portalled panel remains interactive inside an owning modal",async({page})=>{
  await page.getByRole('button',{name:'Open inspector workspace dialog',exact:true}).click();
  const modal=page.getByRole('dialog',{name:'Inspector workspace dialog',exact:true});
  await modal.getByRole('button',{name:'Open modal inspector',exact:true}).click();
  const panel=page.getByRole('dialog',{name:'Inspector modal inspector',exact:true});await expect(panel).toBeVisible();
  await expect(panel).toBeFocused();
  await page.getByLabel('Workspace name modal inspector',{exact:true}).fill('Nested draft');
  await page.keyboard.press('Escape');await expect(panel).toBeHidden();await expect(modal).toBeVisible();
  await expect(modal.getByRole('button',{name:'Open modal inspector',exact:true})).toBeFocused();
});

test("delayed acceptance and removed opener use authored state and focus policy",async({page})=>{
  await page.getByRole('button',{name:'Open delayed position',exact:true}).click();
  const panel=page.getByRole('dialog',{name:'Inspector delayed position',exact:true});await expect(panel).toBeFocused();
  const before=(await panel.boundingBox())!;await page.keyboard.press('ArrowRight');
  await expect.poll(async()=>(await panel.boundingBox())!.x).toBe(before.x+1);
  await page.getByRole('button',{name:'Close delayed position',exact:true}).click();
  await page.getByRole('button',{name:'Open removed launcher',exact:true}).click();
  await page.getByRole('button',{name:'Remove inspector launcher',exact:true}).click();
  const removed=page.getByRole('dialog',{name:'Inspector removed launcher',exact:true});await removed.focus();
  await page.keyboard.press('Escape');await expect(removed).toBeHidden();
  await expect(page.getByRole('button',{name:'Restore inspector launcher',exact:true})).toBeFocused();
});

test("short viewport and forced colors keep RTL header controls reachable",async({page})=>{
  await page.setViewportSize({width:360,height:300});await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});
  await page.getByRole('button',{name:'Open rtl',exact:true}).click();
  const panel=page.getByRole('dialog',{name:'Inspector rtl',exact:true});await expect(panel).toBeVisible();
  const rect=(await panel.boundingBox())!;expect(rect.x).toBeGreaterThanOrEqual(0);expect(rect.x+rect.width).toBeLessThanOrEqual(361);
  const close=page.getByRole('button',{name:'Close rtl',exact:true});const bounds=(await close.boundingBox())!;
  expect(bounds.y).toBeGreaterThanOrEqual(0);expect(bounds.y+bounds.height).toBeLessThanOrEqual(301);
  await close.focus();await page.keyboard.press('Shift+Tab');await page.keyboard.press('Tab');
  await expect(close).toBeFocused();expect(await close.evaluate(node=>getComputedStyle(node).outlineStyle)).not.toBe('none');
  await close.click();await expect(panel).toBeHidden();
});

test("pointer modifiers preserve ratio or the center of the rectangle",async({page})=>{
  await page.getByRole('button',{name:'Open basic',exact:true}).click();
  const panel=page.getByRole('dialog',{name:'Inspector basic',exact:true});const original=(await panel.boundingBox())!;
  const handle=panel.locator('[data-axis="se"]');let box=(await handle.boundingBox())!;
  await page.keyboard.down('Shift');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
  await page.mouse.move(box.x+box.width/2+40,box.y+box.height/2+5);await page.mouse.up();await page.keyboard.up('Shift');
  const ratio=(await panel.boundingBox())!;expect(ratio.width/ratio.height).toBeCloseTo(original.width/original.height,2);
  box=(await handle.boundingBox())!;
  await page.keyboard.down('Alt');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();
  await page.mouse.move(box.x+box.width/2+10,box.y+box.height/2+10);await page.mouse.up();await page.keyboard.up('Alt');
  const centered=(await panel.boundingBox())!;
  expect(centered.x+centered.width/2).toBeCloseTo(ratio.x+ratio.width/2,0);
  expect(centered.y+centered.height/2).toBeCloseTo(ratio.y+ratio.height/2,0);
});
