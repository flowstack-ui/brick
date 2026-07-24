import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/avatar");

test("Avatar geometry and status", async ({ page }) => {
  await expect(page.getByTestId("avatar-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("avatar-shapes")).toHaveScreenshot("shapes-light.png");
  await expect(page.getByTestId("avatar-statuses")).toHaveScreenshot("statuses-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("avatar-overview")).toHaveScreenshot("overview-dark.png");
});

test("Avatar constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("avatar-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("avatar-statuses")).toHaveScreenshot("statuses-forced-colors.png");
});
