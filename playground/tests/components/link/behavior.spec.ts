import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/link"); });

test("default preserves native output and adopted recipes", async ({ page }) => {
  const link = page.getByTestId("link-overview").getByRole("link");
  await expect(link).toHaveAttribute("href", "#link-destination");
  await expect(link).toHaveAttribute("data-variant", "underline");
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
  await expect(variants.nth(1)).toHaveCSS("text-decoration-line", "none");
  await variants.nth(1).hover();
  await expect(variants.nth(1)).toHaveCSS("text-decoration-line", "underline");
  await variants.nth(1).focus();
  await expect(variants.nth(1)).toHaveCSS("text-decoration-line", "underline");
  await expect(variants.nth(1)).toHaveCSS("outline-style", "solid");
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
  expect(fontSizes).toEqual(["16px", "14px", "16px", "18px"]);
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
  const themed = page.getByRole("link", { name: "Legacy theme decoration" });
  const explicit = page.getByRole("link", { name: "Default underline ignores legacy policy" });
  await expect(themed).toHaveCSS("text-decoration-line", "none");
  await expect(explicit).toHaveCSS("text-decoration-line", "underline");
  await themed.focus();
  await expect(themed).toHaveCSS("text-decoration-line", "underline");
  const results = await new AxeBuilder({ page })
    .include('[data-component-page="link"]')
    .analyze();
  expect(results.violations).toEqual([]);
});

test("decoration uses independent soft paint without fading text and allows scoped overrides", async ({ page }) => {
  const result = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d")!;
    const pixel = (background: string, foreground?: string) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = background;
      context.fillRect(0, 0, 1, 1);
      if (foreground) { context.fillStyle = foreground; context.fillRect(0, 0, 1, 1); }
      return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
    };
    const luminance = (rgb: number[]) => rgb.map(channel => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    }).reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index]!, 0);
    const rows = [];
    for (const appearance of ["light", "dark"]) {
      for (const surface of ["canvas", "base", "subtle", "raised", "overlay"]) {
        for (const tone of ["accent", "neutral", "inherit"]) {
          const host = document.createElement("div");
          host.dataset.brickAppearance = appearance;
          host.style.backgroundColor = `var(--brick-color-surface-${surface})`;
          host.style.color = "var(--brick-color-text-secondary)";
          const link = document.createElement("a");
          link.className = "brick-link";
          link.dataset.variant = "underline";
          link.dataset.tone = tone;
          link.href = "#link-destination";
          link.textContent = "Surface contrast";
          host.append(link); document.body.append(host);
          const bg = getComputedStyle(host).backgroundColor;
          const style = getComputedStyle(link);
          const back = luminance(pixel(bg));
          const text = luminance(pixel(bg, style.color));
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = style.textDecorationColor;
          context.fillRect(0, 0, 1, 1);
          const alpha = context.getImageData(0, 0, 1, 1).data[3]! / 255;
          const expected = pixel(bg, `color-mix(in srgb, ${style.color} 20%, transparent)`);
          const actual = pixel(bg, style.textDecorationColor);
          rows.push({ appearance, surface, tone, alpha, expected, actual,
            ratio: (Math.max(back, text) + 0.05) / (Math.min(back, text) + 0.05) });
          host.remove();
        }
      }
    }
    return rows;
  });
  for (const row of result) {
    expect(row.alpha, JSON.stringify(row)).toBeCloseTo(0.2, 2);
    expect(row.actual, JSON.stringify(row)).toEqual(row.expected);
    expect(row.ratio, JSON.stringify(row)).toBeGreaterThanOrEqual(4.5);
  }
  const subtle = page.getByTestId("link-variants").locator('[data-variant="subtle"]');
  const underline = page.getByTestId("link-variants").locator('[data-variant="underline"]');
  await underline.hover();
  const interactionPaint = await underline.evaluate(node => getComputedStyle(node).textDecorationColor);
  await subtle.hover();
  await expect(subtle).toHaveCSS("text-decoration-color", interactionPaint);
  const link = page.getByTestId("link-overview").getByRole("link");
  await link.locator("..").evaluate(host => host.style.setProperty("--brick-link-decoration-color", "rgb(12, 34, 56)"));
  await expect(link).toHaveCSS("text-decoration-color", "rgb(12, 34, 56)");
  await page.emulateMedia({ contrast: "more" });
  // Exercise initial OS-preference rendering too; Firefox's emulation can
  // update matchMedia before invalidating an already loaded stylesheet.
  await page.reload();
  await link.locator("..").evaluate(host => host.style.setProperty("--brick-link-decoration-color", "rgb(12, 34, 56)"));
  if (await page.evaluate(() => matchMedia("(prefers-contrast: more)").matches)) {
    await expect(link).toHaveCSS("text-decoration-color", await link.evaluate(node => getComputedStyle(node).color));
  } else {
    test.info().annotations.push({ type: "environment-limit", description: "This browser does not emulate prefers-contrast:more; increased-contrast assertion runs in the supporting browser projects." });
  }
  await page.emulateMedia({ forcedColors: "active" });
  await expect.poll(() => link.evaluate(node => getComputedStyle(node).textDecorationColor === getComputedStyle(node).color)).toBe(true);
});

test("subtle press and keyboard focus preserve geometry and plain stays undecorated", async ({ page }) => {
  const subtle = page.getByTestId("link-variants").locator('[data-variant="subtle"]');
  const before = await subtle.boundingBox();
  await subtle.hover();
  await page.mouse.down();
  await expect(subtle).toHaveCSS("text-decoration-line", "underline");
  await page.mouse.up();
  await page.keyboard.press("Tab");
  await subtle.focus();
  await expect(subtle).toHaveCSS("outline-style", "solid");
  const after = await subtle.boundingBox();
  expect(after?.width).toBe(before?.width);
  expect(after?.height).toBe(before?.height);
});
