import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/segment-group");
});

test("selection, keyboard, sizes, and indicator remain coordinated", async ({
  page,
}) => {
  const group = page.getByRole("radiogroup", {
    exact: true,
    name: "Project view",
  });
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
  await expect
    .poll(async () => {
      const indicatorBox = await indicator.boundingBox();
      return {
        height: Math.round(indicatorBox!.height),
        width: Math.round(indicatorBox!.width),
        x: Math.round(indicatorBox!.x),
        y: Math.round(indicatorBox!.y),
      };
    })
    .toEqual({
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
  await expect
    .poll(async () => {
      const indicatorBox = await indicator.boundingBox();
      return {
        height: Math.round(indicatorBox!.height),
        width: Math.round(indicatorBox!.width),
        x: Math.round(indicatorBox!.x),
        y: Math.round(indicatorBox!.y),
      };
    })
    .toEqual({
      height: Math.round(gridBox!.height),
      width: Math.round(gridBox!.width),
      x: Math.round(gridBox!.x),
      y: Math.round(gridBox!.y),
    });
  await page.keyboard.press("End");
  await expect(group.getByRole("radio", { name: "Board" })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(list).toBeFocused();
  for (const size of ["sm", "md", "lg"]) {
    await expect(
      page.getByRole("radiogroup", { name: `${size} project view` }),
    ).toHaveAttribute("data-size", size);
  }
});

test("disabled and read-only recipes cannot change selection", async ({
  page,
}) => {
  const disabledRoot = page.getByRole("radiogroup", {
    name: "Disabled project view",
  });
  await expect(disabledRoot.getByRole("radio", { name: "List" })).toBeChecked();
  await disabledRoot
    .getByRole("radio", { name: "Grid" })
    .click({ force: true });
  await expect(disabledRoot.getByRole("radio", { name: "List" })).toBeChecked();

  const partial = page.getByRole("radiogroup", {
    name: "Partially available project view",
  });
  await expect(
    partial.getByRole("radio", { name: "Grid unavailable" }),
  ).toBeDisabled();

  const readOnly = page.getByRole("radiogroup", {
    name: "Read-only project view",
  });
  await readOnly.getByRole("radio", { name: "Grid" }).click({ force: true });
  await expect(readOnly.getByRole("radio", { name: "List" })).toBeChecked();
});

test("full-width, RTL, reduced motion, and forced colors preserve the contract", async ({
  page,
}) => {
  const fullWidth = page.getByRole("radiogroup", {
    name: "Full-width project view",
  });
  const parentBox = await fullWidth.locator("xpath=..").boundingBox();
  const groupBox = await fullWidth.boundingBox();
  expect(groupBox!.width).toBeCloseTo(parentBox!.width, 0);

  const rtl = page.getByRole("radiogroup", { name: "عرض المشروع" });
  await expect(rtl).toHaveCSS("direction", "rtl");
  const list = rtl.getByRole("radio", { name: "List" });
  await list.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(rtl.getByRole("radio", { name: "Grid" })).toBeFocused();

  await page.setViewportSize({ width: 390, height: 844 });
  const longItems = page
    .getByRole("radiogroup", { name: "Detailed project view" })
    .getByRole("radio");
  const itemBoxes = await longItems.evaluateAll((items) =>
    items.map((item) => {
      const box = item.getBoundingClientRect();
      const text = item.querySelector("[data-slot='segment-group-item-text']");
      const textBox = text?.getBoundingClientRect();
      return {
        left: box.left,
        right: box.right,
        textContained:
          Boolean(textBox) &&
          textBox!.left >= box.left - 0.5 &&
          textBox!.right <= box.right + 0.5,
      };
    }),
  );
  expect(itemBoxes[0]!.right).toBeLessThanOrEqual(itemBoxes[1]!.left + 0.5);
  expect(itemBoxes.every(({ textContained }) => textContained)).toBe(true);

  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.reload();
  const indicator = page
    .getByRole("radiogroup", { exact: true, name: "Project view" })
    .locator("[data-slot='segment-group-indicator']");
  await expect(indicator).toHaveCSS("transition-duration", "0s");
  expect(
    await indicator.evaluate(
      (element) => getComputedStyle(element).borderTopColor,
    ),
  ).not.toBe("rgba(0, 0, 0, 0)");
});

test("icon-only items and their artwork stay centered", async ({ page }) => {
  const item = page
    .getByRole("radiogroup", { name: "Icon project view" })
    .getByRole("radio", { name: "List view" });
  const [itemBox, iconBox] = await Promise.all([
    item.boundingBox(),
    item.locator("svg").boundingBox(),
  ]);
  expect(itemBox).not.toBeNull();
  expect(iconBox).not.toBeNull();
  expect(iconBox!.x + iconBox!.width / 2).toBeCloseTo(
    itemBox!.x + itemBox!.width / 2,
    0,
  );
  expect(iconBox!.y + iconBox!.height / 2).toBeCloseTo(
    itemBox!.y + itemBox!.height / 2,
    0,
  );
});

test("Segment Group page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
