import { expect, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";

installVisualDefaults("/segment-group");

test("Segment Group default, sizes, and appearances", async ({ page }) => {
  await expect(page.getByTestId("segment-group-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("segment-group-sizes")).toHaveScreenshot("sizes-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("segment-group-appearance")).toHaveScreenshot("appearance-dark.png");
});
