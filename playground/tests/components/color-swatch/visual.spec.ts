import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/color-swatch");

test("Color Swatch colors, sizes, and mixtures", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="color-swatch.overview"]'),
    "overview-light.png",
  );
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="color-swatch.mix"]'),
    "mix-dark.png",
  );
});

test("Color Swatch semantics remain recognizable in forced colors", async ({
  page,
}) => {
  await useForcedColors(page);
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="color-swatch.semantics"]'),
    "semantics-forced-colors.png",
  );
});
