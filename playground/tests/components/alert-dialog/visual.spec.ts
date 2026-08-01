import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/alert-dialog");

test("Alert Dialog default and anatomy surfaces", async ({ page }) => {
  await page.getByRole("button", { name: "Delete project?" }).click();
  await expect(page).toHaveScreenshot("overview-light.png");
  await page.getByRole("button", { name: "Keep project" }).click();
  await expectEvidenceScreenshot(page, page.getByTestId("alert-dialog-appearance"), "appearance-light.png");
  await setAppearance(page, "dark");
  await page.getByRole("button", { name: "Inspect decision anatomy" }).click();
  await expect(page).toHaveScreenshot("anatomy-dark.png");
});

test("Alert Dialog narrow RTL and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "حذف مشروع مساحة العمل بالتأكيد؟" }).click();
  await expect(page).toHaveScreenshot("rtl-mobile.png");
  await page.goto("/alert-dialog");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("button", { name: "Delete project?" }).click();
  await expect(page).toHaveScreenshot("overview-forced-colors.png");
});
