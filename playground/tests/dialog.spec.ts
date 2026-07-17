import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Dialog opens with the approved modal anatomy and restores interaction after close", async ({ page }) => {
  await page.goto("/dialog");

  const trigger = page.getByRole("button", { name: "Edit profile" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("data-size", "md");
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog.locator("[data-slot='dialog-header']")).toBeVisible();
  await expect(dialog.locator("[data-slot='dialog-body']")).toBeVisible();
  await expect(dialog.locator("[data-slot='dialog-footer']")).toBeVisible();
  await expect(page.locator(".brick-dialog-overlay")).toBeVisible();

  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Edit profile" })).toBeVisible();
});

test("Dialog traps focus, closes on Escape, and restores document scrolling", async ({ page }) => {
  await page.goto("/dialog");
  const trigger = page.getByRole("button", { name: "Open event dialog" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Dismissal evidence" });
  await expect(dialog).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Tab");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.getByText("Closed: escapeKeyDown")).toBeVisible();
});

test("nested Dialog cleanup restores the application after both layers close", async ({ page }) => {
  await page.goto("/dialog");

  const parentTrigger = page.getByRole("button", { name: "Open parent dialog" });
  await parentTrigger.click();
  await page.getByRole("button", { name: "Open nested dialog" }).click();
  await page.getByRole("button", { name: "Done" }).click();
  await page.getByRole("button", { name: "Close parent" }).click();

  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
  await expect(parentTrigger).toBeFocused();
  await parentTrigger.click();
  await expect(page.getByRole("dialog", { name: "Parent settings" })).toBeVisible();
});

test("portalled RTL Dialog preserves logical text and action direction", async ({ page }) => {
  await page.goto("/dialog");

  await page.getByRole("button", { name: "فتح إعدادات مساحة العمل المفصلة" }).click();
  const dialog = page.getByRole("dialog", { name: "فتح إعدادات مساحة العمل المفصلة" });
  await expect(dialog).toHaveAttribute("dir", "rtl");
  await expect(dialog.locator("[data-slot='dialog-title']")).toHaveCSS("direction", "rtl");
  await expect(dialog.locator("[data-slot='dialog-description']")).toHaveCSS("direction", "rtl");
  await expect(dialog.locator("[data-slot='dialog-body']")).toHaveCSS("direction", "rtl");
  await expect(dialog.locator("[data-slot='dialog-footer']")).toHaveCSS("direction", "rtl");
  const box = await dialog.boundingBox();
  const viewport = page.viewportSize();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width);
});

test("Dialog sizes and long-body mobile geometry remain bounded", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/dialog");

  await page.getByRole("button", { name: "Open long mobile dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Open long mobile dialog" });
  const body = dialog.locator("[data-slot='dialog-body']");
  const footer = dialog.locator("[data-slot='dialog-footer']");
  await expect(dialog).toBeVisible();
  await expect(footer).toBeVisible();
  expect(await body.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  const box = await dialog.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(640);
});

test("Dialog's canonical open state has no automated accessibility violations", async ({ page }) => {
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Edit profile" }).click();
  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveCSS("opacity", "1");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
