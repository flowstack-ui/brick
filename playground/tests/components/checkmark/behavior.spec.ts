import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("checkmarks remain passive and square", async ({ page }) => {
  await page.goto("/checkmark");
  const marks = page.getByTestId("checkmark-output").locator(".brick-checkmark");
  await expect(marks).toHaveCount(4);
  const box = await marks.first().boundingBox();
  expect(box?.width).toBe(box?.height);
  await expect(marks.first()).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
