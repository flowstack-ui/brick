import { expect, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/link-box");

test("Link Box destination and independent action", async ({ page }) => {
  await expect(page.getByTestId("link-box-destination")).toHaveScreenshot("destination-light.png");
  await expect(page.getByTestId("link-box-action")).toHaveScreenshot("action-light.png");
});
