import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/surface");

test("Surface defaults and complete visual dimensions", async ({ page }) => {
  await expect(page.locator(".surface-stage")).toHaveScreenshot(
    "overview-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-levels"),
    "levels-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-elevations"),
    "elevations-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-insets"),
    "insets-light.png",
  );
});

test("Surface appearance, customization, mobile, and forced colors", async ({
  page,
}) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-appearance"),
    "appearance-dark.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-customization"),
    "customization-dark.png",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-stress"),
    "stress-mobile.png",
  );

  await useForcedColors(page);
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-elevations"),
    "elevations-forced-colors.png",
  );
});

test("Surface optional media composition", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-scrim-comparison"),
    "scrim-strengths-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-layered"),
    "media-light.png",
  );

  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-scrim-comparison"),
    "scrim-strengths-dark.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("surface-layered"),
    "media-dark.png",
  );
});
