import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/aspect-ratio?isolated=0&testMode=1&qualification=1");

test("Props table has native comparison layout in light, dark and mobile", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1#props");
  await expectEvidenceScreenshot(page, page.locator("#props"), "docs-props-light.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#props"), "docs-props-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#props"), "docs-props-mobile-dark.png");
});

test("documentation visual recipes are paired and responsive", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1");
  for (const id of ["variants", "radius", "overflow", "content-layout"]) {
    await expectEvidenceScreenshot(page, page.locator("#" + id), `docs-${id}-light.png`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#overflow"), "docs-overflow-mobile-dark.png");
  await expectEvidenceScreenshot(page, page.locator("#content-layout"), "docs-content-layout-mobile-dark.png");
});

test("Aspect Ratio defaults, ratios, framing, and composition", async ({ page }) => {
  const intro = page.locator('[data-scenario="aspect-ratio.overview"]');
  await expectEvidenceScreenshot(page, intro.locator("[data-example-preview]"), "overview-light.png", { maxDiffPixelRatio: 0 });
  await intro.getByRole("tab", { name: "Code", exact: true }).click();
  await expectEvidenceScreenshot(page, intro.locator("[data-example-source]"), "headerless-code-dark.png", { maxDiffPixelRatio: 0 });
  await intro.getByRole("tab", { name: "Preview", exact: true }).click();
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-ratios"), "ratios-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-radii"), "radii-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-content"), "content-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-aspect-ratio-native"), "composition-light.png");
});

test("Aspect Ratio appearance, responsive, RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-appearance"), "appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-stress"), "stress-mobile.png");
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("aspect-ratio-variants"), "variants-forced-colors.png");
});

test("Usage and paired image examples remain readable on desktop and mobile", async ({ page }) => {
  await expect(page.locator("#image img")).toBeVisible();
  await expectEvidenceScreenshot(page, page.locator("#usage"), "usage-light.png");
  await expectEvidenceScreenshot(page, page.locator("#image"), "image-light.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#responsive"), "responsive-mobile.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#usage"), "usage-mobile-dark.png");
});
