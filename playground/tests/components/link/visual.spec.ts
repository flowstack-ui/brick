import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/link");

test("Link defaults and complete visual dimensions", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("link-overview"), "overview-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("link-variants"), "variants-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("link-tones"), "tones-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("link-sizes"), "sizes-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.getByTestId("link-content"), "content-light.png", { maxDiffPixelRatio: 0 });
  const renderedOutput = page.getByTestId("link-composition").locator("[data-rendered-output]");
  await expect(renderedOutput).toHaveCount(2);
  await expect(renderedOutput.nth(0)).not.toHaveText("");
  await expect(renderedOutput.nth(1)).not.toHaveText("");
  await expectEvidenceScreenshot(page, page.getByTestId("link-composition"), "composition-light.png", { maxDiffPixelRatio: 0 });
});

test("Link appearance, mobile RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("link-appearance"), "appearance-dark.png", { maxDiffPixelRatio: 0 });
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("link-stress"), "stress-mobile.png", { maxDiffPixelRatio: 0 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("link-variants"), "variants-forced-colors.png", { maxDiffPixelRatio: 0 });
});
