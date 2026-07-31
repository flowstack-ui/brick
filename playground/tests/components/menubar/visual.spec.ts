import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/menubar");

test("menubar defaults and complete recipes", async ({ page }) => {
  await expect(page.getByTestId("menubar-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("menubar-orientation")).toHaveScreenshot("orientation-light.png");
  await expect(page.getByTestId("menubar-density")).toHaveScreenshot("density-light.png");
  await page.getByTestId("menubar-triggers").getByRole("menubar", { exact: true, name: "Editor commands" }).getByRole("menuitem", { name: "File" }).click();
  await expect(page.getByTestId("menubar-triggers")).toHaveScreenshot("triggers-light.png");
  await page.keyboard.press("Escape");
  await page.getByTestId("menubar-anatomy").getByRole("menuitem", { name: "Document" }).click();
  await expect(page.getByTestId("menubar-anatomy")).toHaveScreenshot("anatomy-light.png");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("menubar-selection")).toHaveScreenshot("selection-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("menubar-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.getByTestId("menubar-customization").getByRole("menuitem", { name: "File" }).click();
  await expect(page.getByTestId("menubar-customization")).toHaveScreenshot("customization-dark.png");
});

test("menubar responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("menubar-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("menubar-overview")).toHaveScreenshot("overview-forced-colors.png");
});
