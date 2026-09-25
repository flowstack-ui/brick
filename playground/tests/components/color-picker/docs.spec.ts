import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test("documentation exposes complete sizes, shortcuts, store and form", async ({page}) => {
  await page.goto("/color-picker?appearance=light");
  const sizes=page.locator("#sizes .brick-color-picker__input");
  await expect(sizes).toHaveCount(7);
  expect(await sizes.evaluateAll(items=>items.map(item=>item.getBoundingClientRect().height))).toEqual([24,32,36,40,44,48,64]);
  const basic=page.locator('[data-component-page="color-picker"] > div').first();
  await basic.locator(".brick-color-picker__trigger").click();
  await expect(basic.locator(".brick-color-picker__content")).toBeVisible();
  await expect(basic.locator(".brick-color-picker__area-thumb")).toHaveCount(1);
  await expect(basic.locator(".brick-color-picker__channel-slider-thumb")).toHaveCount(2);
  await page.keyboard.press("Escape");
  await page.locator("#store").getByRole("button",{name:"Use green"}).click();
  await expect(page.locator("#store .brick-color-picker__input")).toHaveValue("#22C55E");
  const form=page.locator("#form form");
  await form.getByRole("button",{name:"Save",exact:true}).click();
  await expect(form.getByRole("status")).toContainText("147");
  await expect(page.locator("#props-root-provider")).toBeVisible();
  expect((await new AxeBuilder({page}).include('[data-component-page="color-picker"]').analyze()).violations).toEqual([]);
});

test("responsive recipes shrink completely and nested popup returns focus", async ({page})=>{
  await page.goto("/color-picker");
  for(const [width,height] of [[390,36],[800,44],[1400,40]]){
    await page.setViewportSize({width,height:900});
    await expect(page.locator("#responsive .brick-color-picker__input")).toHaveCSS("height",`${height}px`);
  }
  await page.locator("#dialog").getByRole("button",{name:"Edit color"}).click();
  const dialog=page.getByRole("dialog",{name:"Theme color",exact:true});
  await expect(dialog).toBeVisible();
  const trigger=dialog.locator(".brick-color-picker__trigger");
  await trigger.click();
  await expect(dialog.locator(".brick-color-picker__content")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeVisible();
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("swatch documentation shows seven fixed squares and definite parent sizes",async({page})=>{
  await page.goto("/color-swatch?appearance=dark");
  const sizes=page.locator("#sizes .brick-color-swatch");
  await expect(sizes).toHaveCount(7);
  expect(await sizes.evaluateAll(items=>items.map(item=>[item.getBoundingClientRect().width,item.getBoundingClientRect().height]))).toEqual([14,16,18,20,24,28,32].map(size=>[size,size]));
  await expect(page.locator('[data-size="full"]')).toHaveCSS("width","64px");
  await expect(page.locator('.brick-color-swatch[data-size="inherit"]')).toHaveCSS("width","48px");
  expect((await new AxeBuilder({page}).include('[data-component-page="color-swatch"]').analyze()).violations).toEqual([]);
});
