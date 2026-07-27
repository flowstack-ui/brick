import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/dropdown-menu");

test("dropdown-menu defaults and complete recipes", async ({ page }) => {
  await page.getByTestId("dropdown-menu-overview").getByRole("button", { name: "Project actions" }).click();
  await expect(page).toHaveScreenshot("overview-open-light.png");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("dropdown-menu-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("dropdown-menu-density")).toHaveScreenshot("density-light.png");
  await expect(page.getByTestId("dropdown-menu-anatomy")).toHaveScreenshot("anatomy-light.png");
  await expect(page.getByTestId("dropdown-menu-selection")).toHaveScreenshot("selection-light.png");
  await expect(page.getByTestId("dropdown-menu-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("dropdown-menu-submenus")).toHaveScreenshot("submenus-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("dropdown-menu-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("dropdown-menu responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "إجراءات المشروع" }).click();
  await expect(page).toHaveScreenshot("rtl-open-mobile.png");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("dropdown-menu-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("dropdown-menu-overview")).toHaveScreenshot("overview-forced-colors.png");
});
