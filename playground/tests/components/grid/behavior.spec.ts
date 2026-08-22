import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/grid");
});

test("Grid default is one explicit equal track with no semantic invention", async ({
  page,
}) => {
  const grid = page.getByTestId("grid-default");
  await expect(grid).toHaveJSProperty("tagName", "DIV");
  await expect(grid).toHaveClass(/brick-grid/);
  await expect(grid).toHaveAttribute("data-slot", "grid");
  await expect(grid).toHaveAttribute("data-mode", "explicit");
  await expect(grid).toHaveAttribute("data-columns", "1");
  await expect(grid).toHaveAttribute("data-gap", "0");
  await expect(grid).toHaveCSS("display", "grid");
  await expect(grid).toHaveCSS("grid-template-columns", /\d+px/);
  await expect(grid).toHaveCSS("align-items", "stretch");
  await expect(grid).toHaveCSS("justify-items", "stretch");
  await expect(grid).not.toHaveAttribute("role");
  await expect(grid.locator(":scope > *")).toHaveCount(1);
});

test("explicit columns are exact and equal", async ({ page }) => {
  const examples = page.getByTestId("grid-columns").locator("[data-columns-example]");
  await expect(examples).toHaveCount(6);
  for (let index = 0; index < 6; index += 1) {
    const grid = examples.nth(index);
    const expectedCount = index + 1;
    const tiles = grid.locator(":scope > .grid-demo-tile");
    await expect(tiles).toHaveCount(expectedCount);
    const first = await box(tiles.first());
    for (let tile = 1; tile < expectedCount; tile += 1) {
      expect((await box(tiles.nth(tile))).width).toBeCloseTo(first.width, 0);
    }
    await expect(grid).toHaveCSS(
      "grid-template-columns",
      new RegExp(Array(expectedCount).fill("\\d+(?:\\.\\d+)?px").join(" ")),
    );
  }
});

test("intrinsic mode changes track count from available component width", async ({
  page,
}) => {
  const grid = page.locator('[data-size-example="xs"]');
  await expect(grid).toHaveAttribute("data-mode", "intrinsic");
  const tiles = grid.locator(":scope > .grid-demo-tile");
  await grid.evaluate((element) => {
    element.style.inlineSize = "500px";
  });
  const wideFirst = await box(tiles.nth(0));
  const wideSecond = await box(tiles.nth(1));

  await grid.evaluate((element) => {
    element.style.inlineSize = "120px";
  });
  const narrowFirst = await box(tiles.nth(0));
  const narrowSecond = await box(tiles.nth(1));
  expect(wideSecond.y).toBeCloseTo(wideFirst.y, 0);
  expect(narrowSecond.y).toBeGreaterThan(narrowFirst.y);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(390);
});

test("uniform and axis gaps map to exact geometry", async ({ page }) => {
  const expected = [0, 4, 8, 12, 16, 24, 32];
  const examples = page.getByTestId("grid-gaps").locator("[data-gap-example]");
  await expect(examples).toHaveCount(expected.length);
  for (let index = 0; index < expected.length; index += 1) {
    const grid = examples.nth(index);
    await expect(grid).toHaveCSS("row-gap", `${expected[index]}px`);
    await expect(grid).toHaveCSS("column-gap", `${expected[index]}px`);
  }
  const row = page.locator('[data-axis-example="row"]');
  const column = page.locator('[data-axis-example="column"]');
  await expect(row).toHaveCSS("row-gap", "32px");
  await expect(row).toHaveCSS("column-gap", "8px");
  await expect(column).toHaveCSS("row-gap", "8px");
  await expect(column).toHaveCSS("column-gap", "32px");
});

test("numeric, explicit, and responsive Grid gaps share one resolver", async ({ page }) => {
  const factor = page.locator('[data-spacing-example="factor"]');
  const explicit = page.locator('[data-spacing-example="explicit"]');
  const responsive = page.locator('[data-spacing-example="responsive"]');

  await expect(factor).toHaveCSS("gap", "32px");
  await expect(explicit).toHaveCSS("row-gap", "20px");
  await expect(explicit).toHaveCSS("column-gap", "36px");
  await expect(responsive).toHaveCSS("gap", "32px");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("gap", "8px");
});

test("Root and Item alignment map to native Grid geometry", async ({ page }) => {
  for (const value of ["stretch", "start", "center", "end", "baseline"]) {
    await expect(page.locator(`[data-align-example="${value}"]`)).toHaveCSS(
      "align-items",
      value,
    );
  }
  for (const value of ["stretch", "start", "center", "end"]) {
    await expect(page.locator(`[data-justify-example="${value}"]`)).toHaveCSS(
      "justify-items",
      value,
    );
  }
  const placed = page.getByTestId("grid-placement");
  await expect(placed.locator('[data-align="center"]')).toHaveCSS(
    "align-self",
    "center",
  );
  await expect(placed.locator('[data-justify="end"]')).toHaveCSS(
    "justify-self",
    "end",
  );
});

