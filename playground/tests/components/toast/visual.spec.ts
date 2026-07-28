import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/toast");

test.beforeEach(async ({ page }) => {
  await page.addStyleTag({
    content: ".evidence-review-header { visibility: hidden !important; }",
  });
});

test("Toast types, content, queue, positions, and appearances", async ({ page }) => {
  const overview = page.getByTestId("toast-overview");
  const types = page.getByTestId("toast-types");
  const content = page.getByTestId("toast-content");
  const queue = page.getByTestId("toast-queue");
  const positions = page.getByTestId("toast-positions");
  const customization = page.getByTestId("toast-customization");
  await expectEvidenceScreenshot(page, overview, "overview-light.png");
  await expectEvidenceScreenshot(page, types, "types-light.png");
  await expectEvidenceScreenshot(page, content, "content-light.png");
  await expectEvidenceScreenshot(page, queue, "queue-light.png");
  await expectEvidenceScreenshot(page, positions, "positions-light.png");
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, customization, "appearance-dark.png");
});

test("Toast mobile, reduced motion, and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("toast-stress");
  const asyncExamples = page.getByTestId("toast-async");
  const types = page.getByTestId("toast-types");
  await expectEvidenceScreenshot(page, stress, "stress-mobile.png");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expectEvidenceScreenshot(page, asyncExamples, "loading-reduced-motion.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, types, "types-forced-colors.png");
});

test("Toast overlap is compact at rest and stable when expanded", async ({ page }) => {
  await page.getByRole("button", { name: "Create overlap queue" }).click();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport.locator(".brick-toast[data-state='visible']")).toHaveCount(3);
  await expect(viewport).toHaveScreenshot("overlap-collapsed.png");

  await viewport.hover();
  await expect(viewport).toHaveAttribute("data-expanded", "");
  await expect(viewport).toHaveScreenshot("overlap-expanded.png");
});

test("Toast short content, icon alignment, close containment, and RTL placement", async ({ page }) => {
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });

  await page.getByRole("button", { name: "Show title only" }).click();
  await expect(viewport).toHaveScreenshot("active-title-only.png");

  await page.getByRole("button", { name: "Show description only" }).click();
  await expect(viewport).toHaveScreenshot("active-description-only.png");

  await page.getByRole("button", { name: "Show custom icon" }).click();
  await expect(viewport).toHaveScreenshot("active-custom-icon.png");

  await page.getByRole("button", { name: "Show Arabic stress toast" }).click();
  await expect(viewport).toHaveScreenshot("active-rtl.png");
});
