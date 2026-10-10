import { expect, test } from "@playwright/test";

test("backup cards submit, enforce selection limits and reset", async ({ page }) => {
  await page.goto("/");
  const form = page.getByRole("form", { name: "Backup options" });
  await form.getByText("Daily snapshots", { exact: true }).click();
  await form.getByRole("button", { name: "Save backup options" }).click();
  await expect(form.getByRole("checkbox", { name: "Daily snapshots" })).toBeFocused();
  await page.keyboard.press("Space");
  await form.getByText("Extended retention", { exact: true }).click();
  await expect(form.getByRole("checkbox", { name: "Priority restore" })).toBeDisabled();
  await form.getByRole("button", { name: "Save backup options" }).click();
  await expect(form.getByRole("status")).toHaveText("Saved: daily, retention");
  await form.getByRole("button", { name: "Reset backup options" }).click();
  await expect(form.getByRole("checkbox", { name: "Daily snapshots" })).toBeChecked();
  await expect(form.getByRole("checkbox", { name: "Extended retention" })).not.toBeChecked();
});
