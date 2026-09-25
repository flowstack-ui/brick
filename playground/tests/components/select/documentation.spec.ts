import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({page}) => { await page.goto("/select"); });

for (const width of [1280, 390]) {
 test(`dialog popup is unclipped and keeps modal ownership at ${width}px`, async ({page}) => {
  await page.setViewportSize({width, height:844});
  await page.locator("#dialog").getByRole("button",{name:"Open dialog"}).click();
  const dialog=page.getByRole("dialog");
  const trigger=dialog.locator(".brick-select-trigger");
  await trigger.click();
  const popup=page.getByRole("listbox");
  await expect(popup).toBeVisible();
  // Visibility alone misses content cut off by a clipping ancestor.
  expect(await popup.evaluate(el=>el.closest(".brick-dialog-content"))).toBeNull();
  for(const name of ["React","Vue"]) {
   const option=page.getByRole("option",{name,exact:true});
   await expect.poll(()=>option.evaluate(el=>{
    const r=el.getBoundingClientRect();
    return [r.top+3,r.bottom-3].every(y=>[r.left+5,r.right-5].every(x=>el.contains(document.elementFromPoint(x,y))));
   })).toBe(true);
  }
  await page.getByRole("option",{name:"React",exact:true}).click();
  await expect(dialog).toBeVisible();
  await expect(trigger).toContainText("React");
  if(await popup.isVisible()) await page.keyboard.press("Escape");
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(popup).toBeHidden();
  await expect(dialog).toBeVisible();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
 });
}

test("documentation has focused examples, part headings and source tabs", async ({page}) => {
  for (const title of ["Usage","Examples","Props","Root","Trigger","Value","Content","Item","ClearTrigger"]) await expect(page.getByRole("heading",{name:title,exact:true})).toBeVisible();
  const basic = page.locator("[data-example-preview]").first();
  await basic.getByRole("tab",{name:"Code",exact:true}).click();
  await expect(basic).toContainText("SelectBasic");
  await basic.getByRole("tab",{name:"Preview",exact:true}).click();
  await expect(basic.locator(".brick-select-trigger")).toBeVisible();
});

test("all variants retain equal control geometry and all sizes progress", async ({page}) => {
  const heights = await page.locator("#variants .brick-select-trigger").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(heights).toHaveLength(6);
  expect(Math.max(...heights)-Math.min(...heights)).toBeLessThanOrEqual(1);
  const sizes = await page.locator("#sizes .brick-select-trigger").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(sizes).toHaveLength(7);
  for(let i=1;i<sizes.length;i++)expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i-1]);
  expect(sizes[6]).toBeGreaterThan(sizes[0]);
});

test("clear remains a sibling and nested selection stays above dialog", async({page})=>{
 const clear=page.locator("#clear").getByRole("button",{name:"Clear framework"});
 expect(await clear.evaluate(el=>el.parentElement?.closest("button"))).toBeNull();
 await clear.click();
 await page.locator("#dialog").getByRole("button",{name:"Open dialog"}).click();
 const dialog=page.getByRole("dialog");
 await dialog.locator(".brick-select-trigger").click();
 const option=page.getByRole("option",{name:"Vue",exact:true});
 await expect(option).toBeVisible(); await option.click();
 await expect(dialog.locator(".brick-select-trigger")).toContainText("Vue");
 await expect(dialog).toBeVisible();
});

test("light dark and narrow RTL are contained", async({page})=>{
 for(const appearance of ["light","dark"]){
  await page.goto("/select?appearance="+appearance+"&exampleDirection=rtl");
  await page.setViewportSize({width:390,height:844});
  const basic=page.locator("[data-example-canvas]").first();
  await expect(basic.locator(".brick-select-trigger")).toBeVisible();
  const overflow=await basic.evaluate(el=>el.scrollWidth>el.clientWidth+1);
  expect(overflow).toBe(false);
 }
});
