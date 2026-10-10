import { expect, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/z-stack?qualification=1");

test("ZStack overview and placement", async ({ page }) => {
  await expect(page.getByTestId("z-stack-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("z-stack-placement")).toHaveScreenshot("placement-light.png");
});
