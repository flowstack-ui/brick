import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("Divider docs reset complete responsive geometry and preserve semantics", async ({ page }) => {
  await page.goto("/divider");
  await expect(page.locator("[data-example-preview]")).toHaveCount(7);
  const divider = page.locator("#responsive [data-example-canvas] .brick-divider");
  await expect(divider).toHaveAttribute("role", "none");
  await expect(divider).not.toHaveAttribute("aria-orientation");
  // Exercise both inset branches without changing component code or breakpoints.
  for (const inset of ["none", "start", "both"]) {
    await divider.evaluate((el, value) => el.setAttribute("data-inset", value), inset);
    await page.setViewportSize({ width: 1100, height: 900 });
    await expect(divider).toHaveCSS("border-top-width", "0px");
    await expect(divider).toHaveCSS("border-left-width", "1px");
    await expect(divider).toHaveCSS("margin-left", "0px");
    await page.setViewportSize({ width: 375, height: 800 });
    await expect(divider).toHaveCSS("border-left-width", "0px");
    await expect(divider).toHaveCSS("border-top-width", "1px");
    await expect(divider).toHaveCSS("margin-top", "0px");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  expect((await new AxeBuilder({ page }).include('[data-component-page="divider"]').analyze()).violations).toEqual([]);
});
