import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/drawer?qualification=1");

const drawerPixels = { maxDiffPixelRatio: 0.005 };

test("Drawer default and anatomy surfaces", async ({ page }) => {
  await page.getByRole("button", { name: "Filter projects" }).click();
  await expect(page).toHaveScreenshot("end-xs-light.png", drawerPixels);
  await page.getByRole("button", { name: "Cancel" }).click();
  await expectEvidenceScreenshot(page, page.getByTestId("drawer-appearance"), "appearance-light.png", drawerPixels);
  await setAppearance(page, "dark");
  await page.getByRole("button", { name: "Inspect drawer anatomy" }).click();
  await expect(page).toHaveScreenshot("anatomy-xs-dark.png", drawerPixels);
});

test("Drawer narrow, full, and forced-color boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "فتح مرشحات مساحة العمل المفصلة" }).click();
  await expect(page).toHaveScreenshot("start-lg-rtl-mobile.png", drawerPixels);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open full drawer" }).click();
  await expect(page).toHaveScreenshot("full-mobile.png", drawerPixels);
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await page.getByRole("button", { name: "Open top drawer" }).click();
  await expect(page).toHaveScreenshot("top-forced-colors.png", drawerPixels);
});
