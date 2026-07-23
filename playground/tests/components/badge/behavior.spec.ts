import { expect, test } from "@playwright/test";

test("Badge owns passive semantics and its recipe matrix", async ({ page }) => {
  await page.goto("/badge");
  const badge = page.getByText("Published", { exact: true });
  await expect(badge).toHaveAttribute("data-slot", "badge");
  await expect(badge).not.toHaveAttribute("role");
  await expect(page.getByTestId("badge-recipes").locator(".brick-badge")).toHaveCount(18);
});
