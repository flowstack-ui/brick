import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/dialog");

test("Dialog default and anatomy surfaces", async ({ page }) => {
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.keyboard.press("Escape");
  await setAppearance(page, "dark");
  await page.getByRole("button", { name: "Inspect dialog anatomy" }).click();
  await expect(page).toHaveScreenshot("anatomy-dark.png");
});

test("Dialog narrow RTL and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "فتح إعدادات مساحة العمل المفصلة" }).click();
  await expect(page).toHaveScreenshot("rtl-mobile.png");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page).toHaveScreenshot("overview-forced-colors.png");
});
