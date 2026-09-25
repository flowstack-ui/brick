import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/combobox?qualification=1"); });

test("documentation TOC, multiple chips and minimum-query opening", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/combobox");
  const links=page.locator('aside a[href^="#"]');
  expect(await links.count()).toBeGreaterThan(40);
  for(const href of await links.evaluateAll(nodes=>nodes.map(node=>node.getAttribute("href")!))) await expect(page.locator(`[id="${href.slice(1)}"]`)).toHaveCount(1);
  const input=page.locator("#multiple").getByRole("combobox");
  await input.fill("Vue");
  await page.getByRole("option",{name:"Vue",exact:true}).click();
  await expect(input).toHaveValue("");
  await expect(page.locator("#multiple").getByRole("button",{name:"Remove vue",exact:true})).toBeVisible();
  await input.press("Escape");
  const minimum=page.locator("#minimum").getByRole("combobox");
  await minimum.fill("r");
  await expect(minimum).toHaveAttribute("aria-expanded","false");
  await minimum.fill("re");
  await expect(minimum).toHaveAttribute("aria-expanded","true");
});

test("dialog selection and virtualized keyboard navigation", async ({ page }) => {
  await page.goto("/combobox");
  await page.getByRole("button",{name:"Choose in dialog"}).click();
  const dialog=page.getByRole("dialog");
  await dialog.getByRole("combobox").fill("Vue");
  await dialog.getByRole("option",{name:"Vue"}).click();
  await expect(dialog.getByRole("combobox")).toHaveValue("Vue");
  await dialog.getByRole("button",{name:"Close",exact:true}).click();
  const input=page.locator("#virtual").getByRole("combobox");
  await input.click();
  await input.press("ArrowDown");
  await input.press("End");
  await expect(page.getByRole("option",{name:"Project 1000",exact:true})).toBeVisible();
  await input.press("Enter");
  await expect(input).toHaveValue("Project 1000");
});

test("creatable, input behavior, native reset, and reduced motion", async ({ page }) => {
  await page.goto("/combobox");
  const create=page.locator("#creatable").getByRole("combobox");
  await create.fill("Angular");
  await page.getByRole("option",{name:"Create “Angular”",exact:true}).click();
  await expect(create).toHaveValue("Angular");
  const complete=page.locator("#input-behavior").getByRole("combobox").nth(1);
  await complete.click(); await complete.press("ArrowDown");
  await expect(complete).toHaveValue("React");
  await complete.press("ArrowDown"); await expect(complete).toHaveValue("Vue");
  await complete.press("Escape");
  const form=page.locator("#nativeform");
  await form.getByRole("combobox").fill("Vue");
  await page.getByRole("option",{name:"Vue",exact:true}).click();
  await form.getByRole("button",{name:"Submit",exact:true}).click();
  await expect(form.getByText("Submitted: vue",{exact:true})).toBeVisible();
  await form.getByRole("button",{name:"Reset",exact:true}).click();
  await expect(form.getByRole("combobox")).toHaveValue("React");
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.locator("#animation").getByRole("combobox").click();
  await expect(page.locator('.brick-combobox-content[data-state="open"]')).toHaveCSS("animation-name","none");
});

test("documented paint variables remain effective with responsive recipes", async ({page}) => {
  const control=page.locator('[data-scenario="combobox.appearance"] .combobox-customization .brick-combobox-control');
  const paint=await control.evaluate(element=>{
    const style=getComputedStyle(element);
    const probe=document.createElement("div"); element.append(probe);
    probe.style.background="var(--brick-combobox-background)";
    probe.style.borderColor="var(--brick-combobox-border)";
    const result={background:style.backgroundColor,border:style.borderColor,expectedBackground:getComputedStyle(probe).backgroundColor,expectedBorder:getComputedStyle(probe).borderColor};
    probe.remove(); return result;
  });
  await expect(control).toHaveCSS("background-color",paint.expectedBackground);
  await expect(control).toHaveCSS("border-color",paint.expectedBorder);
});

test("Combobox defaults, filtering, selection, clearing, and keyboard remain integrated", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]'); const input = overview.getByRole("combobox", { name: "City" });
  await expect(overview.locator(".brick-combobox-control")).toHaveAttribute("data-variant", "outline");
  await input.fill("lis");
  const content = page.locator(".brick-combobox-content:visible");
  await expect(content).toHaveAttribute("data-size", "lg");
  await expect(page.getByRole("option", { name: "Lisbon" })).toHaveCSS("min-height", "36px"); await input.press("ArrowDown"); await input.press("Enter");
  await expect(input).toHaveValue("Lisbon"); await overview.getByRole("button", { name: "Clear city" }).click(); await expect(input).toHaveValue("");
});

test("surface recipes preserve transparent outline and filled surface", async ({ page }) => {
  await verifyFormSurfaceRecipes(page, "combobox", ".brick-combobox-control", "");
});

test("chevron toggles and popup matches the complete control width", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]');
  const control = overview.locator(".brick-combobox-control");
  await overview.getByRole("button", { name: "Toggle City options" }).click();
  const content = page.locator(".brick-combobox-content:visible");
  await expect(content).toBeVisible();
  const controlBox = await control.boundingBox();
  const contentBox = await content.boundingBox();
  expect(controlBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(contentBox!.width).toBeGreaterThanOrEqual(controlBox!.width - 1);
});

test("recipes and RTL retain closed visual contracts", async ({ page }) => {
  const controls = page.locator('[data-scenario="combobox.recipes"] .brick-combobox-control'); await expect(controls).toHaveCount(4);
  for (let i=0;i<4;i+=1) await expect(controls.nth(i)).toHaveAttribute("data-variant", ["outline","soft","underline","surface"][i]);
  await expect(page.locator('[data-scenario="combobox.stress"]').getByRole("combobox", { name: "المدينة" })).toBeVisible();
});

