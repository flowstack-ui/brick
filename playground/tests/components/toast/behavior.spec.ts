import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/toast?qualification=1"); });

test("creates the finished card with one live announcement path and default policy", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Create success toast" });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(page.locator("[data-slot='toast-announcer-polite']")).toContainText("Workspace published");
  await expect(trigger).toBeFocused();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toHaveAttribute("data-position", "bottom-end");
  await expect(viewport).toHaveAttribute("data-width", "responsive");
  await expect(viewport).toHaveAttribute("data-stacking", "separated");
  const item = viewport.locator(".brick-toast");
  await expect(item).toHaveAttribute("data-type", "success");
  await expect(item).not.toHaveAttribute("role");
  await expect(item.getByText("Workspace published")).toBeVisible();
  await expect(item.getByRole("button", { name: "View" })).toBeVisible();
  await expect(item.getByRole("button", { name: "Dismiss notification" })).toBeVisible();
  await expect(page.locator("[data-slot='toast-announcer-polite']")).toHaveCount(1);
  await expect(page.locator("[data-slot='toast-announcer-assertive']")).toHaveCount(1);
});

test("supports F8, action/close focus, Escape dismissal, and focus restoration", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Create keyboard fixture" });
  await trigger.focus();
  await trigger.press("Enter");
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toBeVisible();
  await page.keyboard.press("F8");
  await expect(viewport).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(viewport.getByRole("button", { name: "Review" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(viewport.getByRole("button", { name: "Dismiss notification" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(viewport).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("queue, overlap, logical positions, mobile containment, and accessibility are complete", async ({ page }) => {
  // Fixed notifications and the sticky app bar can cover the auto-scroll center
  // on touch profiles. Place fixture controls in the clear strip, then retain
  // a real, actionable pointer click.
  const clickFixture = async (name: string) => {
    const button = page.getByRole("button", { name, exact: true });
    await button.evaluate(node => node.scrollIntoView({ block: "start" }));
    await page.evaluate(() => window.scrollBy(0, -(document.querySelector(".evidence-app-bar")!.getBoundingClientRect().height + 16)));
    await button.click();
  };
  await page.getByRole("button", { name: "Create four queued toasts" }).click();
  let viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport.locator(".brick-toast")).toHaveCount(3);
  await clickFixture("Create overlap queue");
  await expect(viewport).toHaveAttribute("data-stacking", "overlap");
  const overlapItems = viewport.locator(".brick-toast[data-state='visible']");
  await expect(overlapItems).toHaveCount(3);
  await page.waitForTimeout(250);
  const collapsedBoxes = await overlapItems.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().toJSON()),
  );
  const collapsedBottomValues = collapsedBoxes.map((box) => box.bottom);
  expect(
    Math.max(...collapsedBottomValues) - Math.min(...collapsedBottomValues),
  ).toBeLessThanOrEqual(16);
  const collapsedViewportBox = await viewport.boundingBox();
  expect(collapsedViewportBox).not.toBeNull();
  // The tallest back card must not enlarge the implicit grid row below the
  // explicitly sized viewport. Its newest card anchors at the viewport end.
  expect(Math.abs(collapsedBoxes[collapsedBoxes.length - 1]!.bottom - (collapsedViewportBox!.y + collapsedViewportBox!.height))).toBeLessThanOrEqual(1);
  const pageSize = page.viewportSize();
  expect(pageSize).not.toBeNull();
  collapsedBoxes.forEach((box) => {
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(pageSize!.width);
    expect(box.top).toBeGreaterThanOrEqual(0);
    expect(box.bottom).toBeLessThanOrEqual(pageSize!.height);
  });
  await viewport.hover();
  await expect(viewport).toHaveAttribute("data-expanded", "");
  await page.waitForTimeout(250);
  const expandedBoxes = await overlapItems.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().toJSON()),
  );
  const expandedTopValues = expandedBoxes.map((box) => box.top);
  expect(Math.max(...expandedTopValues) - Math.min(...expandedTopValues)).toBeGreaterThan(80);
  await page.waitForTimeout(250);
  const stableTopValues = await overlapItems.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().top),
  );
  stableTopValues.forEach((top, index) => {
    expect(Math.abs(top - expandedTopValues[index]!)).toBeLessThanOrEqual(1);
  });
  await clickFixture("Show top-start toast");
  viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toHaveAttribute("data-position", "top-start");
  await page.setViewportSize({ width: 320, height: 700 });
  const box = await viewport.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  await expect(
    viewport.locator(".brick-toast[data-state='visible']"),
  ).toHaveCSS("opacity", "1");
  expect((await new AxeBuilder({ page }).include(".brick-toast-viewport").analyze()).violations).toEqual([]);

  await page.setViewportSize({ width: 1120, height: 900 });
  await clickFixture("Show Arabic stress toast");
  viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toHaveAttribute("dir", "rtl");
  await expect(viewport).toHaveAttribute("data-position", "bottom-start");
  const rtlBox = await viewport.boundingBox();
  expect(rtlBox).not.toBeNull();
  expect(rtlBox!.x).toBeGreaterThan(700);
});

