import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/notification-badge");
});

test("NotificationBadge overview exposes canonical defaults", async ({
  page,
}) => {
  await expect(page.getByTestId("notification-badge-workbench")).toBeVisible();
  const root = page
    .getByTestId("notification-badge-overview")
    .locator(".brick-notification-badge");
  await expect(root).toHaveAttribute("data-tone", "danger");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-placement", "top-end");
  await expect(root).toHaveAttribute("data-overlap", "rectangular");
  const indicator = root.locator("[data-slot='notification-badge-indicator']");
  await expect(indicator).toHaveText("4");
  await expect(indicator).toHaveAttribute("aria-hidden", "true");
  await expect(
    root.getByRole("button", { name: "Inbox, 4 unread messages" }),
  ).toBeVisible();
});

test("tones and sizes change only their named dimensions", async ({ page }) => {
  const tones = page
    .getByTestId("notification-badge-tones")
    .locator(".brick-notification-badge");
  await expect(tones).toHaveCount(6);
  await expect
    .poll(() =>
      tones.evaluateAll((items) =>
        items.map((item) => [
          item.getAttribute("data-tone"),
          item.getAttribute("data-size"),
          item.getAttribute("data-placement"),
          item.getAttribute("data-overlap"),
        ]),
      ),
    )
    .toEqual([
      ["neutral", "md", "top-end", "rectangular"],
      ["accent", "md", "top-end", "rectangular"],
      ["info", "md", "top-end", "rectangular"],
      ["success", "md", "top-end", "rectangular"],
      ["warning", "md", "top-end", "rectangular"],
      ["danger", "md", "top-end", "rectangular"],
    ]);

  const sizes = page
    .getByTestId("notification-badge-sizes")
    .locator("[data-slot='notification-badge-indicator']");
  const heights = await sizes.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().height),
  );
  expect(heights).toEqual([16, 20, 24]);
});

test("all logical placements occupy distinct corners", async ({ page }) => {
  const roots = page
    .getByTestId("notification-badge-placements")
    .locator(".brick-notification-badge");
  await expect(roots).toHaveCount(4);
  for (const placement of [
    "top-start",
    "top-end",
    "bottom-start",
    "bottom-end",
  ]) {
    await expect(roots.filter({ has: page.locator(`[data-placement="${placement}"]`) })).toHaveCount(0);
    await expect(
      page
        .getByTestId("notification-badge-placements")
        .locator(`[data-placement="${placement}"]`),
    ).toHaveCount(1);
  }
  const positions = await roots.evaluateAll((items) =>
    items.map((root) => {
      const host = root.getBoundingClientRect();
      const indicator = root
        .querySelector("[data-slot='notification-badge-indicator']")!
        .getBoundingClientRect();
      return {
        horizontal: indicator.x < host.x + host.width / 2 ? "start" : "end",
        vertical: indicator.y < host.y + host.height / 2 ? "top" : "bottom",
      };
    }),
  );
  expect(positions).toEqual([
    { horizontal: "start", vertical: "top" },
    { horizontal: "end", vertical: "top" },
    { horizontal: "start", vertical: "bottom" },
    { horizontal: "end", vertical: "bottom" },
  ]);
});

test("overlap models use matching rectangular and circular targets", async ({
  page,
}) => {
  const region = page.getByTestId("notification-badge-overlaps");
  const rectangular = region.locator("[data-overlap='rectangular']");
  const circular = region.locator("[data-overlap='circular']");
  await expect(rectangular.locator(".brick-icon-button")).toHaveCount(1);
  await expect(circular.locator(".brick-avatar")).toHaveCount(1);
  await expect(circular.locator("[data-variant='count']")).toHaveText("4");
});

test("count, dot, zero, overflow, and invisible states are deterministic", async ({
  page,
}) => {
  const region = page.getByTestId("notification-badge-states");
  await expect(region.locator("[data-variant='count']")).toHaveCount(3);
  await expect(region.locator("[data-variant='dot']")).toHaveCount(1);
  await expect(region.getByText("99+", { exact: true })).toHaveCount(1);
  await expect(region.getByText("0", { exact: true })).toHaveCount(1);
  await expect(
    region.locator(".brick-notification-badge[data-invisible]"),
  ).toHaveCount(2);
  await expect(
    region.locator(
      ".brick-notification-badge[data-invisible] [data-slot='notification-badge-indicator']",
    ),
  ).toHaveCount(0);
});

test("only the owning child is interactive", async ({ page }) => {
  const region = page.getByTestId("notification-badge-semantics");
  const root = region.locator(".brick-notification-badge");
  const button = root.getByRole("button", {
    name: "Inbox, 12 unread messages",
  });
  await button.focus();
  await expect(button).toBeFocused();
  await expect(root).not.toHaveAttribute("tabindex");
  const indicator = root.locator("[data-slot='notification-badge-indicator']");
  expect(await indicator.evaluate((element) => getComputedStyle(element).pointerEvents)).toBe(
    "none",
  );
});

test("appearance and customization preserve exact public hooks", async ({
  page,
}) => {
  await expect(
    page
      .getByTestId("notification-badge-appearance")
      .locator(".brick-notification-badge"),
  ).toHaveCount(2);
  const custom = page.locator("[data-slot='custom-notification']");
  await expect(custom).toHaveClass(/custom-notification/);
  const indicator = custom.locator("[data-slot='notification-badge-indicator']");
  const geometry = await indicator.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return { height: box.height, width: box.width };
  });
  expect(geometry.height).toBe(28);
  expect(geometry.width).toBeGreaterThanOrEqual(28);
});

test("RTL mirrors top-end and constrained content remains contained", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const rtl = page.getByTestId("notification-badge-stress").locator("[dir='rtl']");
  const root = rtl.locator(".brick-notification-badge");
  const host = await root.boundingBox();
  const indicator = await root
    .locator("[data-slot='notification-badge-indicator']")
    .boundingBox();
  expect(indicator!.x).toBeLessThan(host!.x + host!.width / 2);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test("NotificationBadge reference route has no automated accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
