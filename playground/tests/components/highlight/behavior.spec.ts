import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/highlight"); });

test("Highlight preserves Atom matching, native semantics, and literal queries", async ({ page }) => {
  const overview = page.getByTestId("highlight-overview").locator(".brick-highlight");
  await expect(overview).toHaveJSProperty("tagName", "SPAN");
  await expect(overview.locator("mark")).toHaveCount(1);
  await expect(overview.locator("mark")).toHaveText("durable");
  await expect(overview).toHaveText("Build durable interfaces with exact package guidance.");
  const recipes = page.getByTestId("highlight-recipes");
  await expect(recipes.locator(".brick-highlight").nth(0).locator("mark")).toHaveCount(2);
  await expect(recipes.locator(".brick-highlight").nth(0).locator("mark").first()).toHaveText("design system");
  await expect(recipes.locator(".brick-highlight").nth(2).locator("mark")).toHaveText("literal.*query");
});

test("Highlight exact options stay passive, selectable, and accessible", async ({ page }) => {
  const exact = page.getByTestId("highlight-adaptation").locator(".consumer-highlight");
  await expect(exact.locator("mark")).toHaveCount(1);
  await expect(exact.locator("mark")).toHaveText("Flow");
  await expect(exact).toHaveAttribute("data-owner", "playground");
  await page.keyboard.press("Tab");
  await expect(page.locator(".brick-highlight :focus")).toHaveCount(0);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