test("keeps compact text and top-aligned artwork within the toast row", async ({ page }) => {
  await page.getByRole("button", { name: "Show title only" }).click();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  const titleOnly = viewport.locator(".brick-toast[data-state='visible']");
  await expect(titleOnly).toHaveCount(1);
  await expect(titleOnly.locator(".brick-toast__description")).toHaveCount(0);
  await expect(titleOnly.locator(".brick-toast__icon")).toHaveCount(0);
  await expect(titleOnly).toHaveCSS("display", "flex");
  await page.waitForTimeout(250);
  const rootBox = await titleOnly.boundingBox();
  const titleBox = await titleOnly.locator(".brick-toast__title").boundingBox();
  const closeBox = await titleOnly.getByRole("button", { name: "Dismiss notification" }).boundingBox();
  expect(rootBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(closeBox).not.toBeNull();
  expect(rootBox!.height).toBeLessThanOrEqual(60);
  expect(closeBox!.x).toBeGreaterThan(rootBox!.x);
  expect(closeBox!.x + closeBox!.width).toBeLessThanOrEqual(rootBox!.x + rootBox!.width);
  const rootCenter = rootBox!.y + rootBox!.height / 2;
  expect(Math.abs(titleBox!.y + titleBox!.height / 2 - rootCenter)).toBeLessThanOrEqual(2);
  expect(closeBox!.y - rootBox!.y).toBeLessThanOrEqual(6);

  await page.getByRole("button", { name: "Show description only" }).click();
  const descriptionOnly = viewport.locator(".brick-toast[data-state='visible']");
  await expect(descriptionOnly.locator(".brick-toast__title")).toHaveCount(0);
  await expect(descriptionOnly.locator(".brick-toast__icon")).toHaveCount(0);
  await page.waitForTimeout(250);
  const descriptionRootBox = await descriptionOnly.boundingBox();
  const descriptionCloseBox = await descriptionOnly
    .getByRole("button", { name: "Dismiss notification" })
    .boundingBox();
  expect(descriptionRootBox).not.toBeNull();
  expect(descriptionCloseBox).not.toBeNull();
  expect(descriptionRootBox!.height).toBeLessThanOrEqual(60);
  expect(descriptionCloseBox!.x + descriptionCloseBox!.width).toBeLessThanOrEqual(
    descriptionRootBox!.x + descriptionRootBox!.width,
  );

  await page.getByRole("button", { name: "Show custom icon" }).click();
  const customToast = viewport
    .locator(".brick-toast[data-state='visible']")
    .filter({ hasText: "Custom icon" });
  await expect(customToast).toHaveCount(1);
  await expect(customToast.getByText("Custom icon", { exact: true })).toBeVisible();
  await page.waitForTimeout(250);
  const iconBox = await customToast.locator(".brick-toast__icon").boundingBox();
  const contentBox = await customToast.locator(".brick-toast__content").boundingBox();
  expect(iconBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(
    Math.abs(
      iconBox!.y - contentBox!.y,
    ),
  ).toBeLessThanOrEqual(3.5);
});

test("action runs once and removes only its toast", async ({ page }) => {
  await page.getByRole("button", { name: "Create success toast" }).click();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await viewport.getByRole("button", { name: "View" }).click();
  await expect(viewport).toBeHidden();
});

test("docs expose focused examples and named props parts", async ({ page }) => {
  await page.clock.install();
  await page.goto("/toast");
  for (const id of ["types", "dismiss", "action", "promise", "update", "pause", "lifecycle", "recipes", "placement", "queue", "overlap", "custom", "track", "duration", "pageidle", "width", "props-toaster", "props-api", "props-root", "props-parts"]) {
    await expect(page.locator("#" + id)).toHaveCount(1);
  }
  await page.getByRole("button", { name: "Create paused toast", exact: true }).click();
  const root = page.getByRole("region", { name: "Notifications (F8)" }).locator(".brick-toast");
  await expect(root).toHaveCount(1);
  await page.clock.fastForward(6500);
  await expect(root).toHaveCount(1);
  await page.getByRole("button", { name: "Resume timer", exact: true }).click();
  await page.clock.fastForward(6500);
  await expect(root).toHaveCount(0);
});

test("scoped variable-height stacks remain stable above three items", async ({ page }) => {
  await page.goto("/toast");
  await page.getByRole("button", { name: "Show overlapping stack", exact: true }).click();
  const viewport = page.getByRole("region", { name: "Stack example", exact: true });
  const items = viewport.locator(".brick-toast");
  await expect(items).toHaveCount(5);
  await viewport.hover();
  await expect(viewport).toHaveAttribute("data-expanded", "");
  await page.waitForTimeout(300);
  const before = await items.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().toJSON()).sort((a,b) => a.top - b.top));
  const newest = await items.filter({ hasText: "Update 5" }).boundingBox();
  expect(newest!.y + newest!.height).toBeCloseTo(before[before.length - 1]!.bottom, 0);
  for (let i = 1; i < before.length; i++) expect(before[i]!.top - before[i - 1]!.bottom).toBeGreaterThanOrEqual(15);
  await page.waitForTimeout(300);
  const after = await items.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(after.every(height => height >= 50)).toBe(true);
  await expect(page.getByRole("region", { name: "Notifications (F8)" })).toHaveCount(0);
});

