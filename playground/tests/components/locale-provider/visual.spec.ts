import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/locale-provider?qualification=1");
test("locale output", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("locale-provider-output"), "output-light.png");
});
