import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("radiomarks remain passive and circular", async ({ page }) => {
  await page.goto("/radiomark");
  const marks = page.getByTestId("radiomark-output").locator(".brick-radiomark");
  await expect(marks).toHaveCount(4);
  const box = await marks.first().boundingBox();
  expect(box?.width).toBe(box?.height);
  await expect(marks.first()).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
