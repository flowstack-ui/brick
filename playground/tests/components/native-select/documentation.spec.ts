import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({page}) => { await page.goto("/native-select"); });

test("documentation has focused examples, part headings and source tabs", async ({page}) => {
  for (const title of ["Usage","Examples","Props","Root","Field","Indicator"]) await expect(page.getByRole("heading",{name:title,exact:true})).toBeVisible();
  const basic = page.locator("[data-example-preview]").first();
  await basic.getByRole("tab",{name:"Code",exact:true}).click();
  await expect(basic).toContainText("NativeSelectBasic");
  await basic.getByRole("tab",{name:"Preview",exact:true}).click();
  await expect(basic.locator(".brick-native-select")).toBeVisible();
});

test("all variants retain equal control geometry and all sizes progress", async ({page}) => {
  const heights = await page.locator("#variants .brick-native-select").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(heights).toHaveLength(7);
  expect(Math.max(...heights)-Math.min(...heights)).toBeLessThanOrEqual(1);
  const sizes = await page.locator("#sizes .brick-native-select").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(sizes).toHaveLength(7);
  for(let i=1;i<sizes.length;i++)expect(sizes[i]).toBeGreaterThanOrEqual(sizes[i-1]);
  expect(sizes[6]).toBeGreaterThan(sizes[0]);
});

test("native selection submits and resets", async({page})=>{
 const form=page.locator("#form"); const field=form.getByRole("combobox");
 await field.selectOption("vue"); await form.getByRole("button",{name:"Submit",exact:true}).click();
 await expect(form).toContainText("vue"); await form.getByRole("button",{name:"Reset",exact:true}).click();
 await expect(field).toHaveValue("react");
});

test("light dark and narrow RTL are contained", async({page})=>{
 for(const appearance of ["light","dark"]){
  await page.goto("/native-select?appearance="+appearance+"&exampleDirection=rtl");
  await page.setViewportSize({width:390,height:844});
  const basic=page.locator("[data-example-canvas]").first();
  await expect(basic.locator(".brick-native-select")).toBeVisible();
  const overflow=await basic.evaluate(el=>el.scrollWidth>el.clientWidth+1);
  expect(overflow).toBe(false);
 }
});
