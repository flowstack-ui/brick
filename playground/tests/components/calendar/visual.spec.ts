import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/calendar?qualification=1");
for (const appearance of ["light", "dark"] as const) {
  test("Calendar " + appearance, async ({ page }) => {
    await setAppearance(page, appearance);
    await expectEvidenceScreenshot(page, page.getByTestId("calendar-comfortable"), "calendar-" + appearance + ".png");
  });
  test("Calendar booking and weeks " + appearance, async ({ page }) => {
    await page.goto("/calendar?testMode=1&exampleDirection=ltr");
    await setAppearance(page, appearance);
    await expectEvidenceScreenshot(page, page.locator("#numberedweeks"), "calendar-weeks-" + appearance + ".png");
    await expectEvidenceScreenshot(page, page.locator("#booking"), "calendar-booking-empty-" + appearance + ".png");
    await page.locator('#booking button[data-value="2026-09-21"]').click();
    await expectEvidenceScreenshot(page, page.locator("#booking"), "calendar-booking-selected-" + appearance + ".png");
  });
}
