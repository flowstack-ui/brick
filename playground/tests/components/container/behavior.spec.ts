import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/container");
});

test("default is one centered wide root with medium logical gutters", async ({
  page,
}) => {
  const container = page.getByTestId("container-default");
  await expect(container).toHaveJSProperty("tagName", "DIV");
  await expect(container).toHaveClass(/brick-container/);
  await expect(container).toHaveAttribute("data-measure", "wide");
  await expect(container).toHaveAttribute("data-gutter", "md");
  await expect(container).toHaveAttribute("data-slot", "container");
  await expect(container).toHaveCSS("box-sizing", "border-box");
  await expect(container).not.toHaveAttribute("role");
  await expect(container.locator(":scope > *")).toHaveCount(1);
});

test("every demonstrated boundary remains visible at phone width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const containers = page.locator(".container-page .brick-container");

  for (const container of await containers.all()) {
    await expect(container).toHaveCSS("border-left-style", "dashed");
    await expect(container).toHaveCSS("border-left-width", "2px");
    await expect(container).toHaveCSS("border-right-style", "dashed");
    await expect(container).toHaveCSS("border-right-width", "2px");

    const bounds = await box(container);
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);
  }
});

test("closed measures cap one identical border box", async ({ page }) => {
  const firstBoundary = page.getByTestId("container-measures")
    .locator(":scope > .container-boundary").first();
  const firstLabel = firstBoundary.locator("[data-playground-specimen-label]");
  await expect(firstLabel).toHaveAttribute("data-tone", "neutral");
  await expect(firstLabel).toHaveAttribute("data-variant", "soft");
  await expect(firstLabel).toHaveAttribute("data-shape", "rounded");
  expect((await box(firstLabel)).width).toBeLessThan(
    (await box(firstBoundary)).width / 2,
  );
  const [labelBackground, boundaryBackground] = await firstBoundary.evaluate(
    (boundary) => {
      const label = boundary.querySelector("[data-playground-specimen-label]");
      return [
        getComputedStyle(label!).backgroundColor,
        getComputedStyle(boundary).backgroundColor,
      ];
    },
  );
  expect(labelBackground).not.toBe(boundaryBackground);

  const examples = page.getByTestId("container-measures").locator(
    ":scope > .container-boundary > .brick-container",
  );
  const expected = [672, 1024, 1152, 1440];
  for (let index = 0; index < expected.length; index += 1) {
    expect((await box(examples.nth(index))).width).toBeLessThanOrEqual(
      expected[index],
    );
  }
  const full = await box(examples.nth(4));
  const parent = await box(examples.nth(4).locator(".."));
  expect(full.width).toBeGreaterThan(parent.width - 30);
  expect(full.width).toBeLessThan(parent.width);
  for (let index = 0; index < await examples.count(); index += 1) {
    await expect(examples.nth(index)).toHaveCSS("border-left-style", "dashed");
    await expect(examples.nth(index)).toHaveCSS("border-left-width", "2px");
  }
});

test("gutters are border-box contained and customization is exact", async ({
  page,
}) => {
  const examples = page.getByTestId("container-gutters").locator(
    ".container-boundary > .brick-container",
  );
  const viewportWidth = page.viewportSize()!.width;
  const expected = [
    0,
    Math.min(16, Math.max(12, viewportWidth * 0.02)),
    Math.min(32, Math.max(16, viewportWidth * 0.03)),
    Math.min(64, Math.max(16, viewportWidth * 0.04)),
  ];
  for (const [index, value] of expected.entries()) {
    const padding = await examples.nth(index).evaluate((element) => {
      const style = getComputedStyle(element);
      return [parseFloat(style.paddingLeft), parseFloat(style.paddingRight)];
    });
    expect(padding[0]).toBeCloseTo(value, 3);
    expect(padding[1]).toBeCloseTo(value, 3);
  }
  const custom = page.getByTestId("container-customization")
    .locator(".playground-customization-preview > .brick-container");
  await expect(custom).toHaveCSS("max-width", "768px");
  await expect(custom).toHaveCSS("padding-left", "40px");
});

test("semantic output and ref preserve authored structure", async ({ page }) => {
  const output = page.locator("[data-rendered-output]").first();
  await expect(output).toContainText("<section");
  await expect(output).toContainText('data-measure="medium"');
  await expect(output).not.toContainText('role=');
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: SECTION")).toBeVisible();
});

test("RTL, vertical writing, reflow, focus, and axe remain contained", async ({
  page,
}) => {
  const stress = page.getByTestId("container-stress");
  const rtl = stress.locator('[dir="rtl"] .brick-container');
  const rtlBox = await box(rtl);
  const contentBox = await box(rtl.locator(".brick-text").first());
  expect(contentBox.x).toBeGreaterThan(rtlBox.x);
  await rtl.getByRole("button").focus();
  await expect(rtl.getByRole("button")).toBeFocused();

  const vertical = stress.locator(".container-vertical .brick-container");
  await expect(vertical).toHaveCSS("writing-mode", "vertical-rl");
  await page.setViewportSize({ width: 430, height: 932 });
  const stressBoxes = stress.locator(":scope > .container-boundary");
  expect((await box(stressBoxes.nth(1))).y).toBeGreaterThan(
    (await box(stressBoxes.nth(0))).y,
  );
  await page.setViewportSize({ width: 320, height: 720 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(320);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
