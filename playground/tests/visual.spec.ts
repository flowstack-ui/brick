import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Visual baselines are intentionally Chromium-only.");
  await page.setViewportSize({ width: 1120, height: 900 });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/button");
  await page.evaluate(async () => {
    document.documentElement.dataset.brickAppearance = "light";
    await document.fonts.ready;
  });
});

test("Button visual recipes retain their hierarchy", async ({ page }) => {
  await expect(page.getByTestId("button-variants")).toHaveScreenshot("button-variants-light.png");

  await page.evaluate(() => {
    document.documentElement.dataset.brickAppearance = "dark";
  });
  await expect(page.getByTestId("button-tones")).toHaveScreenshot("button-tones-dark.png");
  await expect(page.getByTestId("button-sizes")).toHaveScreenshot("button-sizes-dark.png");
});

test("Button high-risk states retain visible boundaries", async ({ page }) => {
  await expect(page.getByTestId("button-states")).toHaveScreenshot("button-states-light.png");

  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("button-states")).toHaveScreenshot("button-states-forced-colors.png");
});

test("Button constrained and RTL recipes remain contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("button-stress")).toHaveScreenshot("button-stress-mobile.png");
});