test("Item spans and lines occupy the approved tracks without changing order", async ({
  page,
}, testInfo) => {
  const grid = page.getByTestId("grid-placement");
  const children = grid.locator(":scope > *");
  await expect(children).toHaveCount(8);
  await expect(children).toHaveText([
    "1 · ordinary",
    "2 · span two",
    "3 · ordinary",
    "4 · lines 2–5",
    "5 · full width",
    "6 · self aligned",
    "7 · ordinary",
    "8 · ordinary",
  ]);
  const two = await box(children.nth(1));
  const one = await box(children.nth(0));
  if (testInfo.project.name.startsWith("mobile-")) {
    expect(two.width).toBeCloseTo(one.width, 0);
    await expect(children.nth(3)).toHaveCSS("grid-column-start", "auto");
    await expect(children.nth(3)).toHaveCSS("grid-column-end", "auto");
    return;
  }
  expect(two.width).toBeGreaterThan(one.width * 1.8);
  const full = await box(children.nth(4));
  const root = await box(grid);
  expect(full.width).toBeGreaterThan(root.width * 0.85);
  await expect(children.nth(3)).toHaveCSS("grid-column-start", "2");
  await expect(children.nth(3)).toHaveCSS("grid-column-end", "5");
});

test("semantic output, native attributes, ref, and customization are real", async ({
  page,
}) => {
  const semantics = page.getByTestId("grid-semantics");
  const output = semantics.locator("[data-rendered-output]");
  await expect(output).toContainText("<section");
  await expect(output).toContainText('data-mode="explicit"');
  await expect(output).toContainText('data-slot="grid-item"');
  await expect(output).toContainText('data-column-span="full"');
  await expect(output).not.toContainText('role="grid"');
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(semantics.getByText("Ref host: SECTION")).toBeVisible();

  const composed = page.getByTestId("grid-composed-item");
  await expect(composed).toHaveJSProperty("tagName", "A");
  await expect(composed).toHaveClass(/brick-grid-item/);
  await expect(composed).toHaveAttribute("data-column-start", "2");
  await expect(composed.locator("xpath=parent::*")).toHaveClass(/brick-grid/);

  const custom = page.locator(".grid-page .playground-customization-preview.brick-grid");
  await expect(custom).toHaveCSS("column-gap", "32px");
  await expect(custom).toHaveCSS("row-gap", "8px");
  await expect(custom).toHaveCSS("border-top-width", "2px");
  await expect(custom).toHaveCSS("padding-top", "16px");

  const semanticList = page.getByRole("list", { name: "Semantic peer collection" });
  await expect(semanticList).toHaveJSProperty("tagName", "UL");
  await expect(semanticList).toHaveCSS("margin-top", "0px");
  await expect(semanticList).toHaveCSS("margin-left", "0px");
  await expect(semanticList).toHaveCSS("padding-left", "0px");
  await expect(semanticList).toHaveCSS("list-style-type", "none");
  await expect(semanticList.locator(":scope > li")).toHaveCount(2);
});

test("RTL, focus order, reflow, and accessibility remain source ordered", async ({
  page,
}) => {
  const rtl = page.getByTestId("grid-stress").locator('[dir="rtl"]');
  const buttons = rtl.locator("button");
  await expect(buttons).toHaveText(["الأول", "الثاني", "الثالث"]);
  expect((await box(buttons.nth(0))).x).toBeGreaterThan((await box(buttons.nth(1))).x);
  await buttons.nth(0).focus();
  await page.keyboard.press("Tab");
  await expect(buttons.nth(1)).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(buttons.nth(2)).toBeFocused();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.addStyleTag({
    content:
      ".brick-text{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}",
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(390);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("responsive Grid changes tracks and spans without changing source order", async ({ page }) => {
  const grid = page.getByTestId("grid-responsive");
  const items = grid.locator(":scope > *");
  await expect(items).toHaveText(["First", "Responsive feature", "Last"]);

  await page.setViewportSize({ width: 390, height: 844 });
  expect((await grid.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length))).toBe(1);
  await expect(items.nth(1)).toHaveCSS("grid-column-start", "1");
  await expect(items.nth(1)).toHaveCSS("grid-column-end", "-1");

  await page.setViewportSize({ width: 1120, height: 900 });
  expect((await grid.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length))).toBe(4);
  await expect(items.nth(1)).toHaveCSS("grid-column-start", "auto");
  await expect(items.nth(1)).toHaveCSS("grid-column-end", "span 2");
  await expect(items).toHaveText(["First", "Responsive feature", "Last"]);
});
