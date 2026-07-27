import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/multi-select"); });

test("Multi Select overview preserves defaults and toggles without closing", async ({ page }) => {
  const surface = page.getByTestId("multi-select-overview");
  const trigger = surface.getByRole("button", { name: "Team skills" });
  await expect(trigger).toHaveAttribute("data-variant", "outline");
  await expect(trigger).toHaveAttribute("data-size", "md");
  await expect(trigger).toHaveAttribute("data-shape", "rounded");
  await expect(trigger).toHaveAttribute("data-full-width", "");
  await expect(trigger).toContainText("Design (+1 more)");
  await trigger.click();
  const listbox = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await expect(listbox).toHaveAttribute("role", "listbox");
  await expect(listbox).toHaveAttribute("aria-multiselectable", "true");
  await page.getByRole("option", { name: "Writing" }).click();
  await expect(listbox).toBeVisible();
  await expect(trigger).toContainText("Design (+2 more)");
});

test("recipe comparisons change only their named dimension", async ({ page }) => {
  const variants = page.getByTestId("multi-select-variants").getByRole("button");
  await expect(variants).toHaveCount(3);
  for (let index = 0; index < 3; index += 1) {
    await expect(variants.nth(index)).toHaveAttribute("data-variant", ["outline", "soft", "underline"][index]);
    await expect(variants.nth(index)).toHaveAttribute("data-size", "md");
  }
  await expect(variants.nth(2)).not.toHaveAttribute("data-shape");
  const sizes = page.getByTestId("multi-select-sizes").getByRole("button");
  const heights = await sizes.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
  expect(heights[0]).toBeLessThan(heights[1]);
  expect(heights[1]).toBeLessThan(heights[2]);
  const shapes = page.getByTestId("multi-select-shapes").getByRole("button");
  for (let index = 0; index < 3; index += 1) {
    await expect(shapes.nth(index)).toHaveAttribute("data-shape", ["sharp", "rounded", "pill"][index]);
  }
});

test("keyboard keeps focus and selection distinct and skips disabled items", async ({ page }) => {
  const trigger = page.getByTestId("multi-select-overview").getByRole("button");
  await trigger.focus();
  await trigger.press("ArrowDown");
  const listbox = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await expect(listbox).toBeFocused();
  await listbox.press("End");
  await listbox.press("Enter");
  await expect(trigger).toContainText("Design (+2 more)");
  await expect(listbox).toBeVisible();
  await listbox.press("r");
  const activeId = await listbox.getAttribute("aria-activedescendant");
  expect(activeId).not.toBeNull();
  await expect(page.locator(`#${activeId}`)).not.toHaveAttribute("data-value", "research");
  await listbox.press("Escape");
  await expect(trigger).toBeFocused();
});

test("groups, viewport, indicator alignment, and Arrow stay integrated", async ({ page }) => {
  const options = page.getByTestId("multi-select-options");
  const listbox = options.getByRole("listbox");
  await expect(listbox.locator(".brick-multi-select-viewport")).toBeVisible();
  await expect(listbox.getByText("Disciplines", { exact: true })).toBeVisible();
  const arrow = listbox.locator(".brick-multi-select-arrow");
  const side = await listbox.getAttribute("data-side");
  const align = await listbox.getAttribute("data-align");
  expect(side).not.toBeNull();
  expect(align).not.toBeNull();
  await expect(arrow).toHaveAttribute("data-side", side!);
  await expect(arrow).toHaveAttribute("data-align", align!);
  const selected = listbox.getByRole("option", { name: "Design" });
  await expect(selected).toHaveAttribute("aria-selected", "true");
  const box = await selected.boundingBox();
  const indicator = await selected.locator(".brick-multi-select-item-indicator").boundingBox();
  expect(box && indicator && indicator.x + indicator.width <= box.x + box.width).toBeTruthy();
});

test("native form submits repeated values and reset remains available", async ({ page }) => {
  const form = page.getByTestId("multi-select-forms");
  await form.getByRole("button", { name: "Submit skills" }).click();
  await expect(form.getByTestId("multi-select-form-status")).toHaveText("design, engineering");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.getByText("Form reset", { exact: true })).toBeVisible();
});

test("RTL keeps the indicator inside the logical end and narrow controls contain content", async ({ page }) => {
  const stress = page.getByTestId("multi-select-stress");
  const rtlTrigger = stress.getByRole("button", { name: "مهارات الفريق" });
  await rtlTrigger.click();
  const rtlListbox = page.locator(`#${await rtlTrigger.getAttribute("aria-controls")}`);
  const option = rtlListbox.getByRole("option", { name: "Design" });
  const optionBox = await option.boundingBox();
  const indicatorBox = await option.locator(".brick-multi-select-item-indicator").boundingBox();
  expect(optionBox && indicatorBox && indicatorBox.x >= optionBox.x).toBeTruthy();
  const narrowTrigger = stress.getByRole("button", { name: /Localized team disciplines/ });
  const narrowBox = await narrowTrigger.boundingBox();
  expect(narrowBox?.width).toBeLessThanOrEqual(272);
});

test("Multi Select route has no automated accessibility violations", async ({ page }) => {
  await page.locator(".brick-multi-select-trigger").first().click();
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(results.violations).toEqual([]);
});
