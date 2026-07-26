import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/code"); });

test("Code covers native defaults and controlled recipes", async ({ page }) => {
  const overview = page.getByTestId("code-overview").locator(".brick-code");
  await expect(overview).toHaveJSProperty("tagName", "CODE");
  await expect(overview).toHaveAttribute("data-slot", "code");
  await expect(overview).toHaveAttribute("data-variant", "subtle");
  await expect(overview).toHaveAttribute("data-tone", "neutral");
  await expect(overview).toHaveAttribute("data-size", "inherit");
  await expect(page.getByTestId("code-variants").locator(".brick-code")).toHaveCount(2);
  await expect(page.getByTestId("code-tones").locator(".brick-code")).toHaveCount(2);
  await expect(page.getByTestId("code-sizes").locator(".brick-code")).toHaveCount(3);
});

test("Code native output, wrapping, appearance, and accessibility remain valid", async ({ page }) => {
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: CODE")).toBeVisible();
  await expect(page.getByTestId("code-native").locator("[data-rendered-output]")).toContainText("<code");
  const narrow = page.getByTestId("code-stress").locator(".code-narrow");
  expect(await narrow.evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(await narrow.evaluate((node) => node.clientWidth));
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
