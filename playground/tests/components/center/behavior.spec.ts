import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/center");
});

test("public identities center content and keep one host", async ({ page }) => {
  const center = page.getByTestId("center-default");
  const square = page.getByTestId("square-default");
  const circle = page.getByTestId("circle-default");
  await expect(center).toHaveCSS("display", "flex");
  await expect(center).toHaveCSS("align-items", "center");
  await expect(center).toHaveCSS("justify-content", "center");
  await expect(square).toHaveClass(/brick-square/);
  await expect(circle).toHaveClass(/brick-circle/);
  await expect(square).toHaveCSS("width", "48px");
  await expect(square).toHaveCSS("height", "48px");
  await expect(circle).toHaveCSS("width", "48px");
  await expect(circle).toHaveCSS("height", "48px");
  expect(Number.parseFloat(await circle.evaluate((node) => getComputedStyle(node).borderRadius))).toBeGreaterThanOrEqual(24);
});

test("Surface and Icon compose on one exact painted host", async ({ page }) => {
  for (const testId of ["square-icon-well", "circle-icon-well"]) {
    const holder = page.getByTestId(testId);
    await expect(holder).toHaveClass(/brick-surface/);
    await expect(holder).toHaveCSS("width", "32px");
    await expect(holder).toHaveCSS("height", "32px");
    await expect(holder).toHaveCSS("flex-shrink", "0");
    await expect(holder.locator(".brick-icon")).toHaveCSS("width", "16px");
    await expect(holder.locator(".brick-icon")).toHaveCSS("height", "16px");
  }
});

test("responsive size carries forward and flex pressure cannot distort geometry", async ({ page }) => {
  const responsive = page.getByTestId("square-responsive");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("width", "32px");
  await expect(responsive).toHaveCSS("height", "32px");
  await page.setViewportSize({ width: 800, height: 900 });
  await expect(responsive).toHaveCSS("width", "40px");
  await expect(responsive).toHaveCSS("height", "40px");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(responsive).toHaveCSS("width", "48px");
  await expect(responsive).toHaveCSS("height", "48px");

  const fixed = page.getByTestId("square-flex-fixed");
  const box = await fixed.boundingBox();
  expect(box?.width).toBe(32);
  expect(box?.height).toBe(32);
});

test("inline and RTL stress remain logical and accessible", async ({ page }) => {
  const inline = page.getByTestId("circle-inline");
  await expect(inline).toHaveCSS("display", "inline-flex");
  await expect(inline).toHaveCSS("vertical-align", "middle");
  await expect(page.getByTestId("center-rtl")).toHaveCSS("direction", "rtl");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
