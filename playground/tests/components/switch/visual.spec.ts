import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/switch");

test("Switch defaults, sizes, composition, and appearance", async ({ page }) => {
  await expect(page.getByTestId("switch-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("switch-sizes")).toHaveScreenshot("sizes-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("switch-composition"), "composition-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("switch-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Switch responsive, RTL, and forced-color states", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("switch-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("switch-states")).toHaveScreenshot("states-forced-colors.png");
});
