import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/fieldset");

test("Fieldset anatomy, state, and appearance", async ({ page }) => {
  await expect(page.getByTestId("fieldset-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("fieldset-states")).toHaveScreenshot("states-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("fieldset-relationships"), "relationships-output-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("fieldset-composition"), "composition-output-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("fieldset-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Fieldset constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("fieldset-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("fieldset-states")).toHaveScreenshot("states-forced-colors.png");
});
