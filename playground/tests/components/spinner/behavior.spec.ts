import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test("spinner sizes stay square and decorative with no overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/spinner");
  const rings = page.locator('[data-scenario="spinner.sizes"] .brick-spinner');
  const expected = [12, 16, 20, 32, 40];
  for (let i = 0; i < expected.length; i++) {
    const box = await rings.nth(i).boundingBox();
    expect(box!.width).toBeCloseTo(expected[i], 1);
    expect(box!.height).toBeCloseTo(expected[i], 1);
    await expect(rings.nth(i)).toHaveAttribute("aria-hidden", "true");
  }
  await expect(page.getByRole("img", { name: "Preparing preview", exact: true })).toHaveCount(1);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("spinner rotates normally and stays still with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/spinner");
  const ring = page.getByTestId("spinner-basic");
  await expect(ring).toHaveCSS("animation-name", "brick-spinner-spin");
  const transforms = await ring.evaluate(async el => {
    const first = getComputedStyle(el).transform;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return [first, getComputedStyle(el).transform];
  });
  expect(transforms[0]).not.toBe(transforms[1]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(ring).toHaveCSS("animation-name", "none");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(ring).toHaveCSS("border-top-style", "solid");
});

test("spinner honors customization and narrow RTL containment", async ({ page }) => {
  await page.goto("/spinner");
  await expect(page.locator('[data-scenario="spinner.duration"] .brick-spinner')).toHaveCSS("animation-duration", "1s");
  await expect(page.locator('[data-scenario="spinner.thickness"] .brick-spinner').last()).toHaveCSS("border-top-width", "3px");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("html").evaluate(el => el.setAttribute("dir", "rtl"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
