import { expect, test } from "@playwright/test";

test("Form owns submission state and reset behavior", async ({ page }) => {
  await page.goto("/form");
  const form = page.getByRole("form", { name: "Create account" });
  const email = form.getByRole("textbox", { name: "Work email" });
  await email.fill("ada@example.com");
  await form.getByRole("button", { name: "Create account" }).click();
  await expect(form).toHaveAttribute("data-submitted", "", { timeout: 2_000 });
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(email).toHaveValue("");
});
