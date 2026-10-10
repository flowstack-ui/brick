import { expect, type Page } from "@playwright/test";

export async function setExampleDirection(page: Page, direction: "ltr" | "rtl") {
  await page.getByRole("button", { name: "Preview settings", exact: true }).click();
  await page.getByLabel("Example direction", { exact: true }).selectOption(direction);
  await page.keyboard.press("Escape");
  await expect(page.getByLabel("Example direction", { exact: true })).toBeHidden();
}
