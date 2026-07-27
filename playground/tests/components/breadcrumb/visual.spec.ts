import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/breadcrumb");

test("Breadcrumb defaults, recipes, content, composition, and appearance", async ({ page }) => {
  await expect(page.getByTestId("breadcrumb-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("breadcrumb-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("breadcrumb-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("breadcrumb-content")).toHaveScreenshot("content-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("breadcrumb-composition"), "composition-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("breadcrumb-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Breadcrumb collapse, responsive RTL, and forced colors", async ({ page }) => {
  await expect(page.getByTestId("breadcrumb-collapse")).toHaveScreenshot("collapse-light.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("breadcrumb-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("breadcrumb-variants")).toHaveScreenshot("variants-forced-colors.png");
});
