import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/button");

test("Button recipes and high-risk states", async ({ page }) => {
  await expect(page.getByTestId("button-variants")).toHaveScreenshot(
    "variants-light.png",
  );
  await expect(page.getByTestId("button-states")).toHaveScreenshot(
    "states-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("button-composition"),
    "composition-output-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("button-tones")).toHaveScreenshot(
    "tones-dark.png",
  );
  await expect(page.getByTestId("button-sizes")).toHaveScreenshot(
    "sizes-dark.png",
  );
  await expect(page.locator("#scenario-button-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
});

test("Button constrained, RTL, and forced-color evidence", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("button-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("button-states")).toHaveScreenshot(
    "states-forced-colors.png",
  );
});
