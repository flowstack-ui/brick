import { expect, test, type Locator, type Page } from "@playwright/test";

export function installVisualDefaults(route: string) {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Reviewed visual baselines are intentionally Chromium-only.",
    );
    await page.setViewportSize({ width: 1120, height: 900 });
    await page.emulateMedia({
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    await page.goto(route);
    await page.evaluate(async () => {
      document.documentElement.dataset.brickAppearance = "light";
      await document.fonts.ready;
    });
  });
}

export async function setAppearance(page: Page, appearance: "dark" | "light") {
  await page.evaluate((value) => {
    document.documentElement.dataset.brickAppearance = value;
  }, appearance);
}

export async function useForcedColors(page: Page) {
  await page.emulateMedia({
    colorScheme: "light",
    forcedColors: "active",
    reducedMotion: "reduce",
  });
}

export async function expectEvidenceScreenshot(
  page: Page,
  locator: Locator,
  name: string,
) {
  const originalViewport = page.viewportSize() ?? { width: 1120, height: 900 };
  const initialBox = await locator.boundingBox();
  if (!initialBox) {
    throw new Error("Rendered-output evidence is not visible.");
  }
  await page.setViewportSize({
    width: originalViewport.width,
    height: Math.max(originalViewport.height, Math.ceil(initialBox.height) + 450),
  });
  await locator.scrollIntoViewIfNeeded();
  const visibleBox = await locator.boundingBox();
  if (visibleBox && visibleBox.y < 350) {
    await page.evaluate((offset) => {
      window.scrollBy(0, offset);
    }, visibleBox.y - 350);
  }
  await expect(locator).toHaveScreenshot(name);
  await page.setViewportSize(originalViewport);
}

export { expect, test };
