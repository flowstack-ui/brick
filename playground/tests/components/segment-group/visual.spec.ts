import {
  expect,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/segment-group");

test("Segment Group default, sizes, and appearances", async ({ page }) => {
  await expect(page.getByTestId("segment-group-overview")).toHaveScreenshot(
    "overview-light.png",
  );
  await expect(page.getByTestId("segment-group-sizes")).toHaveScreenshot(
    "sizes-light.png",
  );
  await expect(page.getByTestId("segment-group-layout")).toHaveScreenshot(
    "layout-light.png",
  );
  await setAppearance(page, "dark");
  await expect(page.getByTestId("segment-group-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
});

test("Segment Group states and responsive boundaries", async ({ page }) => {
  await useForcedColors(page);
  await expect(page.getByTestId("segment-group-states")).toHaveScreenshot(
    "states-forced-colors.png",
  );
  await page.emulateMedia({ forcedColors: "none", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("segment-group-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
});
