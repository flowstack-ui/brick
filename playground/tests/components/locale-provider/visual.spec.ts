import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/locale-provider");
test("locale output", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("locale-provider-output"), "output-light.png");
});
