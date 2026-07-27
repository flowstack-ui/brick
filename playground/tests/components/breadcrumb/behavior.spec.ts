import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/breadcrumb"); });

test("default trail preserves landmark, hierarchy, links, current page, and hidden separators", async ({ page }) => {
  const overview = page.getByTestId("breadcrumb-overview");
  const root = overview.getByRole("navigation", { name: "Overview path" });
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root.locator("ol")).toHaveCount(1);
  await expect(root.locator(".brick-breadcrumb-item")).toHaveCount(3);
  await expect(root.getByRole("link")).toHaveCount(2);
  await expect(root.locator("[aria-current='page']")).toHaveText("Quarterly report");
  for (const separator of await root.locator(".brick-breadcrumb-separator").all()) {
    await expect(separator).toHaveAttribute("role", "presentation");
    await expect(separator).toHaveAttribute("aria-hidden", "true");
  }
});

test("variants and sizes change only their adopted visual dimensions", async ({ page }) => {
  const plain = page.getByTestId("breadcrumb-variants").locator(".forms-cell").nth(0).getByRole("link").first();
  const underline = page.getByTestId("breadcrumb-variants").locator(".forms-cell").nth(1).getByRole("link").first();
  await expect(plain).toHaveCSS("text-decoration-line", "none");
  await expect(underline).toHaveCSS("text-decoration-line", "underline");
  const fontSizes: number[] = [];
  for (const size of ["sm", "md", "lg"]) {
    const root = page.getByTestId("breadcrumb-sizes").locator(`.brick-breadcrumb[data-size='${size}']`);
    fontSizes.push(await root.evaluate((node) => Number.parseFloat(getComputedStyle(node).fontSize)));
  }
  expect(fontSizes[0]).toBeLessThan(fontSizes[1]);
  expect(fontSizes[1]).toBeLessThan(fontSizes[2]);
});

test("interactive Ellipsis reveals application-owned ancestors and keeps native focus", async ({ page }) => {
  const collapse = page.getByTestId("breadcrumb-collapse");
  const trigger = collapse.getByRole("button", { name: "Show two collapsed pages" });
  await trigger.focus();
  await expect(trigger).toBeFocused();
  expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await trigger.press("Enter");
  await expect(collapse.getByRole("link", { name: "Library" })).toBeVisible();
  await expect(collapse.getByRole("link", { name: "Reports" })).toBeVisible();
  await expect(collapse.getByText("Two ancestor pages shown")).toBeVisible();
});

test("native attributes, composition output, customization, wrapping, and RTL remain correct", async ({ page }) => {
  const external = page.getByTestId("breadcrumb-native").getByRole("link", { name: "Reference (new tab)" });
  await expect(external).toHaveAttribute("target", "_blank");
  await expect(external).toHaveAttribute("rel", "noopener");
  await expect(page.getByTestId("breadcrumb-native").getByRole("link", { name: "Download report" })).toHaveAttribute("download", "report.csv");
  await expect(page.locator("[data-adapter='render-root']")).toHaveAttribute("aria-label", "Rendered path");
  await expect(page.locator("[data-adapter='render-page']")).toHaveAttribute("aria-current", "page");
  await expect(page.locator("[data-adapter='composed-separator']")).toHaveAttribute("aria-hidden", "true");
  const custom = page.getByRole("navigation").filter({ has: page.getByRole("link", { name: "Home" }) }).last();
  await expect(custom.getByRole("link").first()).toHaveCSS("color", "rgb(107, 47, 136)");
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("breadcrumb-stress");
  expect((await stress.boundingBox())!.width).toBeLessThanOrEqual(390);
  const rtl = stress.locator("[dir='rtl'] .brick-breadcrumb");
  await expect(rtl).toHaveCSS("direction", "rtl");
  await expect(rtl.locator(".brick-icon").first()).toHaveAttribute("data-directional", "");
});

test("Breadcrumb page has no automatically detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
