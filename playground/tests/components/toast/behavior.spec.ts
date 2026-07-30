import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/toast"); });

test("creates the finished card with one live announcement path and default policy", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Create success toast" });
  await trigger.focus();
  await trigger.press("Enter");
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
  await expect(page.locator("[data-slot='toast-announcer-polite']")).toContainText("Workspace published");
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
  await page.getByRole("button", { name: "Create four queued toasts" }).click();
  let viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport.locator(".brick-toast")).toHaveCount(3);
  await page.getByRole("button", { name: "Create overlap queue" }).click();
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
  await page.getByRole("button", { name: "Show top-start toast" }).click();
  viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toHaveAttribute("data-position", "top-start");
  await page.setViewportSize({ width: 320, height: 700 });
  const box = await viewport.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  expect((await new AxeBuilder({ page }).include(".brick-toast-viewport").analyze()).violations).toEqual([]);

  await page.setViewportSize({ width: 1120, height: 900 });
  await page.getByRole("button", { name: "Show Arabic stress toast" }).click();
  viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toHaveAttribute("dir", "rtl");
  await expect(viewport).toHaveAttribute("data-position", "bottom-start");
  const rtlBox = await viewport.boundingBox();
  expect(rtlBox).not.toBeNull();
  expect(rtlBox!.x).toBeGreaterThan(700);
});

test("centers title-only content and icons within the toast row", async ({ page }) => {
  await page.getByRole("button", { name: "Show title only" }).click();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  const titleOnly = viewport.locator(".brick-toast[data-state='visible']");
  await expect(titleOnly).toHaveCount(1);
  await expect(titleOnly.locator(".brick-toast__description")).toHaveCount(0);
  await expect(titleOnly.locator(".brick-toast__icon")).toHaveCount(0);
  await expect(titleOnly.locator(".brick-toast__content")).toHaveCSS("grid-column-start", "1");
  await page.waitForTimeout(250);
  const rootBox = await titleOnly.boundingBox();
  const titleBox = await titleOnly.locator(".brick-toast__title").boundingBox();
  const closeBox = await titleOnly.getByRole("button", { name: "Dismiss notification" }).boundingBox();
  expect(rootBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(closeBox).not.toBeNull();
  expect(rootBox!.height).toBeLessThanOrEqual(50);
  expect(closeBox!.x).toBeGreaterThan(rootBox!.x);
  expect(closeBox!.x + closeBox!.width).toBeLessThanOrEqual(rootBox!.x + rootBox!.width);
  const rootCenter = rootBox!.y + rootBox!.height / 2;
  expect(Math.abs(titleBox!.y + titleBox!.height / 2 - rootCenter)).toBeLessThanOrEqual(2);
  expect(Math.abs(closeBox!.y + closeBox!.height / 2 - rootCenter)).toBeLessThanOrEqual(2);

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
  expect(descriptionRootBox!.height).toBeLessThanOrEqual(50);
  expect(descriptionCloseBox!.x + descriptionCloseBox!.width).toBeLessThanOrEqual(
    descriptionRootBox!.x + descriptionRootBox!.width,
  );

  await page.getByRole("button", { name: "Show custom icon" }).click();
  const customToast = viewport
    .locator(".brick-toast[data-state='visible']")
    .filter({ hasText: "Custom icon" });
  await expect(customToast).toHaveCount(1);
  await expect(customToast.getByText("Custom icon", { exact: true })).toBeVisible();
  const iconBox = await customToast.locator(".brick-toast__icon").boundingBox();
  const contentBox = await customToast.locator(".brick-toast__content").boundingBox();
  expect(iconBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(
    Math.abs(
      iconBox!.y + iconBox!.height / 2 - (contentBox!.y + contentBox!.height / 2),
    ),
  ).toBeLessThanOrEqual(3.5);
});

test("action runs once and removes only its toast", async ({ page }) => {
  await page.getByRole("button", { name: "Create success toast" }).click();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await viewport.getByRole("button", { name: "View" }).click();
  await expect(viewport).toBeHidden();
});
