import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/navigation-menu");

test("navigation-menu defaults and complete recipes", async ({ page }) => {
  await expect(page.getByTestId("navigation-menu-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("navigation-menu-links")).toHaveScreenshot("links-light.png");
  await expect(page.getByTestId("navigation-menu-size")).toHaveScreenshot("size-light.png");
  await expect(page.getByTestId("navigation-menu-orientation")).toHaveScreenshot("orientation-light.png");
  await expect(page.getByTestId("navigation-menu-content")).toHaveScreenshot("content-light.png");
  await expect(page.getByTestId("navigation-menu-states")).toHaveScreenshot("states-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("navigation-menu-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("navigation-menu responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("navigation-menu-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("navigation-menu-overview")).toHaveScreenshot("overview-forced-colors.png");
});
