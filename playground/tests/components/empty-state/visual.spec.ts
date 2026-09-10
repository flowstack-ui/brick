import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/empty-state");
test("empty state appearance recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="empty-state.appearance"]'), "appearances.png");
});
