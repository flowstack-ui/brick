import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/color-picker");

test("Color Picker overview and complete popup editor", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  await page.getByTestId("color-picker-overview").locator("[data-slot='color-picker-trigger']").click();
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.keyboard.press("Escape");
  await setAppearance(page, "dark");
  await page.locator('[data-scenario="color-picker.recipes"] [data-slot="color-picker-trigger"]').last().click();
  await expect(page).toHaveScreenshot("recipes-dark.png");
});

test("Color Picker narrow RTL and forced-color states", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("[dir='rtl'] [data-slot='color-picker-input']").last().scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("responsive-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.locator("[data-slot='color-picker']").filter({ hasText: "Invalid color" }).first().scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("states-forced-colors.png");
});
