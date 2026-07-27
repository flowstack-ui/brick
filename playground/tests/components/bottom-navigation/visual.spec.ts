import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/bottom-navigation");

test("Bottom Navigation default, recipes, layout, and selection", async ({ page }) => {
  await expect(page.getByTestId("bottom-navigation-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("bottom-navigation-recipes")).toHaveScreenshot("recipes-light.png");
  await expect(page.getByTestId("bottom-navigation-layout")).toHaveScreenshot("layout-light.png");
  await expect(page.getByTestId("bottom-navigation-selection")).toHaveScreenshot("selection-light.png");
});

test("Bottom Navigation content, behavior, effects, dark, mobile, and forced colors", async ({ page }) => {
  await expect(page.getByTestId("bottom-navigation-labels-content")).toHaveScreenshot("content-light.png");
  await expect(page.getByTestId("bottom-navigation-behavior")).toHaveScreenshot("behavior-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("bottom-navigation-effects")).toHaveScreenshot("effects-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("bottom-navigation-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("bottom-navigation-overview")).toHaveScreenshot("overview-forced-colors.png");
});
