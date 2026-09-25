import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/action-bar?qualification=1");
for (const appearance of ["light", "dark"] as const) {
  test(`ActionBar ${appearance}`, async ({ page }) => {
    await setAppearance(page, appearance);
    await page.getByRole("button", {name:"Open basic", exact:true}).click();
    await expectEvidenceScreenshot(page, page.getByRole("dialog", {name:"File actions basic"}), `action-bar-${appearance}.png`);
  });
}
