import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/badge");
});

test("Badge workbench exposes passive defaults and the complete recipe matrix", async ({ page }) => {
  await expect(page.getByTestId("badge-workbench")).toBeVisible();
  const published = page.getByText("Published", { exact: true });
  await expect(published).toHaveAttribute("data-slot", "badge");
  await expect(published).toHaveAttribute("data-variant", "soft");
  await expect(published).toHaveAttribute("data-tone", "success");
  await expect(published).not.toHaveAttribute("role");
  await expect(published).not.toHaveAttribute("aria-live");
  await expect(page.getByTestId("badge-recipes").locator(".brick-badge")).toHaveCount(18);
});

test("sizes, shapes, and passive tag routing remain visually distinct", async ({ page }) => {
  const region = page.getByTestId("badge-sizes-shapes");
  const heights = await region.locator(".brick-badge[data-shape='rounded']").evaluateAll((elements) =>
    elements.slice(0, 3).map((element) => element.getBoundingClientRect().height),
  );
  expect(heights[0]).toBeLessThan(heights[1]);
  expect(heights[1]).toBeLessThan(heights[2]);
  await expect(region.getByText("TypeScript")).toHaveAttribute("data-shape", "pill");
  await expect(region.getByRole("button", { name: "Clear filters" })).toBeVisible();
});

test("NotificationBadge formats counts and hides its indicator from assistive technology", async ({ page }) => {
  const button = page.getByRole("button", { name: "Inbox, 12 unread messages" });
  const wrapper = button.locator("..");
  const indicator = wrapper.locator("[data-slot='notification-badge-indicator']");
  await expect(indicator).toHaveText("12");
  await expect(indicator).toHaveAttribute("aria-hidden", "true");
  await expect(indicator).toHaveAttribute("data-shape", "pill");

  const overflow = page.getByRole("button", { name: "Inbox, 125 unread messages" }).locator("..").locator("[data-slot='notification-badge-indicator']");
  await expect(overflow).toHaveText("99+");
  await expect(page.getByRole("button", { name: "Tasks, no tasks ready" }).locator("..").locator("[data-slot='notification-badge-indicator']")).toHaveText("0");
  await expect(page.getByRole("img", { name: "Ada Lovelace, online" }).locator("..").locator("[data-variant='dot']")).toBeVisible();
});

test("notification anchors keep focus, target size, and pointer ownership", async ({ page }) => {
  const button = page.getByRole("button", { name: "Inbox, 1 unread messages" });
  await button.focus();
  await expect(button).toBeFocused();
  const evidence = await button.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const indicator = element.parentElement?.querySelector("[data-slot='notification-badge-indicator']");
    return {
      height: box.height,
      width: box.width,
      outlineWidth: Number.parseFloat(getComputedStyle(element).outlineWidth),
      pointerEvents: indicator ? getComputedStyle(indicator).pointerEvents : null,
    };
  });
  expect(evidence.height).toBeGreaterThanOrEqual(44);
  expect(evidence.width).toBeGreaterThanOrEqual(44);
  expect(evidence.outlineWidth).toBeGreaterThanOrEqual(2);
  expect(evidence.pointerEvents).toBe("none");
  await button.evaluate((element) => {
    element.addEventListener("click", () => { element.dataset.clicked = ""; }, { once: true });
  });
  await button.click();
  await expect(button).toHaveAttribute("data-clicked", "");
});

test("logical top-start placement mirrors in RTL", async ({ page }) => {
  const placements = page.getByTestId("notification-placements");
  const ltrWrapper = placements.getByRole("button", { name: "top-start, 4 notifications" }).locator("..");
  const rtlWrapper = placements.getByRole("button", { name: "صندوق الوارد، 3 رسائل" }).locator("..");
  const [ltr, rtl] = await Promise.all([
    ltrWrapper.evaluate((wrapper) => {
      const root = wrapper.getBoundingClientRect();
      const indicator = wrapper.querySelector("[data-slot='notification-badge-indicator']")!.getBoundingClientRect();
      return indicator.x + indicator.width / 2 < root.x + root.width / 2;
    }),
    rtlWrapper.evaluate((wrapper) => {
      const root = wrapper.getBoundingClientRect();
      const indicator = wrapper.querySelector("[data-slot='notification-badge-indicator']")!.getBoundingClientRect();
      return indicator.x + indicator.width / 2 > root.x + root.width / 2;
    }),
  ]);
  expect(ltr).toBe(true);
  expect(rtl).toBe(true);
});

test("Badge stress content reflows without page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const stress = page.getByTestId("badge-stress");
  await expect(stress).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  for (const badge of await stress.locator(".brick-badge").all()) {
    const box = await badge.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320.5);
  }
});

test("Badge family canonical route has no automated accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("Badge family retains visible boundaries in forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");
  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const badge = page.getByText("Published", { exact: true });
  const indicator = page.getByRole("button", { name: "Inbox, 1 unread messages" }).locator("..").locator("[data-slot='notification-badge-indicator']");
  for (const item of [badge, indicator]) {
    const borderWidth = await item.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopWidth));
    expect(borderWidth).toBeGreaterThanOrEqual(1);
  }
});
