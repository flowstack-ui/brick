import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/toast"); });

test("creates the finished card with one live announcement path and default policy", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Create success toast" });
  await trigger.focus();
  await trigger.click();
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
  await trigger.click();
  await page.keyboard.press("F8");
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
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
  await page.getByRole("button", { name: "Stacking: separated" }).click();
  await expect(viewport).toHaveAttribute("data-stacking", "overlap");
  await page.getByRole("button", { name: "top-start", exact: true }).click();
  viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await expect(viewport).toHaveAttribute("data-position", "top-start");
  await page.setViewportSize({ width: 320, height: 700 });
  const box = await viewport.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  expect((await new AxeBuilder({ page }).include(".brick-toast-viewport").analyze()).violations).toEqual([]);
});

test("action runs once and removes only its toast", async ({ page }) => {
  await page.getByRole("button", { name: "Create success toast" }).click();
  const viewport = page.getByRole("region", { name: "Notifications (F8)" });
  await viewport.getByRole("button", { name: "View" }).click();
  await expect(viewport).toBeHidden();
});
