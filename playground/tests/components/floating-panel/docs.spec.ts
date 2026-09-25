import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({page}) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/floating-panel");
});
test("focused docs, copyable sources and named multipart props", async ({page}) => {
  for (const title of ["Usage","Examples","Store","Stages","Multiple panels","Overlay manager","Resize axes","Boundary","Keyboard and numeric controls","Props"]) {
    await expect(page.getByRole("heading",{name:title,exact:true})).toHaveCount(1);
  }
  await expect(page.getByRole("table",{name:"FloatingPanel.ResizeTriggers props",exact:true})).toBeVisible();
  await page.getByRole("tab",{name:"Code",exact:true}).first().click();
  await expect(page.getByText('export function FloatingPanelBasic()', {exact:false}).first()).toBeVisible();
});
test("compact aligned header, stage visibility and keyboard focus", async ({page}) => {
  await page.getByRole("button",{name:"Floating panel",exact:true}).click();
  const panel=page.getByRole("dialog",{name:"Floating panel",exact:true});
  await expect(panel).toBeFocused();
  const geometry=await panel.evaluate(el=>{
    const drag=el.querySelector('.brick-floating-panel-drag-trigger')!;
    const title=el.querySelector('.brick-floating-panel-title')!;
    const icon=drag.querySelector('svg')!;
    const action=el.querySelector('.brick-floating-panel-control button')!;
    const a=icon.getBoundingClientRect(), b=title.getBoundingClientRect();
    return {display:getComputedStyle(drag).display,gap:getComputedStyle(drag).gap,alignment:Math.abs(a.y+a.height/2-b.y-b.height/2),height:action.getBoundingClientRect().height};
  });
  expect(geometry).toMatchObject({display:"flex",gap:"8px",height:24});
  expect(geometry.alignment).toBeLessThanOrEqual(1);
  for(const handle of await panel.locator('[data-axis]').all()) await expect(handle).toHaveAttribute('tabindex','-1');
  const before=await panel.boundingBox();
  await page.keyboard.press("ArrowRight");
  await expect.poll(async()=>(await panel.boundingBox())!.x).toBe(before!.x+1);
  await page.keyboard.press("Control+ArrowRight");
  await expect.poll(async()=>(await panel.boundingBox())!.width).toBe(before!.width+1);
  await panel.getByRole("button",{name:"Minimize panel",exact:true}).click();
  await expect(panel.getByRole("button",{name:"Maximize panel",exact:true})).toHaveCount(0);
  await panel.getByRole("button",{name:"Restore panel",exact:true}).click();
  await panel.getByRole("button",{name:"Maximize panel",exact:true}).click();
  await expect(panel.getByRole("button",{name:"Minimize panel",exact:true})).toHaveCount(0);
  await panel.getByRole("button",{name:"Restore panel",exact:true}).click();
  await panel.getByRole("button",{name:"Close panel",exact:true}).click();
  await expect(page.getByRole("button",{name:"Floating panel",exact:true})).toBeFocused();
});
test("managed, bounded and retained examples are real compositions", async ({page}) => {
  await page.getByRole("button",{name:"Open managed panel",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Managed inspector",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Close panel",exact:true}).click();
  await page.getByRole("button",{name:"Bounded panel",exact:true}).click();
  const bounded=page.getByRole("dialog",{name:"Bounded panel",exact:true});
  await expect(bounded).toBeVisible();
  expect(await bounded.locator('..').evaluate(el=>getComputedStyle(el).position)).toBe('absolute');
  await bounded.getByRole("button",{name:"Close panel",exact:true}).click();
  await page.getByRole("button",{name:"Retained state",exact:true}).click();
  await page.getByRole("textbox",{name:"Panel draft"}).fill("Keep this change");
  await page.getByRole("button",{name:"Close panel",exact:true}).click();
  await page.getByRole("button",{name:"Retained state",exact:true}).click();
  await expect(page.getByRole("textbox",{name:"Panel draft"})).toHaveValue("Keep this change");
});
test("numeric controls provide a non-drag geometry alternative", async ({page}) => {
  await page.getByRole("button",{name:"Keyboard and numeric controls",exact:true}).click();
  const panel=page.getByRole("dialog",{name:"Keyboard and numeric controls",exact:true});
  const before=await panel.boundingBox();
  await panel.getByRole("button",{name:"Increase width",exact:true}).click();
  await expect.poll(async()=>(await panel.boundingBox())!.width).toBe(before!.width+1);
  await panel.getByRole("button",{name:"Increase x",exact:true}).click();
  await expect.poll(async()=>(await panel.boundingBox())!.x).toBe(before!.x+1);
});
