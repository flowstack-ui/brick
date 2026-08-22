import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/stack");
});

test("Stack defaults and family conveniences preserve one contract", async ({ page }) => {
  const stack = page.getByTestId("stack-default");
  await expect(stack).toHaveJSProperty("tagName", "DIV");
  await expect(stack).toHaveClass(/brick-stack/);
  await expect(stack).toHaveAttribute("data-slot", "stack");
  await expect(stack).toHaveAttribute("data-direction", "column");
  await expect(stack).toHaveAttribute("data-gap", "0");
  await expect(stack).toHaveCSS("display", "flex");
  await expect(stack).toHaveCSS("flex-direction", "column");
  await expect(stack).toHaveCSS("align-items", "stretch");
  await expect(stack).toHaveCSS("justify-content", "start");
  await expect(stack).toHaveCSS("gap", "0px");
  await expect(stack).not.toHaveAttribute("role");

  const family = page.getByTestId("stack-family").locator(".brick-stack");
  await expect(family).toHaveCount(3);
  await expect(family.nth(0)).toHaveCSS("flex-direction", "column");
  await expect(family.nth(1)).toHaveCSS("flex-direction", "row");
  await expect(family.nth(1)).toHaveCSS("align-items", "center");
  await expect(family.nth(2)).toHaveCSS("flex-direction", "column");
  await expect(family.nth(2)).toHaveCSS("align-items", "stretch");
});

test("Stack gaps and axes produce exact controlled geometry", async ({ page }) => {
  const examples = page.getByTestId("stack-gaps").locator("[data-gap-example]");
  const expected = [0, 4, 8, 12, 16, 24, 32];
  await expect(examples).toHaveCount(expected.length);
  for (let index = 0; index < expected.length; index += 1) {
    const example = examples.nth(index);
    await expect(example).toHaveCSS("row-gap", `${expected[index]}px`);
    const items = example.locator(".stack-demo-item");
    const first = await box(items.nth(0));
    const second = await box(items.nth(1));
    expect(Math.round(second.y - (first.y + first.height))).toBe(expected[index]);
  }

  const family = page.getByTestId("stack-family").locator(".brick-stack");
  const columnItems = family.nth(0).locator(".stack-demo-item");
  const rowItems = family.nth(1).locator(".stack-demo-item");
  expect((await box(columnItems.nth(1))).y).toBeGreaterThan((await box(columnItems.nth(0))).y);
  expect((await box(rowItems.nth(1))).x).toBeGreaterThan((await box(rowItems.nth(0))).x);
});

test("Stack calculates numeric, explicit, and responsive spacing", async ({ page }) => {
  const factor = page.locator('[data-spacing-example="factor"]');
  const explicit = page.locator('[data-spacing-example="explicit"]');
  const responsive = page.locator('[data-spacing-example="responsive"]');

  await expect(factor).toHaveCSS("gap", "32px");
  await expect(explicit).toHaveCSS("gap", "36px");
  await expect(responsive).toHaveCSS("gap", "32px");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("gap", "8px");
});

test("Stack alignment and distribution map to the intended flex behavior", async ({
  page,
}) => {
  const aligns: Array<[string, string]> = [
    ["stretch", "stretch"],
    ["start", "start"],
    ["center", "center"],
    ["end", "end"],
    ["baseline", "baseline"],
  ];
  for (const [value, css] of aligns) {
    await expect(page.locator(`[data-align-example="${value}"]`)).toHaveCSS(
      "align-items",
      css,
    );
  }

  const justifies: Array<[string, string]> = [
    ["start", "start"],
    ["center", "center"],
    ["end", "end"],
    ["between", "space-between"],
    ["around", "space-around"],
    ["evenly", "space-evenly"],
  ];
  for (const [value, css] of justifies) {
    await expect(page.locator(`[data-justify-example="${value}"]`)).toHaveCSS(
      "justify-content",
      css,
    );
  }
  const between = page.locator('[data-justify-example="between"]');
  const row = await box(between);
  const children = between.locator(".stack-demo-item");
  const first = await box(children.nth(0));
  const second = await box(children.nth(1));
  expect(first.x - row.x).toBeLessThanOrEqual(1);
  expect(row.x + row.width - (second.x + second.width)).toBeLessThanOrEqual(1);
});

