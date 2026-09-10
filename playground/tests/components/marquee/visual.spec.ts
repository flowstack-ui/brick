import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";
installVisualDefaults("/marquee");
test("Marquee stationary content and appearance", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of ["basic", "vertical", "cards", "preferences"]) {
    await expectEvidenceScreenshot(page, page.locator(`#scenario-marquee-${id}`), `${id}.png`);
  }
});
test("Marquee image artwork and narrow RTL preserve bounded originals", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator("#scenario-marquee-art"), "artwork.png");
  await page.getByRole("button", { name: "Load customer details", exact: true }).click();
  await expectEvidenceScreenshot(page, page.locator("#scenario-marquee-cards"), "cards-loaded.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.documentElement.dir = "rtl"; });
  await expectEvidenceScreenshot(page, page.locator("#scenario-marquee-basic"), "narrow-rtl.png");
});
