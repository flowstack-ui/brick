import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/progress-circle"); });
test("indeterminate arc changes length and rotation over time", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const arc = page.locator("#indeterminate .brick-progress-circle__indicator");
  const sample = () => arc.evaluate(e => ({ dash: getComputedStyle(e).strokeDasharray, rotation: getComputedStyle(e).transform }));
  const first = await sample();
  await page.waitForTimeout(180);
  const next = await sample();
  expect(next.dash).not.toBe(first.dash);
  expect(next.rotation).not.toBe(first.rotation);
});
test("documentation and exact paired ring geometry", async ({ page }) => {
  for (const id of ["usage", "rounded", "sizes", "colors", "value", "thickness", "indeterminate", "custom-stroke", "range", "responsive", "controller", "composition", "props-root", "props-circle", "props-track", "props-indicator"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
  for (const [size, diameter, stroke] of [["xs", 24, 4], ["sm", 32, 5], ["md", 40, 6], ["lg", 48, 7], ["xl", 64, 8]] as const) {
    const root = page.locator(`#sizes .brick-progress-circle[data-size="${size}"]`);
    const svg = root.locator("svg");
    expect((await svg.boundingBox())!.width).toBeCloseTo(diameter, 1);
    const paint = await root.locator("circle").first().evaluate(e => ({ stroke: parseFloat(getComputedStyle(e).strokeWidth), radius: parseFloat(getComputedStyle(e).r) }));
    expect(paint.stroke * diameter / 100).toBeCloseTo(stroke, 1);
    expect(paint.radius * 2 + paint.stroke).toBeCloseTo(100, 2);
  }
});

test("thick strokes, range, composition and responsive sizing stay contained", async ({ page }) => {
  for (const root of await page.locator("#thickness .brick-progress-circle").all()) {
    const paint = await root.locator("circle").first().evaluate(e => ({ stroke: parseFloat(getComputedStyle(e).strokeWidth), radius: parseFloat(getComputedStyle(e).r) }));
    expect(paint.radius * 2 + paint.stroke).toBeLessThanOrEqual(100.01);
  }
  await expect(page.locator("#composition .brick-progress-circle svg")).toHaveCount(1);
  await expect(page.locator("#composition .brick-progress-circle circle")).toHaveCount(2);
  await expect(page.locator("#range .brick-progress-circle__value")).toHaveText("3/5");
  await expect(page.locator("#value .brick-progress-circle__value")).toHaveCSS("transform", "none");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#responsive .brick-progress-circle svg")).toHaveCSS("width", "32px");
  await page.setViewportSize({ width: 1100, height: 900 });
  await expect(page.locator("#responsive .brick-progress-circle svg")).toHaveCSS("width", "64px");
});

test("zero range is not painted and reduced motion preserves a static arc", async ({ page }) => {
  await page.locator("#controller").getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#controller .brick-progress-circle__indicator")).toHaveCSS("opacity", "0");
  const arc = page.locator("#indeterminate .brick-progress-circle__indicator");
  expect(await arc.evaluate(e => getComputedStyle(e).animationName)).toContain("brick-progress-circle-arc");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(arc).toHaveCSS("animation-name", "none");
  expect(await arc.evaluate(e => parseFloat(getComputedStyle(e).strokeDasharray))).toBeGreaterThan(0);
});
