import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/toast");

test("Toast types, content, queue, positions, and appearances", async ({ page }) => {
  await expect(page.getByTestId("toast-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("toast-types")).toHaveScreenshot("types-light.png");
  await expect(page.getByTestId("toast-content")).toHaveScreenshot("content-light.png");
  await expect(page.getByTestId("toast-queue")).toHaveScreenshot("queue-light.png");
  await expect(page.getByTestId("toast-positions")).toHaveScreenshot("positions-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("toast-customization")).toHaveScreenshot("appearance-dark.png");
});

test("Toast mobile, reduced motion, and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("toast-stress")).toHaveScreenshot("stress-mobile.png");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByTestId("toast-async")).toHaveScreenshot("loading-reduced-motion.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("toast-types")).toHaveScreenshot("types-forced-colors.png");
});
