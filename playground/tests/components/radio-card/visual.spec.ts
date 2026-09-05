import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/radio-card");

test("Radio Card defaults and recipes", async ({ page }) => {
  await expect(page.getByTestId("radio-card-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("radio-card-recipes")).toHaveScreenshot("recipes-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("radio-card-content")).toHaveScreenshot("content-dark.png");
});

test("Radio Card stress and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("radio-card-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("radio-card-states")).toHaveScreenshot("states-forced-colors.png");
});
