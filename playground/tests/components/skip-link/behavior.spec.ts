import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("released Atom behavior provides first focus, target focus, scroll, and continuation", async ({ page }) => {
  await page.goto("/skip-link/fixture");
  const root = page.getByRole("link", { name: "Skip fixture navigation" });
  const target = page.getByRole("main");

  const hiddenBox = await root.boundingBox();
  expect(hiddenBox).not.toBeNull();
  expect(hiddenBox!.y + hiddenBox!.height).toBeLessThanOrEqual(0);

  await page.keyboard.press("Tab");
  await expect(root).toBeFocused();
  await expect(root).toBeVisible();
  const focusedBox = await root.boundingBox();
  expect(focusedBox).not.toBeNull();
  expect(focusedBox!.x).toBeGreaterThanOrEqual(0);
  expect(focusedBox!.y).toBeGreaterThanOrEqual(0);

  await page.keyboard.press("Enter");
  await expect(target).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "First main-content link" })).toBeFocused();
});

test.beforeEach(async ({ page }) => {
  await page.goto("/skip-link");
});

test("focus reveal is immediate, contained, and above sticky chrome", async ({ page }) => {
  const root = page.getByRole("link", { name: "Skip Brick playground navigation" });
  await root.focus();
  await expect(root).toBeFocused();
  await expect(root).toHaveCSS("position", "fixed");
  await expect(root).toHaveCSS("transform", "none");
  await expect(root).toHaveCSS("text-decoration-line", "none");
  const geometry = await root.evaluate((node) => {
    const box = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    const sticky = document.querySelector<HTMLElement>(".skip-link-shell-stage__bar");
    return {
      left: box.left,
      right: box.right,
      top: box.top,
      zIndex: Number(style.zIndex),
      stickyZIndex: Number(sticky ? getComputedStyle(sticky).zIndex : 0),
    };
  });
  expect(geometry.left).toBeGreaterThanOrEqual(0);
  expect(geometry.right).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
  expect(geometry.top).toBeGreaterThanOrEqual(0);
  expect(geometry.zIndex).toBeGreaterThan(geometry.stickyZIndex);
});

test("prevented, native-only, and missing-target paths stay distinct", async ({ page }) => {
  const prevented = page.getByRole("link", { name: "Skip prevented example" });
  const preventedTarget = page.locator("#prevented-target");
  await prevented.focus();
  await page.keyboard.press("Enter");
  await expect(prevented).toBeFocused();
  await expect(page.getByTestId("skip-link-native-status")).toHaveText("Consumer prevented focus transfer.");
  await expect(preventedTarget).not.toBeFocused();

  const nativeOnly = page.getByRole("link", { name: "Use native fragment navigation" });
  await nativeOnly.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#native-target$/);

  const missing = page.getByRole("link", { name: "Skip to missing destination" });
  await missing.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#missing-skip-destination$/);
});

test("custom IDs, composition, slots, and refs remain observable", async ({ page }) => {
  const root = page.getByRole("link", { name: "Skip child navigation" });
  await expect(root).toHaveAttribute("href", "#child-target");
  await expect(root).toHaveAttribute("data-slot", "custom-skip-root");
  await expect(root).toHaveClass(/brick-skip-link/);
  await page.getByRole("button", { name: "Inspect and focus ref" }).click();
  await expect(root).toBeFocused();
  await expect(page.getByTestId("skip-link-ref-status")).toHaveText("Ref host: A");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Child target" })).toBeFocused();
});

test("long localized labels, RTL logical placement, zoom, and axe remain sound", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const rtl = page.getByRole("link", { name: "تخطى أدوات التنقل وانتقل إلى المحتوى الرئيسي" });
  await rtl.focus();
  const box = await rtl.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(390 - (box!.x + box!.width)).toBeGreaterThanOrEqual(8);
  expect(390 - (box!.x + box!.width)).toBeLessThanOrEqual(16);
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);

  await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  const zoomed = await rtl.boundingBox();
  expect(zoomed).not.toBeNull();
  expect(zoomed!.x + zoomed!.width).toBeLessThanOrEqual(390);
  await page.evaluate(() => { document.documentElement.style.zoom = ""; });

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
