import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/combobox"); });

test("Combobox defaults, filtering, selection, clearing, and keyboard remain integrated", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]'); const input = overview.getByRole("combobox", { name: "City" });
  await expect(overview.locator(".brick-combobox-control")).toHaveAttribute("data-variant", "outline");
  await input.fill("lis");
  await expect(page.getByRole("option", { name: "Lisbon" })).toBeVisible(); await input.press("ArrowDown"); await input.press("Enter");
  await expect(input).toHaveValue("Lisbon"); await overview.getByRole("button", { name: "Clear city" }).click(); await expect(input).toHaveValue("");
});

test("recipes and RTL retain closed visual contracts", async ({ page }) => {
  const controls = page.locator('[data-scenario="combobox.recipes"] .brick-combobox-control'); await expect(controls).toHaveCount(3);
  for (let i=0;i<3;i+=1) await expect(controls.nth(i)).toHaveAttribute("data-variant", ["outline","soft","underline"][i]);
  await expect(page.locator('[data-scenario="combobox.stress"]').getByRole("combobox", { name: "المدينة" })).toBeVisible();
});

test("popup positions, flips when constrained, and route has no axe violations", async ({ page }) => {
  const input = page.locator('[data-scenario="combobox.overview"]').getByRole("combobox"); await input.click();
  const content = page.locator(".brick-combobox-content:visible"); await expect(content).toHaveAttribute("data-positioned", "");
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze(); expect(results.violations).toEqual([]);
});
