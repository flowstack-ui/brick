import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("today, whole-disabled paint and focused feature examples", async ({ page }) => {
  await page.goto("/calendar");
  for (const id of ["hideoutside", "controlled", "defaultvalue", "selectionrange", "multiple", "bounds", "unavailable", "limit", "numberedweeks", "booking"]) {
    await expect(page.locator("#" + id).getByRole("heading")).toBeVisible();
  }
  const disabled = page.locator('.brick-calendar[aria-label="disabled calendar"]');
  await expect(disabled).toHaveCSS("opacity", "0.5");
  const day = disabled.locator('button[data-value="2026-09-19"]');
  await expect(day).toHaveCSS("opacity", "1");
  await expect(day).toHaveCSS("cursor", "not-allowed");
  await expect(page.locator('.brick-calendar[aria-label="Review date"] button[data-today]')).toHaveCSS("text-decoration-line", "underline");
  const booking = page.locator("#booking");
  await booking.locator('button[data-value="2026-09-21"]').click();
  const slots = booking.locator('.brick-scroll-area-viewport');
  expect(await slots.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  expect((await slots.boundingBox())!.height).toBeLessThanOrEqual(354);
  await expect(booking.getByText("Monday", { exact: true })).toBeVisible();
  await booking.getByRole("button", { name: "09:30", exact: true }).click();
  await expect(booking.getByRole("status")).toContainText("09:30 UTC");
  await booking.locator('button[data-value="2026-09-22"]').click();
  await expect(booking.getByRole("button", { name: "09:30", exact: true })).toHaveAttribute("aria-pressed", "false");
  await expect(booking.getByText("Tuesday", { exact: true })).toBeVisible();
  await expect(booking.locator('button[data-value="2026-09-20"]')).toHaveAttribute("data-unavailable", "");
  await expect(page.getByRole("heading", { name: "Date and Time", exact: true })).toBeVisible();
});
test("Calendar keeps square day targets, keyboard focus and localized grids", async ({ page }) => {
  await page.goto("/calendar?qualification=1");
  const calendar = page.getByTestId("calendar-comfortable");
  // A constrained grid must not make its intrinsic root or popup expand.
  expect((await calendar.boundingBox())!.width).toBeLessThanOrEqual(305);
  const selected = calendar.locator('button[data-value="2026-09-05"]');
  await selected.focus(); await page.keyboard.press("ArrowRight");
  await expect(calendar.locator('button[data-value="2026-09-06"]')).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(calendar.locator('button[data-value="2026-09-06"]')).toHaveAttribute("data-selected", "");
  for (const density of ["comfortable", "compact"]) {
    const box = await page.getByTestId(`calendar-${density}`).locator('[data-slot="calendar-day"]').first().boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
    expect(box!.width).toBeLessThanOrEqual(density === "comfortable" ? 40 : 36);
    expect(box!.width).toBeGreaterThanOrEqual(24);
  }
  const results = await new AxeBuilder({ page }).include('[data-component-page="calendar"]').analyze();
  expect(results.violations.filter(item => ["serious", "critical"].includes(item.impact!))).toEqual([]);
});
test("week numbers, hidden outside days and controlled selection are usable", async ({ page }) => {
  await page.goto("/calendar?qualification=1");
  const weeks = page.locator('.brick-calendar[aria-label="Numbered weeks"]');
  await expect(weeks.locator("thead th")).toHaveCount(8);
  const weekHeader = weeks.locator('th[data-type="week-number"]');
  expect(await weekHeader.evaluate(el => getComputedStyle(el, "::before").content)).toBe('"#"');
  const weekNumber = weeks.locator('td[data-type="week-number"]').first();
  await expect(weekNumber).toHaveAttribute("role", "rowheader");
  await expect(weekNumber).toHaveCSS("cursor", "default");
  expect(await weekNumber.evaluate(el => {
    const probe = document.createElement("span");
    probe.style.color = "var(--brick-color-text-muted)";
    el.append(probe);
    const matches = getComputedStyle(el).color === getComputedStyle(probe).color;
    probe.remove();
    return matches;
  })).toBe(true);
  await expect(weekNumber.locator('button, [tabindex]')).toHaveCount(0);
  const selectedBefore = await weeks.locator('button[data-selected]').allTextContents();
  await weekNumber.click();
  expect(await weeks.locator('button[data-selected]').allTextContents()).toEqual(selectedBefore);
  await expect(weeks.locator("tbody tr")).toHaveCount(6);
  const day = weeks.locator('[data-slot="calendar-day"]').first();
  const box = await day.boundingBox();
  expect(Math.abs(box!.width - box!.height)).toBeLessThan(1);
  await expect(weeks.getByRole("combobox")).toHaveCount(2);
  const custom = page.locator('.brick-calendar[aria-label="Custom days"]');
  await expect(custom.locator('button[data-value="2026-08-31"]')).toBeHidden();
  const controlled = page.getByRole("region", { name: "Controlled date", exact: true });
  await controlled.locator('button[data-value="2026-09-10"]').click();
  await expect(controlled.getByRole("status")).toHaveText("2026-09-10");
  await controlled.getByRole("button", { name: "Reset calendar" }).click();
  await expect(controlled.getByRole("status")).toHaveText("2026-09-05");
});
test("Calendar remains within a narrow page and exposes forced-color focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto("/calendar?qualification=1");
  const root = page.getByTestId("calendar-compact");
  expect((await root.boundingBox())!.width).toBeLessThanOrEqual(390);
  await page.emulateMedia({ forcedColors: "active" });
  await root.locator('button[data-value="2026-09-05"]').focus();
  await expect(root.locator('button[data-value="2026-09-05"]')).toBeFocused();
});
test("multiple months share a desktop row and wrap without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/calendar?qualification=1");
  const root = page.locator('.brick-calendar[aria-label="التاريخ"]');
  const grids = root.locator('.brick-calendar__grid');
  await expect(grids).toHaveCount(2);
  const first = (await grids.nth(0).boundingBox())!, second = (await grids.nth(1).boundingBox())!;
  expect(first.y).toBeCloseTo(second.y, 1);
  await page.setViewportSize({ width: 390, height: 844 });
  const bounds = (await root.boundingBox())!;
  for (const grid of await grids.all()) {
    const box = (await grid.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(bounds.x - 1);
    expect(box.x + box.width).toBeLessThanOrEqual(bounds.x + bounds.width + 1);
  }
});
test("Calendar range and multiple selection retain their separate models", async ({ page }) => {
  await page.goto("/calendar?qualification=1");
  const range = page.locator('.brick-calendar[aria-label="Travel dates"]');
  await range.locator('button[data-value="2026-09-17"]').click();
  await range.locator('button[data-value="2026-09-19"]').click();
  await expect(range.locator('button[data-value="2026-09-17"]')).toHaveAttribute("data-range-start", "");
  await expect(range.locator('button[data-value="2026-09-19"]')).toHaveAttribute("data-range-end", "");
  const multiple = page.locator('.brick-calendar[aria-label="Meeting days"]');
  await multiple.locator('button[data-value="2026-09-07"]').click();
  await expect(multiple.locator('button[data-value="2026-09-07"]')).not.toHaveAttribute("data-selected", "");
  await expect(multiple.locator('button[data-value="2026-09-05"]')).toHaveAttribute("data-selected", "");
});
