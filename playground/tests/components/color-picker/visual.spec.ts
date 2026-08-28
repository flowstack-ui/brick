import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/color-picker");

test("Color Picker overview and open presets", async ({ page }) => {
  await page.getByRole("button", { name: "Choose brand color preset" }).click();
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.keyboard.press("Escape");
  await setAppearance(page, "dark");
  await page.getByRole("button", { name: "Choose soft color preset" }).click();
  await expect(page).toHaveScreenshot("recipes-dark.png");
});

test("Color Picker narrow RTL and forced-color states", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("textbox", { exact: true, name: "لون العلامة التجارية للمؤسسة الدولية" }).scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("responsive-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("textbox", { exact: true, name: "Invalid color" }).scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("states-forced-colors.png");
});
