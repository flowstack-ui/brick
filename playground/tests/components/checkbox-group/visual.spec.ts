import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/checkbox-group");

test("Checkbox Group ownership, size, and appearance", async ({ page }) => {
  await expect(page.getByTestId("checkbox-group-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("checkbox-group-ownership")).toHaveScreenshot("ownership-light.png");
  await expect(page.getByTestId("checkbox-group-sizes")).toHaveScreenshot("sizes-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("checkbox-group-composition"), "composition-output-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("checkbox-group-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Checkbox Group constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("checkbox-group-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("checkbox-group-states")).toHaveScreenshot("states-forced-colors.png");
});
