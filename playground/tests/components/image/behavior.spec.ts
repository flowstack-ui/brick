import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/image");
  await page.locator("#scenario-image-overview img").waitFor();
});

test("Image defaults and authored accessibility output are deterministic", async ({ page }) => {
  const root = page.locator("#scenario-image-overview .brick-image");
  await expect(root).toHaveAttribute("data-state", "loaded");
  await expect(root).toHaveAttribute("data-fit", "cover");
  await expect(root).toHaveAttribute("data-position", "center");
  await expect(root).toHaveAttribute("data-radius", "none");
  await expect(root).toHaveAttribute("data-frame", "none");
  await expect(root.locator("img")).toHaveAttribute("alt", "Designers reviewing the workspace");
  await expect(page.locator("#scenario-image-accessibility img[alt='']")).toHaveCount(2);
});

test("Image fit, focal position, radius, frame, and ratio recipes are observable", async ({ page }) => {
  const fitValues = await page.locator("#scenario-image-fits .brick-image__content").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).objectFit));
  expect(fitValues).toEqual(["cover", "contain", "fill", "none", "scale-down"]);
  const positions = await page.locator("#scenario-image-positions .brick-image__content").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).objectPosition));
  expect(positions).toEqual(["50% 50%", "50% 0%", "50% 100%", "0% 50%", "100% 50%"]);
  await expect(page.locator("#scenario-image-geometry [data-radius='full']")).toHaveCSS("border-radius", /9999px|50%/);
  await expect(page.locator("#scenario-image-geometry [data-frame='subtle']")).not.toHaveCSS("border-color", "rgba(0, 0, 0, 0)");
  const ratio = page.locator("#scenario-image-fits .brick-image").first();
  expect(await ratio.evaluate((node) => Math.abs(node.getBoundingClientRect().width / node.getBoundingClientRect().height - 4 / 3))).toBeLessThan(0.02);
});

test("Image forwards native output and swaps broken and absent sources into the same box", async ({ page }) => {
  const nativeImage = page.locator("#scenario-image-native img").first();
  await expect(nativeImage).toHaveAttribute("width", "1200");
  await expect(nativeImage).toHaveAttribute("height", "675");
  await expect(nativeImage).toHaveAttribute("loading", "eager");
  await expect(nativeImage).toHaveAttribute("decoding", "async");
  await expect(nativeImage).toHaveAttribute("data-slot", "image-content");

  const fillFrame = page.getByTestId("image-fill-frame");
  const fillRoot = fillFrame.locator(".brick-image");
  const fillContent = fillRoot.locator(".brick-image__content");
  await expect(fillRoot).toHaveAttribute("data-fill", "");
  const [frameSize, rootSize, contentSize] = await Promise.all(
    [fillFrame, fillRoot, fillContent].map((locator) =>
      locator.evaluate((element) => ({
        height: element.getBoundingClientRect().height,
        width: element.getBoundingClientRect().width,
      })),
    ),
  );
  const rootContentSize = await fillRoot.evaluate((element) => ({
    height: element.clientHeight,
    width: element.clientWidth,
  }));
  expect(rootSize).toEqual(frameSize);
  expect(contentSize.height).toBeCloseTo(rootContentSize.height, 0);
  expect(contentSize.width).toBeCloseTo(rootContentSize.width, 0);

  const stateRoot = page.getByTestId("image-state");
  const loadedBox = await stateRoot.boundingBox();
  await page.getByRole("button", { name: "Broken" }).click();
  await expect(stateRoot).toHaveAttribute("data-state", "error");
  await expect(stateRoot.getByText("Image unavailable")).toBeVisible();
  const errorBox = await stateRoot.boundingBox();
  expect(Math.abs((loadedBox?.height ?? 0) - (errorBox?.height ?? 0))).toBeLessThan(1);
  await page.getByRole("button", { name: "Absent" }).click();
  await expect(stateRoot).toHaveAttribute("data-state", "idle");
  await expect(stateRoot.locator("img")).toHaveCount(0);
});

test("Image logical position mirrors in RTL and remains contained without serious accessibility violations", async ({ page }) => {
  const rtl = page.locator("#scenario-image-stress [dir=rtl] .brick-image__content");
  await expect(rtl).toHaveCSS("object-position", "100% 50%");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
