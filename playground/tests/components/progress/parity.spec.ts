import { expect, test } from "../../evidence-test.js";

test("unknown work remains painted in forced colors", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  test.skip(!await page.evaluate(() => matchMedia("(forced-colors: active)").matches), "This browser profile does not activate forced-colors emulation.");
  const indicator = page.locator("#indeterminate .brick-progress__indicator");
  await expect(indicator).toHaveCSS("background-image", "none");
  if (await page.evaluate(() => CSS.supports("forced-color-adjust", "none"))) {
    await expect(indicator).toHaveCSS("forced-color-adjust", "none");
  }
  const color = await indicator.evaluate(e => getComputedStyle(e).backgroundColor);
  expect(color).not.toBe("rgba(0, 0, 0, 0)");
  expect((await indicator.boundingBox())!.width).toBeGreaterThan(0);
});

test.beforeEach(async ({ page }) => { await page.goto("/progress"); });

test("documentation shows focused examples and named part tables", async ({ page }) => {
  for (const id of ["usage", "sizes", "variants", "inline", "info-tip", "indeterminate", "stripes", "animated", "buffer", "vertical", "range", "controller", "responsive", "composition", "props-root", "props-provider", "props-context", "props-track"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.getByTestId("progress-workbench")).toHaveCount(0);
  const basic = page.getByRole("progressbar", { name: "Upload files" }).first();
  expect((await basic.boundingBox())!.width).toBeLessThanOrEqual(321);
});

test("track thickness, inline alignment and responsive recipes match the contract", async ({ page }) => {
  for (const [size, height] of [["xs", 6], ["sm", 8], ["md", 10], ["lg", 12], ["xl", 16]] as const) {
    await expect(page.locator(`#sizes .brick-progress[data-size="${size}"] .brick-progress__track`)).toHaveCSS("height", `${height}px`);
  }
  const inline = page.locator("#inline .brick-progress");
  const centers = await inline.locator(".brick-progress__label, .brick-progress__track, .brick-progress__value").evaluateAll(elements => elements.map(e => { const r = e.getBoundingClientRect(); return r.y + r.height / 2; }));
  expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#responsive .brick-progress__track")).toHaveCSS("height", "8px");
  await page.setViewportSize({ width: 1100, height: 900 });
  await expect(page.locator("#responsive .brick-progress__track")).toHaveCSS("height", "12px");
  await expect(page.locator("#responsive .brick-progress__track")).toHaveCSS("box-shadow", "none");
});

test("stripes, controller, raw formatting and reduced motion remain independent", async ({ page }) => {
  const staticStripe = page.locator("#stripes .brick-progress__indicator");
  await expect(staticStripe).toHaveCSS("animation-name", "none");
  expect(await staticStripe.evaluate(e => getComputedStyle(e).backgroundImage)).toContain("linear-gradient");
  await expect(page.locator("#animated .brick-progress__indicator")).toHaveCSS("animation-name", "brick-progress-stripes");
  await page.locator("#controller").getByRole("button", { name: "Advance" }).click();
  await expect(page.locator("#controller").getByRole("progressbar")).toHaveAttribute("aria-valuenow", "30");
  await expect(page.locator("#range .brick-progress__value")).toHaveText("3 / 5");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of ["animated", "indeterminate"]) await expect(page.locator(`#${id} .brick-progress__indicator`)).toHaveCSS("animation-name", "none");
  const tip = page.locator("#info-tip").getByRole("button", { name: "Info", exact: true });
  expect(await tip.evaluate(e => e.closest('[role="progressbar"]'))).toBeNull();
});
