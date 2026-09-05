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
  const paint = await group.evaluate((element) => {
    const probe = document.createElement("span");
    probe.style.background = "var(--brick-color-surface-subtle)";
    element.append(probe);
    const expectedRoot = getComputedStyle(probe).backgroundColor;
    probe.style.background =
      "light-dark(var(--brick-color-surface-base), var(--brick-color-surface-raised))";
    const expectedIndicator = getComputedStyle(probe).backgroundColor;
    probe.remove();
    const selectedIndicator = element.querySelector<HTMLElement>(
      "[data-slot='segment-group-indicator']",
    )!;
    const items = element.querySelectorAll<HTMLElement>(
      "[data-slot='segment-group-item']",
    );
    const secondItem = items[1]!;
    const thirdItem = items[2]!;
    return {
      divider: getComputedStyle(secondItem, "::before").backgroundColor,
      dividerBottom: getComputedStyle(secondItem, "::before").bottom,
      dividerContent: getComputedStyle(secondItem, "::before").content,
      dividerNextToSelection: getComputedStyle(secondItem, "::before").opacity,
      dividerPastSelection: getComputedStyle(thirdItem, "::before").opacity,
      dividerTop: getComputedStyle(secondItem, "::before").top,
      expectedIndicator,
      expectedRoot,
      indicator: getComputedStyle(selectedIndicator).backgroundColor,
      root: getComputedStyle(element).backgroundColor,
    };
  });
  expect(paint.root).toBe(paint.expectedRoot);
  expect(paint.indicator).toBe(paint.expectedIndicator);
  expect(paint.divider).not.toBe(paint.root);
  expect(paint.dividerContent).toBe('""');
  expect(paint.dividerNextToSelection).toBe("0");
  expect(paint.dividerPastSelection).toBe("1");
  expect(paint.dividerTop).toBe("6px");
  expect(paint.dividerBottom).toBe("6px");
  await expect(grid).toHaveCSS("border-inline-start-style", "none");
  const indicatorShadow = await indicator.evaluate(
    (element) => getComputedStyle(element).boxShadow,
  );
  expect(indicatorShadow).toContain("0px 2px 4px");
  expect(indicatorShadow).toContain("0px 0px 1px");
  expect(indicatorShadow).not.toContain("inset");
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
  for (const size of ["2xs", "xs", "sm", "md", "lg"]) {
    await expect(
      page.getByRole("radiogroup", {
        exact: true,
        name: `${size} project view`,
      }),
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
  const rtlIndicator = rtl.locator("[data-slot='segment-group-indicator']");
  await expect
    .poll(async () => {
      const [selectedBox, indicatorBox] = await Promise.all([
        list.boundingBox(),
        rtlIndicator.boundingBox(),
      ]);
      return (
        Math.abs(indicatorBox!.x - selectedBox!.x) +
        Math.abs(indicatorBox!.width - selectedBox!.width)
      );
    })
    .toBeLessThan(1);
  await list.focus();
  await page.keyboard.press("ArrowLeft");
  const rtlGrid = rtl.getByRole("radio", { name: "Grid" });
  await expect(rtlGrid).toBeFocused();
  await expect
    .poll(async () => {
      const [selectedBox, indicatorBox] = await Promise.all([
        rtlGrid.boundingBox(),
        rtlIndicator.boundingBox(),
      ]);
      return Math.abs(indicatorBox!.x - selectedBox!.x);
    })
    .toBeLessThan(1);

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
