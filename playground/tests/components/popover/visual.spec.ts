import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/popover");

test("Popover default and anatomy surfaces", async ({ page }) => {
  await page.getByRole("button", { name: "Project settings" }).click();
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.keyboard.press("Escape");
  await setAppearance(page, "dark");
  await page.getByRole("button", { name: "Inspect anatomy" }).click();
  await expect(page).toHaveScreenshot("anatomy-dark.png");
});

test("Popover narrow RTL and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "فتح إعدادات المشروع" }).click();
  await expect(page).toHaveScreenshot("rtl-mobile.png");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("button", { name: "Project settings" }).click();
  await expect(page).toHaveScreenshot("overview-forced-colors.png");
});
