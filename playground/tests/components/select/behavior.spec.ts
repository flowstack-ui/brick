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
  const optionsSurface = page.getByTestId("select-options");
  const longTrigger = optionsSurface.getByRole("combobox", { name: "Plan" });
  await expect(longTrigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("option", { name: "Region 14" })).toHaveCount(0);
  await longTrigger.click();
  await expect(page.getByRole("option", { name: "Region 14" })).toBeAttached();
  await page.keyboard.press("Escape");

  const trigger = page.getByTestId("select-overview").getByRole("combobox");
  await trigger.focus(); await trigger.press("ArrowDown");
  const listbox = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
  await expect(listbox).toBeVisible();
  await trigger.press("End"); await trigger.press("Enter");
  await expect(trigger).not.toContainText("Enterprise");
  await longTrigger.click();
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

test("playground cards form separate equal-height rows and appearance evidence uses scoped surfaces", async ({ page }) => {
  const cardsShareRows = (await page.viewportSize())!.width > 760;
  const sizeGrid = page.getByTestId("select-sizes");
  const tileHeights = await sizeGrid.locator(".select-tile").evaluateAll((nodes) =>
    nodes.map((node) => node.getBoundingClientRect().height),
  );
  if (cardsShareRows) {
    expect(tileHeights[0]).toBeCloseTo(tileHeights[1], 1);
    expect(tileHeights[1]).toBeCloseTo(tileHeights[2], 1);
  } else {
    await expect(sizeGrid).toHaveCSS("grid-template-columns", /^\d+(?:\.\d+)?px$/);
  }

  const formGrid = page.getByTestId("select-forms");
  await expect(formGrid).toHaveAttribute("data-columns", "2");
  const formTileHeights = await formGrid.locator(".select-tile").evaluateAll((nodes) =>
    nodes.map((node) => node.getBoundingClientRect().height),
  );
  if (cardsShareRows) expect(formTileHeights[0]).toBeCloseTo(formTileHeights[1], 1);
  const buttons = formGrid.getByRole("button").filter({ hasText: /Submit|Reset/ });
  const boxes = await buttons.evaluateAll((nodes) =>
    nodes.map((node) => node.getBoundingClientRect()),
  );
  expect(boxes[0].y).toBe(boxes[1].y);
  expect(boxes[1].x).toBeGreaterThan(boxes[0].x + boxes[0].width);

  const stressTileHeights = await page.getByTestId("select-stress").locator(".select-tile").evaluateAll((nodes) =>
    nodes.map((node) => node.getBoundingClientRect().height),
  );
  if (cardsShareRows) expect(stressTileHeights[0]).toBeCloseTo(stressTileHeights[1], 1);

  const appearance = page.getByTestId("select-appearance");
  await expect(appearance.locator("[data-brick-appearance='light']")).toHaveCount(1);
  await expect(appearance.locator("[data-brick-appearance='dark']")).toHaveCount(1);
  await expect(appearance.getByText("Light", { exact: true })).toBeVisible();
  await expect(appearance.getByText("Dark", { exact: true })).toBeVisible();
  await expect(appearance.getByText("Customized", { exact: true })).toBeVisible();
  await expect(appearance.getByText("Select CSS properties")).toBeVisible();
  const code = appearance.locator(".playground-code-block-content");
  await expect(code).toHaveCSS("overflow-y", "auto");
  expect(await code.evaluate((element) => element.clientHeight)).toBeLessThanOrEqual(288);
});

test("RTL evidence uses localized content and logical popup direction", async ({ page }) => {
  const stress = page.getByTestId("select-stress");
  const trigger = stress.getByRole("combobox", { name: "خطة الاشتراك" });
  await expect(trigger).toContainText("خطة الفريق");
  await expect(trigger).toHaveCSS("direction", "rtl");
  await trigger.click();
  const listbox = page.getByRole("listbox");
  await expect(listbox).toHaveCSS("direction", "rtl");
  await expect(listbox.getByRole("option", { name: "الخطة الأساسية" })).toBeVisible();
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
