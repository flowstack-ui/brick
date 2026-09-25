import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/for?qualification=1");
test("collection output", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("for-output"), "collection-light.png");
});
