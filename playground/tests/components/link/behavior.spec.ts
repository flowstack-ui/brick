import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/link"); });

test("default preserves native output and adopted recipes", async ({ page }) => {
  const link = page.getByTestId("link-overview").getByRole("link");
  await expect(link).toHaveAttribute("href", "#link-destination");
  await expect(link).toHaveAttribute("data-variant", "theme");
  await expect(link).toHaveAttribute("data-tone", "accent");
  await expect(link).toHaveAttribute("data-size", "inherit");
  await expect(link).toHaveCSS("text-decoration-line", "underline");
  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "solid");
});

test("variants, tones, and sizes change only their controlled dimension", async ({ page }) => {
  const variants = page.getByTestId("link-variants").locator(".brick-link");
  await expect(variants).toHaveCount(3);
  await expect(variants.nth(0)).toHaveCSS("text-decoration-line", "underline");
  await expect(variants.nth(1)).toHaveCSS("text-decoration-line", "underline");
  await expect(variants.nth(2)).toHaveCSS("text-decoration-line", "none");
  await variants.nth(2).hover();
  await expect(variants.nth(2)).toHaveCSS("text-decoration-line", "none");
  await variants.nth(2).focus();
  await expect(variants.nth(2)).toHaveCSS("text-decoration-line", "none");
  await expect(variants.nth(2)).toHaveCSS("font-weight", "400");
  await expect(variants.nth(2)).toHaveCSS("outline-style", "solid");

  const tones = page.getByTestId("link-tones").locator(".brick-link");
  expect(await tones.evaluateAll((items) => items.map((item) => item.textContent))).toEqual([
    "Read navigation guidance", "Read navigation guidance", "Read navigation guidance",
  ]);
  const neutralRestColor = await tones.nth(1).evaluate(
    (item) => getComputedStyle(item).color,
  );
  await tones.nth(1).hover();
  const neutralHoverColor = await tones.nth(1).evaluate(
    (item) => getComputedStyle(item).color,
  );
  await tones.nth(0).hover();
  const accentHoverColor = await tones.nth(0).evaluate(
    (item) => getComputedStyle(item).color,
  );
  expect(neutralHoverColor).not.toBe(neutralRestColor);
  expect(neutralHoverColor).toBe(accentHoverColor);

  const sizes = page.getByTestId("link-sizes").locator(".brick-link");
  const fontSizes = await sizes.evaluateAll((items) =>
    items.map((item) => getComputedStyle(item).fontSize),
  );
  expect(fontSizes).toEqual(["16px", "14px", "16px", "20px"]);
});

test("icons, long content, and RTL remain aligned and contained", async ({ page }) => {
  const content = page.getByTestId("link-content");
  const iconLinks = content.locator(".brick-link:has(.brick-link__icon)");
  await expect(iconLinks).toHaveCount(3);
  for (const icon of await content.locator(".brick-link__icon").all()) {
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    const box = await icon.boundingBox();
    expect(box?.width).toBeGreaterThan(0);
    expect(box?.height).toBeGreaterThan(0);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("link-stress");
  const stressBox = await stress.boundingBox();
  expect(stressBox).not.toBeNull();
  expect(stressBox!.x + stressBox!.width).toBeLessThanOrEqual(390);
  const rtl = stress.locator('[dir="rtl"] .brick-link').first();
  await expect(rtl).toHaveCSS("direction", "rtl");
  const rtlBox = await rtl.boundingBox();
  const iconBox = await rtl.locator(".brick-link__icon").boundingBox();
  expect(iconBox!.x).toBeGreaterThan(rtlBox!.x + rtlBox!.width / 2);
});

test("native and router composition produce inspectable anchors", async ({ page }) => {
  const composition = page.getByTestId("link-composition");
  await expect(composition.locator('[aria-current="page"]')).toHaveAttribute(
    "href",
    "#link-destination",
  );
  const outputs = composition.locator(".playground-output-evidence");
  await expect(outputs).toHaveCount(2);
  await expect(outputs.nth(0).locator(".brick-link")).toHaveAttribute(
    "href",
    "#router-account",
  );
  await expect(outputs.nth(1).locator(".brick-link")).toHaveAttribute(
    "href",
    "#router-reports",
  );
  await expect(outputs.nth(0).locator("[data-rendered-output]")).toContainText("data-router");
  await expect(outputs.nth(1).locator("[data-rendered-output]")).toContainText("brick-link__content");
});

test("customization is visible and the component route has no axe violations", async ({ page }) => {
  const custom = page.getByRole("link", { name: "Read customized guidance" });
  await expect(custom).toHaveCSS("text-decoration-thickness", "2.56px");
  const themed = page.getByRole("link", { name: "Theme-following decoration" });
  const explicit = page.getByRole("link", { name: "Explicit underline decoration" });
  await expect(themed).toHaveCSS("text-decoration-line", "none");
  await expect(explicit).toHaveCSS("text-decoration-line", "underline");
  await themed.focus();
  await expect(themed).toHaveCSS("text-decoration-line", "underline");
  const results = await new AxeBuilder({ page })
    .include('[data-component-page="link"]')
    .analyze();
  expect(results.violations).toEqual([]);
});
