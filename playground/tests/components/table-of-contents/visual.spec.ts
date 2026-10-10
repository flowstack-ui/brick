import {
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
} from "../../visual-harness.js";
installVisualDefaults("/table-of-contents");
test("plain, line, dark and RTL navigation", async ({ page }) => {
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="table-of-contents.basic"]'),
    "plain-light.png",
    { maxDiffPixelRatio: 0 },
  );
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="table-of-contents.indicator"]'),
    "line-light.png",
    { maxDiffPixelRatio: 0 },
  );
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(
    page,
    page.locator('[data-scenario="table-of-contents.rtl"]'),
    "rtl-dark.png",
    { maxDiffPixelRatio: 0 },
  );
});
