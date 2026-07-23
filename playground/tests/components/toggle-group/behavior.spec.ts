import { expect, test } from "@playwright/test";

test("ToggleGroup owns grouped selection and roving focus", async ({ page }) => {
  await page.goto("/toggle");
  const group = page.getByRole("group", { name: "Project view" });
  const cards = group.getByRole("button", { name: "Cards" });
  const list = group.getByRole("button", { name: "List" });
  await cards.focus();
  await page.keyboard.press("ArrowRight");
  await expect(list).toBeFocused();
  await page.keyboard.press("Space");
  await expect(list).toHaveAttribute("aria-pressed", "true");
});
