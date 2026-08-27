import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/segment-group"); });

test("selection, keyboard, sizes, and indicator remain coordinated", async ({ page }) => {
  const group = page.getByRole("radiogroup", { exact: true, name: "Project view" });
  const list = group.getByRole("radio", { name: "List" });
  const grid = group.getByRole("radio", { name: "Grid" });
  await expect(list).toBeChecked();
  const indicator = group.locator("[data-slot='segment-group-indicator']");
  await expect(indicator).toHaveAttribute("data-ready", "");
  const [groupBox, listBox] = await Promise.all([
    group.boundingBox(),
    list.boundingBox(),
  ]);
  expect(listBox!.height / groupBox!.height).toBeGreaterThanOrEqual(0.9);
  await expect.poll(async () => {
    const indicatorBox = await indicator.boundingBox();
    return {
      height: Math.round(indicatorBox!.height),
      width: Math.round(indicatorBox!.width),
      x: Math.round(indicatorBox!.x),
      y: Math.round(indicatorBox!.y),
    };
  }).toEqual({
    height: Math.round(listBox!.height),
    width: Math.round(listBox!.width),
    x: Math.round(listBox!.x),
    y: Math.round(listBox!.y),
  });
  await list.focus();
  await page.keyboard.press("ArrowRight");
  await expect(grid).toBeFocused();
  await expect(grid).toBeChecked();
  const gridBox = await grid.boundingBox();
  await expect.poll(async () => {
    const indicatorBox = await indicator.boundingBox();
    return {
      height: Math.round(indicatorBox!.height),
      width: Math.round(indicatorBox!.width),
      x: Math.round(indicatorBox!.x),
      y: Math.round(indicatorBox!.y),
    };
  }).toEqual({
    height: Math.round(gridBox!.height),
    width: Math.round(gridBox!.width),
    x: Math.round(gridBox!.x),
    y: Math.round(gridBox!.y),
  });
  for (const size of ["sm", "md", "lg"]) {
    await expect(page.getByRole("radiogroup", { name: `${size} project view` })).toHaveAttribute("data-size", size);
  }
});

test("icon-only items and their artwork stay centered", async ({ page }) => {
  const item = page.getByRole("radiogroup", { name: "Icon project view" }).getByRole("radio", { name: "List view" });
  const [itemBox, iconBox] = await Promise.all([item.boundingBox(), item.locator("svg").boundingBox()]);
  expect(itemBox).not.toBeNull();
  expect(iconBox).not.toBeNull();
  expect(iconBox!.x + iconBox!.width / 2).toBeCloseTo(itemBox!.x + itemBox!.width / 2, 0);
  expect(iconBox!.y + iconBox!.height / 2).toBeCloseTo(itemBox!.y + itemBox!.height / 2, 0);
});

test("Segment Group page has no automatically detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
