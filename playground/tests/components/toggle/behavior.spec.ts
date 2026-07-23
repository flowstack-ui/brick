import { expect, test } from "@playwright/test";

test("Toggle owns standalone pointer and keyboard pressed state", async ({ page }) => {
  await page.goto("/toggle");
  const toggle = page.getByRole("button", { name: "★ Favorite" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
});
