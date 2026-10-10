import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/status?qualification=1");

test("Status documentation sizes and composition", async ({ page }) => {
  await page.goto("/status");
  await expectEvidenceScreenshot(
    page,
    page.locator("#labels"),
    "docs-labels.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#sizes"),
    "docs-sizes.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#composition"),
    "docs-composition.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.locator("#composition"),
    "docs-mobile.png",
  );
});

test("Status overview, tones, and sizes", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="status.overview"]'),
    "overview-light.png",
  );
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="status.tones"]'),
    "tones-dark.png",
  );
});

test("Status indicators remain distinct in forced colors", async ({ page }) => {
  await useForcedColors(page);
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="status.sizes"]'),
    "sizes-forced-colors.png",
  );
});
