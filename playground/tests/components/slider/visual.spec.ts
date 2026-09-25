import {
  expect,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";
installVisualDefaults("/slider");
test("Slider anatomy, recipes, states, direction, and theme", async ({
  page,
}) => {
  for (const id of [
    "slider-overview",
    "slider-values",
    "slider-recipes",
    "slider-states",
    "slider-direction",
    "slider-content",
  ])
    await expect(page.getByTestId(id)).toHaveScreenshot(
      `${id.replace("slider-", "")}-light.png`,
    );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("slider-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
  await expect(page.getByTestId("slider-customization")).toHaveScreenshot(
    "customization-dark.png",
  );
});
test("Slider mobile and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("slider-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("slider-states")).toHaveScreenshot(
    "states-forced-colors.png",
  );
});
test("Slider modern recipes, anatomy, and responsive layout", async ({
  page,
}) => {
  await page.goto("/slider?testMode=0");
  await expect(page.locator("#variants")).toHaveScreenshot(
    "documentation-variants-light.png",
  );
  await expect(page.locator("#tones")).toHaveScreenshot(
    "documentation-tones-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.locator("#vertical")).toHaveScreenshot(
    "documentation-vertical-dark.png",
  );
  const indicators = page.locator("#indicators");
  const indicatorThumb = indicators.getByRole("slider").first();
  const indicatorControl = indicators.locator(".brick-slider__control").first();
  const [indicatorThumbBox, indicatorControlBox] = await Promise.all([
    indicatorThumb.boundingBox(),
    indicatorControl.boundingBox(),
  ]);
  await page.mouse.move(
    indicatorThumbBox!.x + indicatorThumbBox!.width / 2,
    indicatorThumbBox!.y + indicatorThumbBox!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    indicatorControlBox!.x + indicatorControlBox!.width * 0.7,
    indicatorControlBox!.y + indicatorControlBox!.height / 2,
  );
  await expect(indicators).toHaveScreenshot(
    "documentation-indicators-dark.png",
  );
  await page.mouse.up();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#responsive")).toHaveScreenshot(
    "documentation-responsive-narrow-dark.png",
  );
});
