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

test("Card visual hierarchy remains stable across recipes and appearances", async ({ page }) => {
  await page.goto("/card");
  await expect(page.getByTestId("card-variants")).toHaveScreenshot("card-variants-light.png");
  await expect(page.getByTestId("card-sizes")).toHaveScreenshot("card-sizes-light.png");

  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await expect(page.getByTestId("card-overview")).toHaveScreenshot("card-overview-dark.png");
  await expect(page.getByTestId("card-appearance")).toHaveScreenshot("card-appearance-scopes.png");
});

test("Card constrained and RTL recipes remain visually contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/card");
  await expect(page.getByTestId("card-stress")).toHaveScreenshot("card-stress-mobile.png");
});

test("Card variants retain boundaries in forced colors", async ({ page }) => {
  await page.goto("/card");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await expect(page.getByTestId("card-variants")).toHaveScreenshot("card-variants-forced-colors.png");
});

test("Dialog surface and anatomy retain their visual hierarchy", async ({ page }) => {
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page).toHaveScreenshot("dialog-overview-light.png");

  await page.keyboard.press("Escape");
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  await page.getByRole("button", { name: "Inspect dialog anatomy" }).click();
  await expect(page).toHaveScreenshot("dialog-anatomy-dark.png");
});

test("Dialog remains contained in narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dialog");
  await page.getByRole("button", { name: "فتح إعدادات مساحة العمل المفصلة" }).click();
  await expect(page).toHaveScreenshot("dialog-rtl-mobile.png");
});

test("Dialog retains its boundary in forced colors", async ({ page }) => {
  await page.goto("/dialog");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Edit profile" }).click();
  await expect(page).toHaveScreenshot("dialog-overview-forced-colors.png");
});
