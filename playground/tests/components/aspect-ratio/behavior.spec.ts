import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function box(locator: Locator) {
  const value = await locator.boundingBox();
  expect(value).not.toBeNull();
  return value!;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/aspect-ratio");
  await expect(page.getByTestId("aspect-ratio-default")).toBeVisible();
});

test("defaults, ratios, variants, radii, and overflow are deterministic", async ({ page }) => {
  const root = page.getByTestId("aspect-ratio-default");
  await expect(root).toHaveAttribute("data-slot", "aspect-ratio");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root).toHaveAttribute("data-radius", "none");
  await expect(root).toHaveAttribute("data-overflow", "hidden");
  await expect(root).not.toHaveAttribute("role");
  await expect(root).toHaveCSS("position", "relative");
  await expect(root).toHaveCSS("overflow", "hidden");
  const defaultBox = await box(root);
  expect(defaultBox.width / defaultBox.height).toBeCloseTo(16 / 9, 1);

  const ratioBoxes = await page.getByTestId("aspect-ratio-ratios").locator(".brick-aspect-ratio").evaluateAll(elements => elements.map(element => { const box = element.getBoundingClientRect(); return box.width / box.height; }));
  [1, 4 / 3, 16 / 9, 21 / 9, 3 / 4].forEach((ratio, index) => expect(ratioBoxes[index]).toBeCloseTo(ratio, 1));

  const variants = page.getByTestId("aspect-ratio-variants").locator(".brick-aspect-ratio");
  await expect(variants.nth(0)).toHaveCSS("border-left-width", "0px");
  await expect(variants.nth(2)).toHaveCSS("border-left-width", "1px");
  const radii = await page.getByTestId("aspect-ratio-radii").locator(".brick-aspect-ratio").evaluateAll(elements => elements.map(element => getComputedStyle(element).borderRadius));
  expect(new Set(radii).size).toBe(5);
  await expect(page.getByTestId("aspect-ratio-overflow").locator(".brick-aspect-ratio").nth(0)).toHaveCSS("overflow", "hidden");
  await expect(page.getByTestId("aspect-ratio-overflow").locator(".brick-aspect-ratio").nth(1)).toHaveCSS("overflow", "visible");
});

test("child semantics, composition, customization, and ref remain exact", async ({ page }) => {
  await expect(page.getByRole("img", { name: "Release dashboard preview" })).toBeVisible();
  await expect(page.getByTitle("Product tour")).toBeVisible();
  await expect(page.locator(".brick-aspect-ratio")).toHaveCount(31);
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: ARTICLE")).toBeVisible();
  await expect(page.getByLabel("Composed square")).toHaveJSProperty("tagName", "SECTION");
  const invalid = await box(page.getByTestId("aspect-ratio-invalid"));
  expect(invalid.width / invalid.height).toBeCloseTo(16 / 9, 1);
  await expect(page.getByTestId("aspect-ratio-appearance").locator(".brick-badge")).toHaveText(["light", "dark", "customized"]);
  const badgeWidths = await page.getByTestId("aspect-ratio-appearance").locator(".brick-badge").evaluateAll(elements => elements.map(element => element.getBoundingClientRect().width));
  expect(badgeWidths.every(width => width < 8 * 16)).toBe(true);
  await expect(page.getByTestId("aspect-ratio-appearance").getByRole("heading", { name: "Aspect Ratio CSS properties" })).toBeVisible();
  const custom = page.getByTestId("aspect-ratio-appearance").locator(".aspect-ratio-customization .brick-aspect-ratio");
  await expect(custom).toHaveCSS("border-radius", "16px");
  expect((await box(custom)).width).toBeLessThanOrEqual(32 * 16);
});

test("responsive, RTL, preferences, focus, and accessibility hold", async ({ page }) => {
  const navigationRects = await page.locator(".scenario-nav li").evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { left: rect.left, right: rect.right }; }));
  expect(navigationRects.every((rect, index) => index === navigationRects.length - 1 || rect.right <= navigationRects[index + 1]!.left + 0.5)).toBe(true);
  const ltr = page.getByTestId("aspect-ratio-stress").locator(".brick-aspect-ratio").nth(0);
  const rtl = page.getByTestId("aspect-ratio-stress").locator(".brick-aspect-ratio").nth(1);
  expect((await box(ltr)).width / (await box(ltr)).height).toBeCloseTo(3 / 4, 1);
  expect((await box(rtl)).width / (await box(rtl)).height).toBeCloseTo(4 / 3, 1);
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = await box(page.getByTestId("aspect-ratio-stress"));
  expect(stress.x).toBeGreaterThanOrEqual(0);
  expect(stress.x + stress.width).toBeLessThanOrEqual(390);
  const focus = page.getByRole("button", { name: "Review release" });
  await focus.focus();
  await expect(focus).toBeFocused();
  const results = await new AxeBuilder({ page }).include('[data-component-page="aspect-ratio"]').exclude("iframe").analyze();
  expect(results.violations).toEqual([]);
});
