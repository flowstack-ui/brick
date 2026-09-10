import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/toggle-group");

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({ content: ".evidence-review-header, [data-playground-app-bar] { position: static !important; visibility: hidden; }" });
});

test("ToggleGroup formatting defaults in both appearances", async ({ page }) => {
  const group = page.getByRole("group", { name: "Text formatting", exact: true });
  await expectEvidenceScreenshot(page, group, "formatting-light.png", { maxDiffPixelRatio: 0 });
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, group, "formatting-dark.png", { maxDiffPixelRatio: 0 });
});

test("Toggle Group selection and recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-selection"), "selection-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-tones"), "tones-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-variants"), "variants-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-sizes"), "sizes-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-shapes"), "shapes-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-layout"), "layout-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-interaction"), "interaction-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-toggle-group-appearance"), "appearance-customization-light.png", { maxDiffPixelRatio: 0 });
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-tones"), "tones-dark.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-overview"), "overview-dark.png", { maxDiffPixelRatio: 0 });
});

test("Toggle Group constrained and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-stress"), "stress-mobile.png", { maxDiffPixelRatio: 0 });
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("toggle-group-variants"), "variants-forced-colors.png", { maxDiffPixelRatio: 0 });
});
