import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/data-list?qualification=1");

test("Data List documentation recipes and grouped facts", async ({ page }) => {
  await page.goto("/data-list");
  await setAppearance(page, "light");
  await expectEvidenceScreenshot(
    page,
    page.locator("#variants"),
    "documentation-variants-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.locator("#grouped"),
    "documentation-grouped-light.png",
  );
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.locator("#rich-values"),
    "documentation-rich-dark.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.locator("#long-content"),
    "documentation-rtl-narrow-dark.png",
  );
});

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
