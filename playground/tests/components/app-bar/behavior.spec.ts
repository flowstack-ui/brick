import { expect, test } from "@playwright/test";

test("AppBar owns its landmark and structural anatomy", async ({ page }) => {
  await page.goto("/app-bar");
  const bar = page.locator(".brick-app-bar[aria-label='static neutral surface example']").first();
  await expect(bar).toHaveAttribute("data-position", "static");
  await expect(bar.locator("[data-slot='appbar-toolbar']")).not.toHaveAttribute("role");
  await expect(bar.locator("[data-slot='appbar-start']")).toBeVisible();
  await expect(bar.locator("[data-slot='appbar-end']")).toBeVisible();
});