test("center placement stays centered in RTL and solid cards use readable paint", async ({ page }) => {
  await page.goto("/toast?appearance=dark&exampleDirection=rtl");
  await page.getByRole("button", { name: "Show positioned toast", exact: true }).click();
  const viewport = page.getByRole("region", { name: "Position example", exact: true });
  await expect(viewport.locator(".brick-toast")).toHaveCount(1);
  const bounds = await viewport.boundingBox();
  expect(Math.abs(bounds!.x + bounds!.width / 2 - page.viewportSize()!.width / 2)).toBeLessThan(2);
  await page.getByRole("button", { name: "Solid accent", exact: true }).click();
  const root = page.getByRole("region", { name: "Notifications (F8)" }).locator(".brick-toast");
  await expect(root).toHaveAttribute("data-tone", "accent");
  await expect(root).toHaveAttribute("data-variant", "solid");
  expect((await new AxeBuilder({ page }).include(".brick-toast-viewport").analyze()).violations).toEqual([]);
});

test("dialog-scoped notifications retain accessible controls outside the dialog surface", async ({ page }) => {
  await page.goto("/toast");
  await page.getByRole("button", { name: "Open notification dialog", exact: true }).click();
  await page.getByRole("button", { name: "Notify inside dialog", exact: true }).click();
  const viewport = page.getByRole("region", { name: "Dialog notifications (F8)" });
  await expect(viewport).toBeVisible();
  const close = viewport.getByRole("button", { name: "Dismiss notification", exact: true });
  await close.focus();
  await expect(close).toBeFocused();
  expect(await viewport.evaluate(node => Boolean(node.closest("[inert]")))).toBe(false);
  await close.click();
  await expect(viewport).toHaveCount(0);
  await expect(page.getByRole("dialog", { name: "Save changes" })).toBeVisible();
});
