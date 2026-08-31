import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/color-swatch");
});

test("renders passive solid, alpha, mixed, and named swatches", async ({
  page,
}) => {
  await expect(page.getByTestId("color-swatch-solid")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.getByTestId("color-swatch-labeled")).toHaveAttribute(
    "role",
    "img",
  );
  await expect(page.getByTestId("color-swatch-labeled")).toHaveAttribute(
    "aria-label",
    "Ocean blue color",
  );
  await expect(page.getByTestId("color-swatch-mix-three")).toHaveCSS(
    "width",
    "24px",
  );
  const alphaBackground = await page
    .getByTestId("color-swatch-alpha")
    .evaluate((node) => getComputedStyle(node, "::after").backgroundColor);
  expect(alphaBackground).toContain("0.45");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("keeps the closed size geometry", async ({ page }) => {
  await expect(page.getByTestId("color-swatch-sm")).toHaveCSS("width", "16px");
  await expect(page.getByTestId("color-swatch-md")).toHaveCSS("width", "24px");
  await expect(page.getByTestId("color-swatch-lg")).toHaveCSS("width", "32px");
});

test("keeps the closed sharp, rounded, and circle geometry", async ({ page }) => {
  await expect(page.getByTestId("color-swatch-sharp")).toHaveCSS("border-radius", "0px");
  const roundedRadius = await page.getByTestId("color-swatch-rounded").evaluate((node) => parseFloat(getComputedStyle(node).borderRadius));
  expect(roundedRadius).toBeGreaterThan(0);
  const circle = page.getByTestId("color-swatch-circle");
  await expect(circle).toHaveCSS("border-radius", "9999px");
  await expect(circle).toHaveAttribute("data-shape", "circle");
});
