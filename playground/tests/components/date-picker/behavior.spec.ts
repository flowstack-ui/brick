import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("focused examples expose matching capabilities and conditional clear", async ({ page }) => {
  await page.goto("/date-picker");
  for (const id of ["disabled", "readonly", "defaultview", "defaultvalue", "controlled", "range", "multiple", "monthrange", "year", "yearrange", "minmax", "unavailable", "localization", "persian", "outside", "inputgroup", "clear", "header", "monthyear", "months", "presets", "sidebar", "today", "datetime", "weeks", "openclick"]) {
    await expect(page.locator("#" + id).getByRole("heading")).toBeVisible();
  }
  await expect(page.locator("#disabled").getByRole("textbox")).toBeDisabled();
  await expect(page.locator("#readonly").getByRole("textbox")).toHaveAttribute("readonly", "");
  const clear = page.locator("#clear");
  await clear.getByRole("button", { name: "Clear date", exact: true }).click();
  await expect(clear.getByRole("button", { name: "Clear date", exact: true })).toHaveCount(0);
  await clear.getByRole("textbox").fill("09/23/2026");
  await clear.getByRole("textbox").press("Enter");
  await expect(clear.getByRole("button", { name: "Clear date", exact: true })).toBeVisible();
  const range = page.locator("#range");
  await expect(range.locator(".brick-date-input__control")).toHaveCount(2);
  await range.getByRole("textbox", { name: "Start date", exact: true }).fill("09/18/2026");
  await range.getByRole("textbox", { name: "End date", exact: true }).fill("09/23/2026");
  await range.getByRole("textbox", { name: "End date", exact: true }).press("Enter");
  await expect(range.locator('input[name="trip[start]"]')).toHaveValue("2026-09-18");
  await expect(range.locator('input[name="trip[end]"]')).toHaveValue("2026-09-23");
  await page.locator("#localization").getByRole("textbox").fill("23.09.2026");
  await page.locator("#localization").getByRole("textbox").press("Enter");
  await expect(page.locator("#localization").getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
});
test("new popup compositions open and keep one dialog owner", async ({ page }) => {
  await page.goto("/date-picker");
  for (const id of ["defaultview", "controlled", "range", "multiple", "monthrange", "year", "yearrange", "persian", "button", "outside", "inputgroup", "header", "monthyear", "months", "presets", "today", "datetime", "weeks"]) {
    const trigger = page.locator("#" + id).getByRole("button", { name: /Choose date|انتخاب تاریخ/ }).first();
    await trigger.click();
    const popup = page.getByRole("dialog");
    await expect(popup).toHaveCount(1);
    await expect(popup).toBeVisible();
    await expect(popup.locator('[data-slot="popover-viewport"]')).toHaveCSS("padding-top", "12px");
    await expect(popup.locator(".brick-calendar")).toHaveCSS("padding-top", "0px");
    if (id === "monthyear") await expect(popup.getByRole("combobox")).toHaveCount(2);
    if (id === "months") await expect(popup.locator("table")).toHaveCount(2);
    if (id === "weeks") await expect(popup.locator("tbody tr")).toHaveCount(6);
    if (id === "datetime") await expect(popup.getByRole("spinbutton", { name: "AM/PM", exact: true })).toBeVisible();
    if (id === "persian") await expect(popup).toContainText("۱۴۰۵");
    const box = (await popup.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    await page.keyboard.press("Escape");
    await expect(popup).toHaveCount(0);
  }
  await page.locator("#openclick").getByRole("textbox").click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
test("range and custom popup layouts fit a narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/date-picker");
  const range = page.locator("#range");
  await expect(range.getByText("↓", { exact: true })).toBeVisible();
  const first = (await range.locator(".brick-date-input__control").first().boundingBox())!;
  const last = (await range.locator(".brick-date-input__control").last().boundingBox())!;
  expect(last.y).toBeGreaterThan(first.y + first.height);
  for (const id of ["range", "presets", "datetime", "months", "outside", "defaultview"]) {
    await page.locator("#" + id).getByRole("button", { name: "Choose date", exact: true }).click();
    const popup = page.getByRole("dialog");
    await expect(popup).toBeVisible();
    expect(await popup.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    const box = (await popup.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
    await page.keyboard.press("Escape");
  }
});
test("period codecs, range presets and popup time commit canonical values", async ({ page }) => {
  await page.goto("/date-picker");
  for (const [id, start, end, canonicalStart, canonicalEnd] of [
    ["monthrange", "09/2026", "11/2026", "2026-09-01", "2026-11-01"],
    ["yearrange", "2026", "2028", "2026-01-01", "2028-01-01"],
  ]) {
    const root = page.locator("#" + id);
    await root.getByRole("textbox", { name: "Start date", exact: true }).fill(start);
    await root.getByRole("textbox", { name: "End date", exact: true }).fill(end);
    await root.getByRole("textbox", { name: "End date", exact: true }).press("Enter");
    await expect(root.locator('input[name="' + id + '[start]"]')).toHaveValue(canonicalStart);
    await expect(root.locator('input[name="' + id + '[end]"]')).toHaveValue(canonicalEnd);
  }
  const presets = page.locator("#presets");
  await presets.getByRole("button", { name: "Choose date", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Last 7 days", exact: true }).click();
  await expect(presets.locator('input[name="reportPeriod[start]"]')).toHaveValue("2026-09-12");
  await expect(presets.locator('input[name="reportPeriod[end]"]')).toHaveValue("2026-09-18");
  const datetime = page.locator("#datetime");
  await datetime.getByRole("button", { name: "Choose date", exact: true }).click();
  await page.getByRole("dialog").getByRole("spinbutton", { name: "Hour", exact: true }).press("ArrowUp");
  await expect(datetime.locator('input[name="appointment"]')).toHaveValue("2026-09-18T15:30:00-04:00[America/New_York]");
});
test("custom codec, native Fieldset and RHF examples remain usable", async ({ page }) => {
  await page.goto("/date-picker");
  const custom = page.getByRole("textbox", { name: "Review date (DD/MM/YYYY)", exact: true });
  await custom.fill("31/02/2026");
  await custom.press("Enter");
  await expect(custom).toHaveAttribute("aria-invalid", "true");
  await custom.fill("23/09/2026");
  await custom.press("Enter");
  await expect(custom).not.toHaveAttribute("aria-invalid", "true");
  await expect(custom).toHaveValue("23/09/2026");
  const fieldset = page.getByRole("group", { name: "Delivery details", exact: true });
  await page.getByRole("button", { name: "Disable dates", exact: true }).click();
  await expect(fieldset.getByRole("textbox")).toBeDisabled();
  await expect(fieldset.getByRole("button", { name: "Choose date", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Enable dates", exact: true }).click();
  await expect(fieldset.getByRole("textbox")).toBeEnabled();
  const save = page.getByRole("button", { name: "Save date", exact: true });
  const form = save.locator("xpath=ancestor::form");
  await save.click();
  await expect(form.getByRole("status")).toHaveText("Choose a review date.");
  const input = form.getByRole("textbox", { name: "Review date", exact: true });
  await expect(input).toBeFocused();
  await input.fill("2026-09-23");
  await input.press("Tab");
  await save.click();
  await expect(form.getByRole("status")).toHaveText("Saved");
});
test("typed selection owns opening focus and day navigation moves seven days", async ({ page }) => {
  await page.goto("/date-picker");
  const input = page.getByRole("textbox", { name: "Delivery date", exact: true }).first();
  await input.fill("09/21/2026"); await input.press("Enter");
  const root = input.locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " brick-date-picker ")][1]');
  await root.getByRole("button", { name: "Choose date", exact: true }).click();
  const popup = page.getByRole("dialog", { name: "Delivery date calendar", exact: true });
  await expect(popup.locator('button[data-value="2026-09-21"]')).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(popup.locator('button[data-value="2026-09-28"]')).toBeFocused();
  await page.keyboard.press("Escape");
  await input.fill("02/30/2026"); await input.press("Tab");
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(root.locator('input[name="delivery"]')).toHaveValue("");
});
test("month view focuses its period and commits a month-start date", async ({ page }) => {
  await page.goto("/date-picker");
  const input = page.getByRole("textbox", { name: "Billing month", exact: true });
  const root = input.locator('xpath=ancestor::*[contains(concat(" ", normalize-space(@class), " "), " brick-date-picker ")][1]');
  await root.getByRole("button", { name: "Choose date", exact: true }).click();
  const popup = page.getByRole("dialog", { name: "Billing month calendar", exact: true });
  await expect(popup.getByRole("button", { name: "September 2026", exact: true })).toBeFocused();
  await popup.getByRole("button", { name: "October 2026", exact: true }).click();
  await expect(popup).toHaveCount(0);
  await expect(input).toHaveValue("10/2026");
});
test("DatePicker selects, restores focus and stays within viewport bounds", async ({ page }) => {
  await page.goto("/date-picker?qualification=1");
  const trigger = page.getByRole("button", { name: "Choose date", exact: true });
  await trigger.click();
  const popup = page.getByRole("dialog", { name: "Delivery calendar" });
  await expect(popup).toBeVisible();
  await expect(popup).toHaveCSS("opacity", "1");
  const box = await popup.boundingBox(); const viewport = page.viewportSize()!;
  expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
  const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(results.violations.filter(item => ["serious", "critical"].includes(item.impact!))).toEqual([]);
  await popup.locator('button[data-value="2026-09-09"]').click();
  await expect(popup).toHaveCount(0); await expect(trigger).toBeFocused();
  await expect(page.locator('input[name="delivery"]')).toHaveValue("2026-09-09");
});

test("surface recipes preserve transparent outline and filled surface", async ({ page }) => {
  await verifyFormSurfaceRecipes(page, "date-picker", ".brick-date-picker", ".brick-date-input__control");
});
test("DatePicker Escape leaves the parent Dialog open", async ({ page }) => {
  await page.goto("/date-picker?qualification=1"); await page.getByRole("button", { name: "Schedule in dialog" }).click();
  const dialog = page.getByRole("dialog", { name: "Schedule delivery" });
  await dialog.getByRole("button", { name: "Choose date", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Delivery calendar" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Delivery calendar" })).toHaveCount(0);
  await expect(dialog).toBeVisible();
});
test("nested DatePicker accepts pointer selection above the parent Dialog", async ({ page }) => {
  await page.goto("/date-picker?qualification=1");
  await page.getByRole("button", { name: "Schedule in dialog" }).click();
  const parent = page.getByRole("dialog", { name: "Schedule delivery", exact: true });
  const trigger = parent.getByRole("button", { name: "Choose date", exact: true });
  await trigger.click();
  const popup = page.getByRole("dialog", { name: "Delivery calendar", exact: true });
  const day = popup.locator('button[data-value="2026-09-09"]');
  await day.click();
  await expect(popup).toHaveCount(0);
  await expect(parent).toBeVisible();
  await expect(parent.locator('input[name="delivery"]')).toHaveValue("2026-09-09");
  await expect(trigger).toBeFocused();
});
test("DatePicker range commits both endpoints before closing", async ({ page }) => {
  await page.goto("/date-picker?qualification=1"); await page.getByRole("button", { name: "Choose travel dates" }).click();
  const popup = page.getByRole("dialog", { name: "Travel calendar" });
  await popup.locator('button[data-value="2026-09-17"]').first().click();
  await expect(popup).toBeVisible();
  await popup.locator('button[data-value="2026-09-19"]').first().click();
  await expect(popup).toHaveCount(0);
  await expect(page.locator('input[name="travel[start]"]')).toHaveValue("2026-09-17");
  await expect(page.locator('input[name="travel[end]"]')).toHaveValue("2026-09-19");
});
test("controlled selection, constraints and custom trigger keep their public contracts", async ({ page }) => {
  await page.goto("/date-picker?qualification=1");
  const controlled = page.getByRole("region", { name: "Controlled selection", exact: true });
  await controlled.getByRole("button", { name: "Clear date" }).click();
  await expect(controlled.getByRole("status")).toHaveText("No appointment selected");
  await controlled.getByRole("button", { name: "Reset appointment" }).click();
  await expect(controlled.getByRole("status")).toHaveText("2026-09-05");
  await page.getByRole("button", { name: "Choose available delivery", exact: true }).click();
  const calendar = page.getByRole("dialog", { name: "available delivery calendar", exact: true });
  await expect(calendar.locator('button[data-value="2026-09-06"]')).toHaveAttribute("data-unavailable", "");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Choose disabled delivery", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Choose readOnly delivery", exact: true })).toBeDisabled();
  const custom = page.getByRole("button", { name: "Choose project date", exact: true });
  const box = await custom.boundingBox();
  expect(box!.width).toBeGreaterThan(box!.height * 2);
  await custom.click();
  const project = page.getByRole("dialog", { name: "Project calendar", exact: true });
  await expect(project.getByRole("combobox")).toHaveCount(2);
});
test("polished month labels, chips, inline sidebar and multi-month heading", async ({ page }) => {
  await page.goto("/date-picker");
  await page.locator("#defaultview").getByRole("button", { name: "Choose date", exact: true }).click();
  let popup = page.getByRole("dialog");
  await expect(popup.getByRole("button", { name: "September 2026", exact: true })).toHaveText("Sep");
  expect((await popup.locator("table").boundingBox())!.width).toBeGreaterThan(240);
  await page.keyboard.press("Escape");
  await page.locator("#months").getByRole("button", { name: "Choose date", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("September 2026 - October 2026");
  await page.keyboard.press("Escape");
  const multiple = page.locator("#multiple");
  await multiple.getByRole("button", { name: "Choose date", exact: true }).click();
  popup = page.getByRole("dialog");
  await popup.locator('button[data-value="2026-09-21"]').click();
  await popup.locator('button[data-value="2026-09-23"]').click();
  await page.keyboard.press("Escape");
  await expect(multiple.getByRole("button", { name: "Remove Sep 21", exact: true })).toBeVisible();
  await multiple.getByRole("button", { name: "Remove Sep 21", exact: true }).click();
  await expect(multiple.getByRole("button", { name: "Choose date", exact: true })).toBeFocused();
  await expect(multiple.locator('input[name="meetings"]')).toHaveValue("2026-09-23");
  const sidebar = page.locator("#sidebar");
  await expect(sidebar.getByRole("grid")).toBeVisible();
  await sidebar.getByRole("button", { name: /Tomorrow/ }).click();
  await expect(sidebar.locator('button[data-value="2026-09-19"]')).toHaveAttribute("data-selected", "");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("full month names, header weight and dialog corner dismissal", async ({ page }) => {
  await page.goto("/date-picker");
  await page.locator("#month").getByRole("button", { name: "Choose date", exact: true }).click();
  const month = page.getByRole("dialog").getByRole("button", { name: "September 2026", exact: true });
  await expect(month).toHaveText("September");
  await expect(month).toHaveCSS("white-space", "nowrap");
  expect(await month.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  await page.keyboard.press("Escape");
  await page.locator("#header").getByRole("button", { name: "Choose date", exact: true }).click();
  expect(Number(await page.getByRole("dialog").locator(".brick-calendar__range-text").evaluate(el => getComputedStyle(el).fontWeight))).toBeGreaterThanOrEqual(500);
  await page.keyboard.press("Escape");
  await page.locator("#dialog").getByRole("button", { name: "Schedule delivery", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Schedule delivery", exact: true });
  const close = dialog.getByRole("button", { name: "Close", exact: true });
  const bounds = (await dialog.boundingBox())!;
  const corner = (await close.boundingBox())!;
  expect(corner.x).toBeGreaterThan(bounds.x + bounds.width / 2);
  expect(corner.y).toBeLessThan(bounds.y + bounds.height / 2);
  await close.click();
  await expect(dialog).toHaveCount(0);
});
