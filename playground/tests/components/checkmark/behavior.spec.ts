import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("checkmarks remain passive and square", async ({ page }) => {
  await page.goto("/checkmark");
  const marks = page.getByTestId("checkmark-output").locator(".brick-checkmark");
  await expect(marks).toHaveCount(4);
  const box = await marks.first().boundingBox();
  expect(box?.width).toBe(box?.height);
  await expect(marks.first()).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("checkmark state follows its semantic parent across recipes", async ({ page }) => {
  await page.goto("/checkmark");
  const button = page.getByRole("button", { name: "Include archived files" });
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(button.locator(".brick-checkmark")).toHaveAttribute("data-state", "checked");
  for (const mark of await page.locator(".brick-checkmark").all()) {
    const box = await mark.boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
  }
  await expect(page.locator('.brick-checkmark[data-variant="inverted"]').first()).toHaveAttribute("aria-hidden", "true");
});
