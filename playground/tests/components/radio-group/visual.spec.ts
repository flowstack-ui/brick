import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/radio-group");

test("Radio Group defaults, dimensions, composition, and appearance", async ({ page }) => {
  await expect(page.getByTestId("radio-group-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("radio-group-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("radio-group-orientation")).toHaveScreenshot("orientation-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("radio-group-composition"), "composition-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("radio-group-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Radio Group responsive, RTL, and forced-color states", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("radio-group-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("radio-group-states")).toHaveScreenshot("states-forced-colors.png");
});
