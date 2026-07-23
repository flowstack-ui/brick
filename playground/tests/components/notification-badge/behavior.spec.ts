import { expect, test } from "@playwright/test";

test("NotificationBadge owns count formatting and hidden indicator semantics", async ({ page }) => {
  await page.goto("/badge");
  const indicator = page
    .getByRole("button", { name: "Inbox, 125 unread messages" })
    .locator("..")
    .locator("[data-slot='notification-badge-indicator']");
  await expect(indicator).toHaveText("99+");
  await expect(indicator).toHaveAttribute("aria-hidden", "true");
  await expect(indicator).toHaveAttribute("data-shape", "pill");
});
