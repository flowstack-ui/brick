import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test("forced colors do not turn a disabled unchecked mark into a selected mark", async ({ page }) => {
  await page.goto("/radiomark");
  await page.emulateMedia({ forcedColors: "active" });
  const dots = page.locator('.brick-radiomark[data-disabled][data-state="unchecked"] .brick-radiomark__dot');
  await expect(dots).not.toHaveCount(0);
  for (const dot of await dots.all()) await expect(dot).toHaveCSS("visibility", "hidden");
});

test("radiomark follows its parent without acquiring radio semantics", async ({ page }) => {
  await page.goto("/radiomark");
  const parent = page.getByRole("button", { name: "Use express delivery" });
  await parent.click();
  await expect(parent).toHaveAttribute("aria-pressed", "true");
  await expect(parent.locator(".brick-radiomark")).toHaveAttribute("data-state", "checked");
  await expect(page.getByRole("radio")).toHaveCount(0);
  for (const mark of await page.locator(".brick-radiomark").all()) {
    const box = await mark.boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
  }
});

test("radiomarks remain passive and circular", async ({ page }) => {
  await page.goto("/radiomark");
  const marks = page.getByTestId("radiomark-output").locator(".brick-radiomark");
  await expect(marks).toHaveCount(4);
  const box = await marks.first().boundingBox();
  expect(box?.width).toBe(box?.height);
  await expect(marks.first()).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
