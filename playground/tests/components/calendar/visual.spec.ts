import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/calendar");
for (const appearance of ["light", "dark"] as const) {
  test("Calendar " + appearance, async ({ page }) => {
    await setAppearance(page, appearance);
    await expectEvidenceScreenshot(page, page.getByTestId("calendar-comfortable"), "calendar-" + appearance + ".png");
  });
}
