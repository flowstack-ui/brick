import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test("documentation navigation resolves to visible owner sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/input-addon");
  for (const id of ["usage", "examples", "suffix", "paired", "variants", "responsive", "props"]) {
    await expect(page.locator(`aside a[href="#${id}"]`)).toHaveCount(1);
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  }
  await page.locator('aside a[href="#props"]').click();
  await expect(page).toHaveURL(/#props$/);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const addon = page.locator('#responsive .brick-input-addon');
    const input = page.locator('#responsive .brick-input');
    await expect(async () => {
      expect(Math.abs((await addon.boundingBox())!.height - (await input.boundingBox())!.height)).toBeLessThanOrEqual(1);
    }).toPass();
  }
});

test("external segment shares height and painted joins with the input", async ({ page }) => {
  await page.goto("/input-addon?qualification=1");
  const addon = page.locator(".brick-input-addon");
  const input = page.getByRole("textbox", { name: "Website address" });
  const wrapper = input.locator("..");
  await expect(addon).toHaveText("https://");
  await expect(addon).not.toHaveAttribute("tabindex");
  for (const direction of ["ltr", "rtl"]) {
    await addon.locator("..").evaluate((node, dir) => node.setAttribute("dir", dir), direction);
    const a = (await addon.boundingBox())!;
    const b = (await wrapper.boundingBox())!;
    expect(Math.abs(a.height - b.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(a.y - b.y)).toBeLessThanOrEqual(1);
    await expect(addon).toHaveCSS("border-start-end-radius", "0px");
    await expect(wrapper).toHaveCSS("border-start-start-radius", "0px");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate(node => node.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