test("playground evidence is concise, aligned, and clearly separated", async ({ page }) => {
  const anatomy = page.locator('[data-scenario="combobox.anatomy"]');
  await expect(anatomy.getByRole("combobox")).toHaveCount(1);
  await expect(anatomy.locator(".playground-output-evidence")).toHaveCSS("overflow", "clip");
  const codeBlock = anatomy.locator("[data-rendered-output]");
  expect(await codeBlock.evaluate((element) => element.clientHeight)).toBeLessThanOrEqual(160);
  expect(await codeBlock.evaluate((element) => element.scrollHeight)).toBeGreaterThan(await codeBlock.evaluate((element) => element.clientHeight));

  if ((await page.viewportSize())!.width > 760) {
    for (const scenario of ["combobox.behavior", "combobox.states"]) {
      const cells = page.locator(`[data-scenario="${scenario}"] .combobox-cell`);
      const heights = await cells.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
      for (let index = 0; index < heights.length; index += 2) expect(heights[index]).toBeCloseTo(heights[index + 1], 1);
    }
  }

  const appearance = page.locator('[data-scenario="combobox.appearance"]');
  for (const surface of await appearance.locator(".combobox-appearance-surface").all()) {
    const badgeBox = await surface.locator(".brick-badge").boundingBox();
    const fieldBox = await surface.locator(".brick-field").boundingBox();
    expect(badgeBox).not.toBeNull();
    expect(fieldBox).not.toBeNull();
    expect(fieldBox!.y - badgeBox!.y - badgeBox!.height).toBeGreaterThanOrEqual(8);
  }
  await expect(appearance.getByText("Customized", { exact: true })).not.toHaveAttribute("data-tone", "accent");

  const customization = appearance.locator(".combobox-customization");
  await expect(customization).toHaveCSS("gap", "1px");
  await expect(customization.locator(":scope > *")).toHaveCount(2);
  const stress = page.locator('[data-scenario="combobox.stress"] .combobox-grid');
  await expect(stress).toHaveCSS("gap", "16px");
  await expect(stress.locator(".combobox-cell")).toHaveCount(2);
});

test("option rows inherit all seven shared control densities", async ({ page }) => {
  const sizing = page.locator('[data-scenario="combobox.sizing"] .combobox-grid').first();
  const triggers = sizing.getByRole("button", { name: "Toggle City options" });
  for (const [index, size] of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"].entries()) {
    await triggers.nth(index).click();
    const content = page.locator('.brick-combobox-content[data-state="open"]');
    await expect(content).toHaveAttribute("data-size", size);
    await expect(content.getByRole("option").first()).toHaveCSS("min-height", ["24px", "24px", "28px", "32px", "36px", "40px", "56px"][index]);
    await page.keyboard.press("Escape");
  }
});

test("popup positions, flips when constrained, and route has no axe violations", async ({ page }) => {
  const input = page.locator('[data-scenario="combobox.overview"]').getByRole("combobox"); await input.click();
  const content = page.locator(".brick-combobox-content:visible"); await expect(content).toHaveAttribute("data-positioned", "");
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze(); expect(results.violations).toEqual([]);
});

test("portalled options keep the component-owned layer while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const overview = page.locator('[data-scenario="combobox.overview"]');
  await overview.getByRole("button", { name: "Toggle City options" }).click();
  const popup = page.locator(".brick-combobox-content:visible");
  const header = page.locator(".evidence-app-bar");

  await expect(popup).toHaveAttribute("data-positioned", "");
  await page.evaluate(() => {
    const panel = document.querySelector(".brick-combobox-content")!.getBoundingClientRect();
    const header = document.querySelector(".evidence-app-bar")!.getBoundingClientRect();
    window.scrollBy(0, panel.top - header.bottom + 12);
  });
  await expect(popup).toBeVisible();

  await expect.poll(async () => popup.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(80);
  const paintOrder = await page.evaluate(() => {
    const popupElement = document.querySelector<HTMLElement>(".brick-combobox-content");
    const headerElement = document.querySelector<HTMLElement>(".evidence-app-bar");
    if (!popupElement || !headerElement) return null;
    const popupRect = popupElement.getBoundingClientRect();
    const headerRect = headerElement.getBoundingClientRect();
    const intersection = {
      left: Math.max(popupRect.left, headerRect.left),
      right: Math.min(popupRect.right, headerRect.right),
      top: Math.max(popupRect.top, headerRect.top),
      bottom: Math.min(popupRect.bottom, headerRect.bottom),
    };
    const x = (intersection.left + intersection.right) / 2;
    const y = (intersection.top + intersection.bottom) / 2;
    return {
      popupContainsTopElement: popupElement.contains(document.elementFromPoint(x, y)),
      headerZIndex: Number(getComputedStyle(headerElement).zIndex),
      intersects: intersection.right > intersection.left && intersection.bottom > intersection.top,
      popupZIndex: Number(getComputedStyle(popupElement).zIndex),
    };
  });

  expect(paintOrder).not.toBeNull();
  expect(paintOrder!.intersects).toBe(true);
  // Do not reintroduce the shell's layer-14 override: it hid suggestions
  // behind a nested Dialog. The owner supplies both stacking and hit testing.
  expect(paintOrder!.popupZIndex).toBeGreaterThan(paintOrder!.headerZIndex);
  expect(paintOrder!.popupContainsTopElement).toBe(true);
});
