import { expect, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/native-select?qualification=1");
test("NativeSelect recipes and environments", async ({ page }) => {
  for (const id of ["basic", "sizes", "variants", "shapes", "controlled", "groups", "list", "states", "forms", "indicator", "responsive", "appearance"]) {
    await expect(page.locator(`#scenario-native-select-${id}`)).toHaveScreenshot(`${id}.png`, { maxDiffPixelRatio: 0 });
  }
});
