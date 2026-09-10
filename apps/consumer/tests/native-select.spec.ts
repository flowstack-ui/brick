import { expect, test } from "@playwright/test";
test("native notification preference submits and resets", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Notification settings" });
  const select = form.getByRole("combobox", { name: "Delivery frequency" });
  await select.selectOption("daily"); await form.getByRole("button", { name: "Save frequency" }).click();
  await expect(form.getByRole("status")).toHaveText("Delivery frequency: daily.");
  await form.getByRole("button", { name: "Reset frequency" }).click();
  await expect(select).toHaveValue("weekly");
});
