import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/timeline?qualification=1");
test.use({ viewport: { width: 1120, height: 1500 } });
test("Timeline geometry and appearance", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1500 });
  for (const id of [
    "basic",
    "sizes",
    "recipes",
    "alternating",
    "indicators",
    "appearance",
  ])
    await expectEvidenceScreenshot(
      page,
      page.locator(`#scenario-timeline-${id}`),
      `${id}.png`,
    );
});
test("Timeline refined docs recipes and compact layout", async ({ page }) => {
  await page.goto("/timeline?appearance=light");
  for (const id of ["dates", "variants", "customization"])
    await expectEvidenceScreenshot(
      page,
      page.locator(`#${id}`),
      `docs-${id}.png`,
    );
  await page.goto("/timeline?appearance=dark&exampleDirection=rtl");
  await page.setViewportSize({ width: 390, height: 900 });
  await expectEvidenceScreenshot(
    page,
    page.locator("#dates"),
    "docs-dates-dark-rtl-narrow.png",
  );
});
