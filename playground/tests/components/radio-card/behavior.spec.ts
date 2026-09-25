import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => { await page.goto("/radio-card?qualification=1"); });
test("native cards name, describe, select and navigate once", async ({page}) => {
  const basic=page.locator('[data-scenario="radio-card.basic"]');
  await expect(basic.getByRole("radiogroup", {name:"Choose a plan"})).toBeVisible();
  const starter=basic.getByRole("radio",{name:"Starter",exact:true});
  await basic.getByText("Starter",{exact:true}).click(); await expect(starter).toBeChecked();
  await starter.focus(); await page.keyboard.press("ArrowRight");
  await expect(basic.getByRole("radio",{name:"Team",exact:true})).toBeFocused();
  await expect(basic.getByRole("radio",{name:"Team",exact:true})).toBeChecked();
  await expect(basic.locator('input[type="radio"]')).toHaveCount(2);
  await expect(basic.getByRole("button")).toHaveCount(0);
});
test("variant borders and shadows remain independent", async ({page}) => {
  const variants=page.locator('[data-scenario="radio-card.variants"]');
  const outline=variants.locator('[data-variant="outline"] .brick-radio-card__item[data-state="checked"]');
  await expect(outline).not.toHaveCSS("box-shadow","none");
  for(const variant of ["surface","subtle","solid"]) await expect(variants.locator(`[data-variant="${variant}"] .brick-radio-card__item[data-state="checked"]`)).toHaveCSS("box-shadow","none");
  await expect(variants.locator('[data-variant="subtle"] .brick-radio-card__item[data-state="checked"]')).toHaveCSS("border-top-color","rgba(0, 0, 0, 0)");
});
test("sizes and selection have stable geometry", async ({page}) => {
  const roots=page.locator('[data-scenario="radio-card.sizes"] .brick-radio-card');
  for(let i=0;i<3;i++) {
    const control=roots.nth(i).locator('.brick-radio-card__control').first();
    await expect(control).toHaveCSS("padding-left",i===0?"12px":"16px");
    await expect(control.locator('.brick-radio-card__indicator')).toHaveCSS("width",["16px","20px","24px"][i]);
    const before=await control.boundingBox();
    await roots.nth(i).getByText("Alternative",{exact:true}).click();
    expect((await control.boundingBox())?.height).toBe(before?.height);
  }
});
test("disabled and read-only preserve distinct availability", async ({page}) => {
  const states=page.locator('[data-scenario="radio-card.states"]');
  await expect(states.getByRole("radiogroup",{name:"disabled"}).getByRole("radio").first()).toBeDisabled();
  const locked=states.getByRole("radiogroup",{name:"readOnly"});
  await locked.getByText("Alternative",{exact:true}).click();
  await expect(locked.getByRole("radio",{name:"Selected",exact:true})).toBeChecked();
  await locked.getByRole("radio",{name:"Selected",exact:true}).focus(); await page.keyboard.press("ArrowDown");
  await expect(locked.getByRole("radio",{name:"Alternative",exact:true})).toBeFocused();
  await expect(locked.getByRole("radio",{name:"Selected",exact:true})).toBeChecked();
});
test("native form validates, submits and resets", async ({page}) => {
  const form=page.getByRole("form",{name:"Plan form"});
  await form.getByRole("button",{name:"Save",exact:true}).click();
  await expect(form.getByRole("radio",{name:"Starter",exact:true})).toBeFocused();
  await form.getByText("Team",{exact:true}).click(); await form.getByRole("button",{name:"Save",exact:true}).click();
  await expect(form.getByText("team",{exact:true})).toBeVisible();
  await form.getByRole("button",{name:"Reset",exact:true}).click();
  await expect(form.getByRole("radio",{name:"Team",exact:true})).not.toBeChecked();
});
test("responsive presentation does not change keyboard orientation", async ({page}) => {
  const root=page.locator('[data-scenario="radio-card.responsive"] .brick-radio-card');
  await page.setViewportSize({width:500,height:900});
  await expect(root.locator('.brick-radio-card__control').first()).toHaveCSS("flex-direction","column");
  await expect(root.locator('.brick-radio-card__item[data-state="checked"]')).toHaveCSS("box-shadow","none");
  await page.setViewportSize({width:1100,height:900});
  await expect(root.locator('.brick-radio-card__control').first()).toHaveCSS("flex-direction","row");
  await expect(root.locator('.brick-radio-card__item[data-state="checked"]')).not.toHaveCSS("box-shadow","none");
  await expect(root).toHaveAttribute("aria-orientation","vertical");
});
test("controller and checked artwork reflect selection", async ({page}) => {
  const controller=page.locator('[data-scenario="radio-card.controller"]');
  await controller.getByText("Team",{exact:true}).click(); await expect(controller.getByText("Selected: team",{exact:true})).toBeVisible();
  const custom=page.locator('[data-scenario="radio-card.custom-indicator"]');
  await expect(custom.locator('svg')).toHaveCount(1);
  await custom.getByText("Starter",{exact:true}).click(); await expect(custom.locator('svg')).toHaveCount(0);
});
test("attached cards meet without input siblings affecting layout", async ({page}) => {
  const cards=page.locator('[data-scenario="radio-card.attached"] .brick-radio-card__item');
  const first=await cards.nth(0).boundingBox(), second=await cards.nth(1).boundingBox();
  expect(Math.abs(second!.x-(first!.x+first!.width))).toBeLessThanOrEqual(2);
});
test("page passes automated accessibility checks", async ({page}) => {
  const results=await new AxeBuilder({page}).include('[data-scenario^="radio-card."]').analyze();
  expect(results.violations).toEqual([]);
});
