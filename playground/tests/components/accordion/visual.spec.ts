import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/accordion");

test("Accordion defaults, variants, sizes, selection, states, and orientation", async ({ page }) => {
  await expect(page.getByTestId("accordion-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("accordion-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("accordion-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("accordion-selection")).toHaveScreenshot("selection-light.png");
  await expect(page.getByTestId("accordion-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("accordion-orientation")).toHaveScreenshot("orientation-light.png");
  await expect(page.getByTestId("accordion-composition")).toHaveScreenshot("composition-light.png");
  await expect(page.getByTestId("accordion-theme")).toHaveScreenshot("theme-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("accordion-appearance")).toHaveScreenshot("appearance-dark.png");
});

test("Accordion responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("accordion-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("accordion-variants")).toHaveScreenshot("variants-forced-colors.png");
});
