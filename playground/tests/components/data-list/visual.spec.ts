import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/data-list");

test("Data List overview and responsive recipes", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="data-list.overview"]'),
    "overview-light.png",
  );
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="data-list.recipes"]'),
    "recipes-dark.png",
  );
});

test("Data List keeps native facts legible in forced colors", async ({
  page,
}) => {
  await useForcedColors(page);
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="data-list.orientation"]'),
    "orientation-forced-colors.png",
  );
});
