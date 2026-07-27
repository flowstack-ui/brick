import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/progress"); });

test("defaults, states, tones, sizes, shapes, and buffer are complete", async ({ page }) => {
  const root = page.getByTestId("progress-overview").getByRole("progressbar", { name: "Upload files" });
  await expect(root).toHaveAttribute("data-state", "indeterminate");
  await expect(root).toHaveAttribute("data-orientation", "horizontal");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await expect(root).toHaveAttribute("data-tone", "accent");
  await expect(root).not.toHaveAttribute("aria-valuenow");
  for (const tone of ["neutral", "accent", "info", "success", "warning", "danger"]) await expect(page.getByTestId("progress-tones").locator(`.brick-progress[data-tone='${tone}']`)).toHaveCount(1);
  for (const size of ["xs", "sm", "md", "lg", "xl"]) await expect(page.getByTestId("progress-sizes").locator(`.brick-progress[data-size='${size}']`)).toHaveCount(1);
  for (const shape of ["square", "rounded", "pill"]) await expect(page.getByTestId("progress-shapes").locator(`.brick-progress[data-shape='${shape}']`)).toHaveCount(1);
  const buffer = page.getByTestId("progress-buffer").locator(".brick-progress__buffer");
  await expect(buffer).toHaveAttribute("data-present", "");
  expect(await buffer.evaluate((element) => (element as HTMLElement).style.getPropertyValue("--brick-progress-buffer-percent"))).toBe("82");
});

test("horizontal RTL and vertical progress fill from logical starts", async ({ page }) => {
  const stress = page.getByTestId("progress-stress");
  const rtl = stress.getByRole("progressbar", { name: "تحميل الملفات" });
  const rtlTrack = rtl.locator(".brick-progress__track");
  const rtlIndicator = rtl.locator(".brick-progress__indicator");
  const [trackBox, indicatorBox] = await Promise.all([rtlTrack.boundingBox(), rtlIndicator.boundingBox()]);
  expect(trackBox).not.toBeNull(); expect(indicatorBox).not.toBeNull();
  expect(Math.abs((trackBox!.x + trackBox!.width) - (indicatorBox!.x + indicatorBox!.width))).toBeLessThanOrEqual(1);
  const vertical = stress.getByRole("progressbar", { name: "مزامنة البيانات" });
  const verticalTrack = vertical.locator(".brick-progress__track");
  const verticalIndicator = vertical.locator(".brick-progress__indicator");
  const [verticalTrackBox, verticalIndicatorBox] = await Promise.all([verticalTrack.boundingBox(), verticalIndicator.boundingBox()]);
  expect(Math.abs((verticalTrackBox!.y + verticalTrackBox!.height) - (verticalIndicatorBox!.y + verticalIndicatorBox!.height))).toBeLessThanOrEqual(1);
});

test("naming output, reduced motion, narrow containment, and accessibility are correct", async ({ page }) => {
  const labelled = page.getByTestId("progress-output").getByRole("progressbar", { name: "Upload files" });
  const labelledBy = await labelled.getAttribute("aria-labelledby");
  expect(labelledBy).toBeTruthy();
  await expect(page.locator(`[id='${labelledBy}']`)).toHaveText("Upload files");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByTestId("progress-overview").locator(".brick-progress__indicator")).toHaveCSS("animation-name", "none");
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await page.getByTestId("progress-stress").boundingBox())!.width).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
