import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/context-menu");

test("context-menu defaults and complete recipes", async ({ page }) => {
  await page.getByRole("article", { name: "Quarterly report" }).click({ button: "right" });
  await expect(page).toHaveScreenshot("overview-open-light.png");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("context-menu-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("context-menu-invocation")).toHaveScreenshot("invocation-light.png");
  await expect(page.getByTestId("context-menu-density")).toHaveScreenshot("density-light.png");
  await expect(page.getByTestId("context-menu-anatomy")).toHaveScreenshot("anatomy-light.png");
  await expect(page.getByTestId("context-menu-selection")).toHaveScreenshot("selection-light.png");
  await expect(page.getByTestId("context-menu-states")).toHaveScreenshot("states-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("context-menu-appearance")).toHaveScreenshot("appearance-dark.png");
  await setAppearance(page, "light");
  const customization = page.locator(".playground-customization-evidence");
  await customization.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await expect(customization).toHaveScreenshot("customization-light.png");
});

test("context-menu responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("article", { name: "تقرير المشروع" }).click({ button: "right" });
  await expect(page).toHaveScreenshot("rtl-open-mobile.png");
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("context-menu-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("context-menu-overview")).toHaveScreenshot("overview-forced-colors.png");
});
