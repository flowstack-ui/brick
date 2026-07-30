import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/image");

test("Image defaults, fits, positions, and geometry", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1600 });
  await page.locator("#scenario-image-overview img").waitFor();
  await expect(page.locator("#scenario-image-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-image-fits")).toHaveScreenshot("fits-light.png");
  await expect(page.locator("#scenario-image-positions")).toHaveScreenshot("positions-light.png");
  await expect(page.locator("#scenario-image-geometry")).toHaveScreenshot("geometry-light.png");
});

test("Image appearance, fallback, mobile, and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1600 });
  await setAppearance(page, "dark");
  await expect(page.locator("#scenario-image-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.getByRole("button", { name: "Broken" }).click();
  await expect(page.getByTestId("image-state")).toHaveAttribute("data-state", "error");
  await expect(page.locator("#scenario-image-states")).toHaveScreenshot("fallback-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#scenario-image-stress img").evaluateAll(async (images) => {
    await Promise.all(images.map((image) => (image as HTMLImageElement).decode()));
  });
  await expect(page.locator("#scenario-image-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-image-appearance")).toHaveScreenshot("appearance-forced-colors.png");
});
