import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/select"); });

test("Select overview preserves canonical defaults and selection", async ({ page }) => {
  const surface = page.getByTestId("select-overview");
  const trigger = surface.getByRole("combobox", { name: "Plan" });
  await expect(trigger).toHaveAttribute("data-variant", "outline");
  await expect(trigger).toHaveAttribute("data-size", "md");
  await expect(trigger).toHaveAttribute("data-shape", "rounded");
  await expect(trigger).toHaveAttribute("data-full-width", "");
  await expect(trigger).toContainText("Team");
  await trigger.click();
  await page.getByRole("option", { name: "Starter" }).click();
  await expect(trigger).toContainText("Starter");
  await expect(trigger).toBeFocused();
});

test("recipe comparisons change only their named dimension", async ({ page }) => {
  const variants = page.getByTestId("select-variants").getByRole("combobox");
  await expect(variants).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(variants.nth(index)).toHaveAttribute("data-variant", ["outline", "soft", "underline"][index]);
    await expect(variants.nth(index)).toHaveAttribute("data-size", "md");
  }
  await expect(variants.nth(2)).not.toHaveAttribute("data-shape");
  const sizes = page.getByTestId("select-sizes").getByRole("combobox");
  const heights = await sizes.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
  expect(heights[0]).toBeLessThan(heights[1]); expect(heights[1]).toBeLessThan(heights[2]);
  const shapes = page.getByTestId("select-shapes").getByRole("combobox");
  for (let index = 0; index < 3; index += 1) await expect(shapes.nth(index)).toHaveAttribute("data-shape", ["sharp", "rounded", "pill"][index]);
});

test("keyboard, disabled options, groups, viewport, and Arrow stay integrated", async ({ page }) => {
  const trigger = page.getByTestId("select-overview").getByRole("combobox");
  await trigger.focus(); await trigger.press("ArrowDown");
  const listbox = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await expect(listbox).toBeVisible();
  await trigger.press("End"); await trigger.press("Enter");
  await expect(trigger).not.toContainText("Enterprise");
  const longList = page.getByRole("listbox");
  await expect(longList.locator(".brick-select-viewport")).toBeVisible();
  const arrow = longList.locator(".brick-select-arrow");
  const side = await longList.getAttribute("data-side");
  const align = await longList.getAttribute("data-align");
  expect(side).not.toBeNull();
  expect(align).not.toBeNull();
  await expect(arrow).toHaveAttribute("data-side", side!);
  await expect(arrow).toHaveAttribute("data-align", align!);
});

test("native form submits and reset remains available", async ({ page }) => {
  const form = page.getByTestId("select-forms");
  await form.getByRole("button", { name: "Submit" }).click();
  await expect(form.getByTestId("select-form-status")).toHaveText("team");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.getByText("Form reset", { exact: true })).toBeVisible();
});

test("Select route has no automated accessibility violations", async ({ page }) => {
  await page.locator(".brick-select-trigger").first().click();
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(results.violations).toEqual([]);
});
