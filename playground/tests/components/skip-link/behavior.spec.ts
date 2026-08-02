import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("released Atom behavior provides first focus, target focus, scroll, and continuation", async ({ browserName, page }) => {
  await page.goto("/skip-link/fixture");
  const root = page.getByRole("link", { name: "Skip fixture navigation" });
  const target = page.getByRole("main");
  const forwardTab = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";

  const hiddenBox = await root.boundingBox();
  expect(hiddenBox).not.toBeNull();
  expect(hiddenBox!.y + hiddenBox!.height).toBeLessThanOrEqual(0);

  await page.keyboard.press(forwardTab);
  await expect(root).toBeFocused();
  await expect(root).toBeVisible();
  const focusedBox = await root.boundingBox();
  expect(focusedBox).not.toBeNull();
  expect(focusedBox!.x).toBeGreaterThanOrEqual(0);
  expect(focusedBox!.y).toBeGreaterThanOrEqual(0);

  await page.keyboard.press("Enter");
  await expect(target).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.keyboard.press(forwardTab);
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

test("appearance and customization evidence preserve spacing, compact badges, and a divided preview", async ({ page }) => {
  const appearanceSurfaces = page.getByTestId("skip-link-appearance").locator(".skip-link-appearance-surface");
  await expect(appearanceSurfaces).toHaveCount(2);

  for (const surface of await appearanceSurfaces.all()) {
    const geometry = await surface.evaluate((node) => {
      const badge = node.querySelector<HTMLElement>(".brick-badge")!;
      const button = node.querySelector<HTMLElement>(".brick-button")!;
      const surfaceBox = node.getBoundingClientRect();
      const badgeBox = badge.getBoundingClientRect();
      const buttonBox = button.getBoundingClientRect();
      return {
        display: getComputedStyle(node).display,
        gap: parseFloat(getComputedStyle(node).rowGap),
        surfaceWidth: surfaceBox.width,
        badgeWidth: badgeBox.width,
        separated: buttonBox.top > badgeBox.bottom,
      };
    });
    expect(geometry.display).toBe("grid");
    expect(geometry.gap).toBeGreaterThanOrEqual(16);
    expect(geometry.badgeWidth).toBeLessThan(geometry.surfaceWidth / 2);
    expect(geometry.separated).toBe(true);
  }

  const customization = page.getByTestId("skip-link-customization");
  const layout = customization.locator(".skip-link-customization__layout");
  await expect(layout.locator(":scope > *")).toHaveCount(2);
  await expect(layout.locator(".skip-link-customization__preview").getByRole("button", { name: "Focus customized link" })).toBeVisible();
  const divider = await layout.evaluate((node) => ({
    gap: parseFloat(getComputedStyle(node).gap),
    overflow: getComputedStyle(node.parentElement!).overflow,
  }));
  expect(divider.gap).toBeGreaterThan(0);
  expect(divider.gap).toBeLessThanOrEqual(2);
  expect(divider.overflow).toBe("clip");

  const cards = await appearanceSurfaces.evaluateAll((nodes) => nodes.map((node) => {
    const box = node.getBoundingClientRect();
    return { left: box.left, top: box.top };
  }));
  if (await page.evaluate(() => innerWidth <= 704)) {
    expect(cards[1]!.top).toBeGreaterThan(cards[0]!.top);
  } else {
    expect(cards[1]!.left).toBeGreaterThan(cards[0]!.left);
  }
});

test("scenario rhythm, comparison grids, and stress surfaces use the page evidence standard", async ({ page }) => {
  const scenarioGeometry = await page.locator(".skip-link-page > .scenario").evaluateAll((nodes) => nodes.slice(0, 3).map((node) => {
    const box = node.getBoundingClientRect();
    return { bottom: box.bottom, top: box.top };
  }));
  expect(scenarioGeometry[1]!.top - scenarioGeometry[0]!.bottom).toBeGreaterThanOrEqual(32);
  expect(scenarioGeometry[2]!.top - scenarioGeometry[1]!.bottom).toBeGreaterThanOrEqual(32);

  const overview = page.getByTestId("skip-link-overview");
  const overviewWidths = await overview.evaluate((node) => {
    const badge = node.querySelector<HTMLElement>(".brick-badge")!.getBoundingClientRect();
    return { badge: badge.width, surface: node.getBoundingClientRect().width };
  });
  expect(overviewWidths.badge).toBeLessThan(overviewWidths.surface / 2);

  for (const grid of [
    page.getByTestId("skip-link-native"),
    page.locator("#scenario-skip-link-composition .skip-link-grid"),
    page.getByTestId("skip-link-stress"),
  ]) {
    expect(parseFloat(await grid.evaluate((node) => getComputedStyle(node).gap))).toBeGreaterThanOrEqual(16);
  }

  for (const card of await page.locator("#scenario-skip-link-native .skip-link-cell, #scenario-skip-link-composition .skip-link-cell").all()) {
    expect(parseFloat(await card.evaluate((node) => getComputedStyle(node).gap))).toBeGreaterThanOrEqual(16);
  }

  const stressPanels = page.getByTestId("skip-link-stress").locator(".skip-link-stress-panel");
  await expect(stressPanels).toHaveCount(2);
  for (const panel of await stressPanels.all()) {
    const styles = await panel.evaluate((node) => ({
      badgeWidth: node.querySelector<HTMLElement>(".brick-badge")!.getBoundingClientRect().width,
      gap: parseFloat(getComputedStyle(node).gap),
      surfaceWidth: node.getBoundingClientRect().width,
    }));
    expect(styles.gap).toBeGreaterThanOrEqual(16);
    expect(styles.badgeWidth).toBeLessThan(styles.surfaceWidth / 2);
  }
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
