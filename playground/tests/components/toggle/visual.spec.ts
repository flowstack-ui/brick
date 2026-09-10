import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/toggle");

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({ content: ".evidence-review-header, [data-playground-app-bar] { position: static !important; visibility: hidden; }" });
});

test("Toggle recipes and state", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-variants"), "variants-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-tones"), "tones-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-recipes"), "recipes-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-sizes"), "sizes-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-shapes-icons"), "shapes-icons-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("toggle-composition"),
    "composition-output-light.png",
  );
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-disabled"), "disabled-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-toggle-appearance"), "appearance-customization-light.png", { maxDiffPixelRatio: 0 });
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-tones"), "tones-dark.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-overview"), "overview-dark.png", { maxDiffPixelRatio: 0 });
});

test("Toggle constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-stress"), "stress-mobile.png", { maxDiffPixelRatio: 0 });
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-variants"), "variants-forced-colors.png", { maxDiffPixelRatio: 0 });
});
