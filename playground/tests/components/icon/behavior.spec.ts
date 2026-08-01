import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/icon"); });

test("Icon defaults and explicit accessibility modes are deterministic", async ({ page }) => {
  const decorative = page.getByTestId("icon-decorative");
  await expect(decorative).toHaveAttribute("aria-hidden", "true");
  await expect(decorative).toHaveAttribute("data-size", "md");
  await expect(decorative).toHaveAttribute("data-tone", "inherit");
  const informative = page.getByRole("img", { name: "Search" }).first();
  await expect(informative).toHaveAttribute("aria-label", "Search");
  await expect(page.getByRole("img", { name: "System warning" })).toHaveAttribute("aria-labelledby", "icon-warning-label");
});

test("Icon sizes, tones, SVG sources, composition, and direction are observable", async ({ page }) => {
  const sizes = page.locator("#scenario-icon-sizes .brick-icon");
  await expect(sizes).toHaveCount(6);
  expect(await sizes.evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).width))).toEqual(["12px", "16px", "20px", "24px", "32px", "40px"]);
  await expect(page.locator("#scenario-icon-tones .brick-icon")).toHaveCount(9);
  await expect(page.getByTestId("icon-inline-source").locator("path")).toHaveCount(2);
  await expect(page.getByTestId("icon-inline-source").locator("path").nth(1)).toHaveAttribute(
    "d",
    "m14 7 5 5-5 5",
  );
  const composedSource = page.locator("svg.brick-icon[data-source=composed]");
  await expect(composedSource).toHaveCount(1);
  await expect(composedSource).toHaveCSS("width", "24px");
  await expect(composedSource).toHaveCSS("height", "24px");
  const renderedComposition = page.getByTestId("icon-rendered-composed");
  await expect(renderedComposition).toHaveCSS("width", "24px");
  await expect(renderedComposition).toHaveCSS("height", "24px");
  await expect(renderedComposition.locator("circle")).toHaveAttribute("fill", "none");
  await expect(renderedComposition.locator("circle")).toHaveAttribute("stroke", "currentColor");
  await expect(renderedComposition.locator("path")).toHaveAttribute("stroke", "currentColor");
  await expect(
    page.locator("#scenario-icon-composition .playground-output-evidence__preview .playground-specimen-label", {
      hasText: "SVG asChild",
    }),
  ).toBeVisible();
  const rtlDirectional = page.locator("#scenario-icon-direction [dir=rtl] [data-directional]");
  await expect(rtlDirectional).toHaveCSS("transform", "matrix(-1, 0, 0, 1, 0, 0)");
  await expect(page.locator("#scenario-icon-direction [dir=rtl] .brick-icon:not([data-directional])")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
});

test("Icon remains contained and the route has no serious accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
