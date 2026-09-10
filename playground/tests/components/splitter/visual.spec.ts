import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/splitter");
test("Splitter light boundary", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("splitter-workspace"), "splitter-light.png");
});
test("Splitter dark boundary", async ({ page }) => {
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.getByTestId("splitter-workspace"), "splitter-dark.png");
});