test("Stack wrapping is opt-in, contained, and keeps source order", async ({ page }) => {
  const nowrap = page.getByTestId("stack-nowrap");
  const wrap = page.getByTestId("stack-wrap");
  await expect(nowrap).toHaveCSS("flex-wrap", "nowrap");
  await expect(wrap).toHaveCSS("flex-wrap", "wrap");
  const nowrapButtons = nowrap.locator("button");
  const wrapButtons = wrap.locator("button");
  expect((await box(nowrapButtons.nth(2))).y).toBeCloseTo(
    (await box(nowrapButtons.nth(0))).y,
    0,
  );
  expect((await box(wrapButtons.nth(2))).y).toBeGreaterThan(
    (await box(wrapButtons.nth(0))).y,
  );
  await expect(wrapButtons).toHaveText([
    "Approve changes",
    "Save draft",
    "Cancel review",
  ]);
  const parent = await box(wrap.locator(".."));
  const wrapped = await box(wrap);
  expect(wrapped.x).toBeGreaterThanOrEqual(parent.x - 1);
  expect(wrapped.x + wrapped.width).toBeLessThanOrEqual(parent.x + parent.width + 1);
});

test("Stack semantic output, ref, native attributes, and customization are real", async ({
  page,
}) => {
  const semantics = page.getByTestId("stack-semantics");
  const hosts = semantics.locator(".stack-grid .brick-stack");
  await expect(hosts).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    await expect(hosts.nth(index)).toHaveJSProperty(
      "tagName",
      ["DIV", "SECTION", "NAV", "UL"][index],
    );
  }
  await expect(hosts.nth(2)).toHaveAttribute("aria-label", "Project actions");
  await expect(hosts.nth(3)).toHaveCSS("margin-top", "0px");
  await expect(hosts.nth(3)).toHaveCSS("margin-left", "0px");
  await expect(hosts.nth(3)).toHaveCSS("padding-left", "0px");
  await expect(hosts.nth(3)).toHaveCSS("list-style-type", "none");
  const output = semantics.locator("[data-rendered-output]");
  await expect(output).toContainText("<section");
  await expect(output).toContainText('data-direction="column"');
  await expect(output).toContainText('id="stack-output-section"');
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(semantics.getByText("Ref host: SECTION")).toBeVisible();

  const custom = page.locator(".stack-customization__preview .brick-stack");
  await expect(custom).toHaveCSS("gap", "24px");
  await expect(custom).toHaveCSS("border-top-width", "2px");
  await expect(custom).toHaveCSS("padding-top", "16px");
});

test("Stack RTL, reflow, and accessibility preserve logical source order", async ({ page }) => {
  const rtl = page.getByTestId("stack-stress").locator('[dir="rtl"]');
  await expect(rtl).toHaveCSS("direction", "rtl");
  await expect(rtl.locator(".stack-demo-item")).toHaveText([
    "الأول",
    "الثاني",
    "الثالث",
  ]);
  const first = await box(rtl.locator(".stack-demo-item").nth(0));
  const second = await box(rtl.locator(".stack-demo-item").nth(1));
  expect(first.x).toBeGreaterThan(second.x);

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

test("responsive Stack values change arrangement without changing source order", async ({
  page,
}) => {
  const stack = page.getByTestId("stack-responsive");
  const first = page.getByTestId("stack-responsive-first");
  const second = page.getByTestId("stack-responsive-second");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(stack).toHaveCSS("flex-direction", "column");
  await expect(stack).toHaveCSS("gap", "8px");
  await expect(first).toHaveCSS("flex-grow", "0");
  expect((await box(second)).y).toBeGreaterThan((await box(first)).y);
  await expect(stack.locator(".stack-demo-item")).toHaveText([
    "First responsive track",
    "Second responsive track",
  ]);

  await page.setViewportSize({ width: 1120, height: 900 });
  await expect(stack).toHaveCSS("flex-direction", "row");
  await expect(stack).toHaveCSS("gap", "24px");
  await expect(first).toHaveCSS("flex-grow", "1");
  await expect(second).toHaveCSS("flex-grow", "1");
  const firstBox = await box(first);
  const secondBox = await box(second);
  expect(Math.abs(firstBox.width - secondBox.width)).toBeLessThanOrEqual(1);
  expect(secondBox.x).toBeGreaterThan(firstBox.x);
});
