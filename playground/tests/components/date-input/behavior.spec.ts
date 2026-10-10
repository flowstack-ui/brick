import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("focused docs expose date capabilities and trailing clear alignment", async ({ page }) => {
  // This case measures the horizontal range; the next case covers its narrow stack.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/date-input");
  for (const name of ["Controlled", "Default value", "Leading zeros", "Granularity", "Time only", "Time zone", "Clear trigger", "Date Picker", "Locale", "RTL", "Tones"]) {
    await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
  }
  const clear = page.locator("#clear");
  const action = clear.getByRole("button", { name: "Clear date", exact: true });
  const geometry = await action.evaluate(el => {
    const control = el.parentElement!;
    const segment = control.querySelector('[role="spinbutton"]')!;
    const a = el.getBoundingClientRect(), c = control.getBoundingClientRect(), s = segment.getBoundingClientRect();
    return { end: c.right - a.right, expected: parseFloat(getComputedStyle(control).paddingRight) + parseFloat(getComputedStyle(control).borderRightWidth), centers: Math.abs(a.y + a.height / 2 - s.y - s.height / 2) };
  });
  expect(geometry.end).toBeCloseTo(geometry.expected, 0);
  expect(geometry.end).toBeLessThanOrEqual(5);
  expect(geometry.centers).toBeLessThan(1);
  await action.click();
  await expect(action).toHaveCount(0);
  await expect(clear.locator('[data-placeholder-shown]')).toHaveCount(3);
  const rtlAction = page.locator("#rtl").getByRole("button", { name: "Clear date", exact: true });
  expect(await rtlAction.evaluate(el => {
    const control = el.parentElement!;
    return Math.abs(el.getBoundingClientRect().left - control.getBoundingClientRect().left - parseFloat(getComputedStyle(control).paddingLeft) - parseFloat(getComputedStyle(control).borderLeftWidth));
  })).toBeLessThan(1);
  const neutral = page.getByRole("group", { name: "neutral", exact: true }).getByRole("spinbutton").first();
  const accent = page.getByRole("group", { name: "accent", exact: true }).getByRole("spinbutton").first();
  await neutral.focus();
  const neutralPaint = await neutral.evaluate(el => getComputedStyle(el).backgroundColor);
  await accent.focus();
  expect(await accent.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(neutralPaint);
  await page.getByRole("combobox", { name: "Granularity" }).selectOption("second");
  await expect(page.getByRole("group", { name: "Appointment precision", exact: true }).getByRole("spinbutton", { name: "Second", exact: true })).toBeVisible();
  await expect(page.getByRole("group", { name: "Appointment precision", exact: true }).getByRole("spinbutton", { name: "Time zone", exact: true })).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Meeting time", exact: true }).getByRole("spinbutton", { name: "AM/PM", exact: true })).toBeVisible();
  const range = page.locator("#range");
  await expect(range.locator(".brick-date-input__control")).toHaveCount(2);
  const arrow = range.getByText("→", { exact: true });
  await expect(arrow).toBeVisible();
  expect(await arrow.evaluate(el => !!el.closest('[aria-hidden="true"]'))).toBe(true);
  const arrowBox = (await arrow.boundingBox())!;
  const startBox = (await range.locator(".brick-date-input__control").first().boundingBox())!;
  const endBox = (await range.locator(".brick-date-input__control").last().boundingBox())!;
  expect(arrowBox.x).toBeGreaterThan(startBox.x + startBox.width);
  expect(arrowBox.x + arrowBox.width).toBeLessThan(endBox.x);
  expect(Math.abs(arrowBox.y + arrowBox.height / 2 - startBox.y - startBox.height / 2)).toBeLessThan(1);
  const ids = await range.locator(".brick-date-input__control").evaluateAll(nodes => nodes.map(node => node.id));
  expect(new Set(ids).size).toBe(2);
  await range.getByText("End date", { exact: true }).click();
  await expect(range.getByRole("group", { name: "End date", exact: true }).getByRole("spinbutton").first()).toBeFocused();
  await expect(range.locator('input[name="trip[start]"]')).toHaveValue("2026-09-18");
  await expect(range.locator('input[name="trip[end]"]')).toHaveValue("2026-09-23");
  const zoned = page.getByRole("group", { name: "Zoned date", exact: true });
  await page.getByRole("button", { name: "24-hour clock", exact: true }).click();
  await expect(zoned.getByRole("spinbutton", { name: "AM/PM", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Hide time zone", exact: true }).click();
  await expect(zoned.getByRole("spinbutton", { name: "Time zone", exact: true })).toHaveCount(0);
});
test("range separator follows the stacked narrow layout", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/date-input#range");
  const range = page.locator("#range");
  await expect(range.getByText("↓", { exact: true })).toBeVisible();
  await expect(range.getByText("→", { exact: true })).not.toBeVisible();
  const controls = range.locator(".brick-date-input__control");
  const start = (await controls.first().boundingBox())!;
  const end = (await controls.last().boundingBox())!;
  expect(end.y).toBeGreaterThan(start.y + start.height);
});
test("literal separators do not turn editable outline fields into read-only surfaces", async ({ page }) => {
  await page.goto("/date-input");
  const group = page.getByRole("group", { name: "Appointment date", exact: true }).first();
  const control = group.locator("..");
  await expect(group.locator('[data-type="literal"][data-readonly]')).not.toHaveCount(0);
  await expect(control).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await control.hover();
  await expect(control).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  const time = page.getByRole("group", { name: "Appointment time", exact: true });
  await expect(time.getByRole("spinbutton")).toHaveCount(2);
  const hour = time.getByRole("spinbutton", { name: "Hour", exact: true });
  await hour.focus(); await page.keyboard.press("ArrowUp");
  await expect(page.locator('input[name="time"]')).toHaveValue("2026-09-18T15:30:45-04:00[America/New_York]");
});
test("DateInput aligns shared sizes with Input and preserves editable text", async ({ page }) => {
  await page.goto("/date-input?qualification=1");
  const accessibility = await new AxeBuilder({ page }).include('[data-component-page="date-input"]').analyze();
  expect(accessibility.violations.filter(item => ["serious", "critical"].includes(item.impact!))).toEqual([]);
  for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]) {
    const root = page.getByTestId("date-sizes").locator(`.brick-date-input[data-size="${size}"]`);
    const control = root.locator('.brick-date-input__control');
    const input = root.locator('..').locator('.brick-input');
    const touch = await page.evaluate(() => matchMedia("(any-pointer: coarse)").matches);
    // At 2xs, the 16px editing floor grows the segment line to 24px plus borders.
    const expectedHeight = size === "2xs" && touch ? 26 : (await input.boundingBox())!.height;
    expect((await control.boundingBox())!.height).toBe(expectedHeight);
    const recipeFont = ["2xs", "xs"].includes(size) ? 12 : ["sm", "md"].includes(size) ? 14 : size === "2xl" ? 18 : 16;
    expect(await root.getByRole("spinbutton").first().evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBe(touch ? Math.max(16, recipeFont) : recipeFont);
    await expect(root.getByRole("group").first()).toHaveCSS("gap", "4px");
  }
  expect(await page.getByRole("group", { name: "outline date" }).locator('..').evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
});

test("surface recipes preserve transparent outline and filled surface", async ({ page }) => {
  await verifyFormSurfaceRecipes(page, "date-input", ".brick-date-input", ".brick-date-input__control");
});
test("DateInput exposes granularities and controlled clear without hiding capabilities", async ({ page }) => {
  await page.goto("/date-input?qualification=1");
  const count = async (name: string) => page.getByRole("group", { name, exact: true }).getByRole("spinbutton").count();
  expect(await count("hour precision")).toBeGreaterThan(await count("day precision"));
  expect(await count("second precision")).toBeGreaterThan(await count("minute precision"));
  const controlled = page.getByRole("region", { name: "Controlled and clear", exact: true });
  await controlled.getByRole("button", { name: "Clear date" }).click();
  await expect(controlled.getByRole("status")).toHaveText("No review date");
  await controlled.getByRole("button", { name: "Reset review date" }).click();
  await expect(controlled.getByRole("status")).toHaveText("2026-09-05");
});
test("DateInput required validation focuses segments and reset restores a zoned datetime", async ({ page }) => {
  await page.goto("/date-input?qualification=1");
  await page.getByRole("button", { name: "Validate dates" }).click();
  await expect(page.getByRole("group", { name: "Appointment", exact: true }).getByRole("spinbutton").first()).toBeFocused();
  const segment = page.getByRole("group", { name: "Zoned appointment", exact: true }).getByRole("spinbutton").first();
  await segment.focus(); await page.keyboard.press("ArrowUp");
  await page.getByRole("button", { name: "Reset dates" }).click();
  await expect(page.locator('input[name="zoned"]')).toHaveValue("2026-09-05T14:30:00-04:00[America/New_York]");
});
