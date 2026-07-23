import { expect, test } from "@playwright/test";

test("Checkbox owns standalone pointer and keyboard state", async ({ page }) => {
  await page.goto("/checkbox");
  const checkbox = page.getByRole("checkbox", { name: "Controlled tri-state" });
  await expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).toHaveAttribute("aria-checked", "true");
});
