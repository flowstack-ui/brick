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
  const avatarWrapper = page.getByRole("img", { name: "Ada Lovelace, online" }).locator("..");
  await expect(avatarWrapper).toHaveAttribute("data-overlap", "circular");
  const avatarDot = avatarWrapper.locator("[data-variant='dot']");
  await expect(avatarDot).toBeVisible();
  const circularPosition = await avatarWrapper.evaluate((wrapper) => {
    const root = wrapper.getBoundingClientRect();
    const indicator = wrapper.querySelector("[data-slot='notification-badge-indicator']")!.getBoundingClientRect();
    return {
      inlineCenter: (indicator.x + indicator.width / 2 - root.x) / root.width,
      blockCenter: (indicator.y + indicator.height / 2 - root.y) / root.height,
    };
  });
  expect(circularPosition.inlineCenter).toBeCloseTo(0.8536, 2);
  expect(circularPosition.blockCenter).toBeCloseTo(0.1464, 2);
});

test("notification anchors keep focus, target size, and pointer ownership", async ({ page }) => {
  const button = page.getByRole("button", { name: "Inbox, 1 unread messages" });
  const activation = page.getByTestId("notification-counts").locator(".notification-activation");
  await expect(activation).not.toHaveAttribute("role");
  await expect(activation).not.toHaveAttribute("aria-live");
  await expect(activation.locator("output")).toHaveCount(0);
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

test("all logical placements mirror between LTR and RTL", async ({ page }) => {
  const placements = page.getByTestId("notification-placements");
  for (const placement of ["top-start", "top-end", "bottom-start", "bottom-end"]) {
    const ltrWrapper = placements.getByRole("button", { name: `LTR ${placement}, 4 notifications` }).locator("..");
    const rtlWrapper = placements.getByRole("button", { name: `RTL ${placement}, 3 notifications` }).locator("..");
    const [ltr, rtl] = await Promise.all([ltrWrapper, rtlWrapper].map((wrapper) => wrapper.evaluate((root) => {
      const rootBox = root.getBoundingClientRect();
      const indicator = root.querySelector("[data-slot='notification-badge-indicator']")!.getBoundingClientRect();
      return {
        inline: (indicator.x + indicator.width / 2 - rootBox.x) / rootBox.width,
        block: (indicator.y + indicator.height / 2 - rootBox.y) / rootBox.height,
      };
    })));
    expect(rtl.inline).toBeCloseTo(1 - ltr.inline, 2);
    expect(rtl.block).toBeCloseTo(ltr.block, 2);
  }
  await expect(placements.locator(".badge-icon-button")).toHaveCount(8);
  await expect(placements.locator(".badge-avatar")).toHaveCount(1);
});

test("Badge stress content reflows without page overflow", async ({ page }) => {
  for (const width of [320, 256]) {
    await page.setViewportSize({ width, height: 720 });
    const stress = page.getByTestId("badge-stress");
    await expect(stress).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    for (const badge of await stress.locator(".brick-badge").all()) {
      const evidence = await badge.evaluate((element) => {
        const box = element.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(element);
        const content = range.getBoundingClientRect();
        return { box: { left: box.left, right: box.right }, content: { left: content.left, right: content.right } };
      });
      expect(evidence.box.left).toBeGreaterThanOrEqual(0);
      expect(evidence.box.right).toBeLessThanOrEqual(width + 0.5);
      expect(evidence.content.left).toBeGreaterThanOrEqual(evidence.box.left - 0.5);
      expect(evidence.content.right).toBeLessThanOrEqual(evidence.box.right + 0.5);
    }
  }
});

test("recipe badges retain intrinsic height when the matrix reflows", async ({ page }) => {
  for (const width of [1280, 720, 480]) {
    await page.setViewportSize({ width, height: 900 });
    const heights = await page.getByTestId("badge-recipes").locator(".brick-badge").evaluateAll((badges) =>
      badges.map((badge) => badge.getBoundingClientRect().height),
    );
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(0.5);
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
