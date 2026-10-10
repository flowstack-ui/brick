import { expectEvidenceScreenshot, installVisualDefaults, test } from "../../visual-harness.js";

installVisualDefaults("/swipeable-item?qualification=1");

test("Swipeable Item documentation composition and armed full swipe", async ({ page }) => {
  await page.goto('/swipeable-item?testMode=1&appearance=light');
  await expectEvidenceScreenshot(page, page.locator('#composition'), 'composition-light.png');
  const demo = page.locator('#fullswipe');
  const content = demo.locator('.brick-swipeable-item__content');
  await content.scrollIntoViewIfNeeded();
  const box = await content.boundingBox();
  if (!box) throw new Error('No full-swipe geometry');
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.1, box.y + box.height / 2, { steps: 8 });
  await expectEvidenceScreenshot(page, demo, 'fullswipe-armed-light.png');
  await page.mouse.up();
  await page.goto('/swipeable-item?testMode=1&appearance=dark');
  await expectEvidenceScreenshot(page, page.locator('#composition'), 'composition-dark.png');
});

test("Swipeable Item defaults, variants, actions, and controlled state", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("swipeable-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-variants"), "variants-light.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-sides"), "sides-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("swipeable-alternative"), "alternative-light.png");
  const controlled = page.locator("#scenario-swipeable-item-controlled");
  await controlled.getByRole("button", { name: "Open end" }).click();
  await expectEvidenceScreenshot(page, controlled, "controlled-end.png");
});

test("Swipeable Item appearance, customization, responsive RTL, and forced colors", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-appearance"), "appearance.png");
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-customized"), "customized.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-swipeable-item-stress"), "stress-mobile.png");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1120, height: 900 });
  await page.getByTestId("swipeable-overview-item").locator(".brick-swipeable-item__content").focus();
  await expectEvidenceScreenshot(page, page.getByTestId("swipeable-overview"), "overview-forced-colors.png");
});
