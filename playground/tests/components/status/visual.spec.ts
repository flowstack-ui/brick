import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/status");

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
