import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/action-bar");
});
test("docs expose selection, code, and part headings", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  for (const name of ["Root", "RootProvider", "Positioner", "Content", "SelectionTrigger", "CloseTrigger", "Portal", "Separator"]) {
    await expect(page.getByRole("heading", { name, exact: true })).toHaveCount(1);
  }
  await page.getByRole("checkbox", { name: "Select project", exact: true }).check();
  const bar = page.getByRole("dialog", { name: "Selected project actions" });
  await expect(bar).toBeVisible();
  const count = bar.getByRole("button", { name: "1 selected", exact: true });
  await expect(count).toBeVisible();
  expect(await count.evaluate(el => getComputedStyle(el).borderTopStyle)).toBe("dashed");
  const geometry = await bar.evaluate(el => ({ radius: getComputedStyle(el).borderRadius, padding: getComputedStyle(el).padding }));
  expect(geometry.radius).toBe("6px");
  expect(geometry.padding).toBe("10px 12px");
  await bar.getByRole("button", { name: "Archive", exact: true }).click();
  await expect(bar).toBeHidden();
  await expect(page.getByRole("status").filter({ hasText: "Project archived." })).toBeVisible();
});
test("external controller opens and dismisses", async ({ page }) => {
  const opener = page.getByRole("button", { name: "Open with controller" });
  // Safari does not focus native buttons on pointer click. Exercise an explicit
  // keyboard focus origin rather than requiring platform-specific click focus.
  await opener.focus();
  await opener.press("Enter");
  const bar = page.getByRole("dialog", { name: "Controller actions" });
  await expect(bar).toBeVisible();
  await expect(opener).toBeFocused();
  await bar.getByRole("button").focus();
  await bar.getByRole("button").press("Enter");
  await expect(bar).toBeHidden();
  await expect(opener).toBeFocused();
});
test("retained content preserves its uncontrolled draft", async ({ page }) => {
  const opener = page.getByRole("checkbox", { name: "Edit selection note" });
  await opener.click();
  const bar = page.getByRole("dialog", { name: "Selection note" });
  await bar.getByRole("textbox", { name: "Note" }).fill("Keep this note");
  await bar.getByRole("button").click();
  await expect(bar).toBeHidden();
  await opener.click();
  await expect(bar.getByRole("textbox", { name: "Note" })).toHaveValue("Keep this note");
});
test("selection details use a nested popover without dismissing the bar", async ({ page }) => {
  await page.getByRole("checkbox", { name: "Select projects to share" }).check();
  const bar = page.getByRole("dialog", { name: "Sharing actions" });
  await bar.getByRole("button", { name: "2 selected" }).click();
  await expect(page.getByRole("dialog", { name: "Selected projects" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Selected projects" })).toBeHidden();
  await expect(bar).toBeVisible();
});

test("confirmation closes its dialog and owning bar", async ({ page }) => {
  await page.getByRole("checkbox", { name: "Select two projects" }).check();
  const bar = page.getByRole("dialog", { name: "Project actions", exact: true });
  await bar.getByRole("button", { name: "Delete projects", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Delete projects?", exact: true });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(bar).toBeHidden();
  await expect(page.getByRole("checkbox", { name: "Select two projects" })).not.toBeChecked();
});

test("placement changes live and checkbox can dismiss the bar", async ({ page }) => {
  const selection = page.getByRole("checkbox", { name: "Select three files" });
  await selection.check();
  const bar = page.getByRole("dialog", { name: "Placement actions" });
  await expect(bar).toBeVisible();
  const placements = page.getByRole("radiogroup", { name: "Action bar placement" });
  for (const [label, placement] of [["Start", "bottom-start"], ["End", "bottom-end"], ["Center", "bottom"]]) {
    await placements.getByRole("radio", { name: label, exact: true }).click();
    await expect(bar).toBeVisible();
    await expect(bar.locator("..")).toHaveAttribute("data-placement", placement);
    await expect(selection).toBeChecked();
  }
  await selection.uncheck();
  await expect(bar).toBeHidden();
});

test("close action clears its selection checkbox", async ({ page }) => {
  const selection = page.getByRole("checkbox", { name: "Select two files" });
  await selection.check();
  const bar = page.getByRole("dialog", { name: "Dismissible actions" });
  await bar.getByRole("button", { name: "Dismiss actions" }).click();
  await expect(selection).not.toBeChecked();
  await expect(bar).toBeHidden();
});

test("normal motion settles and repeated controller cycles return focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const opener = page.getByRole("button", { name: "Open with controller" });
  const bar = page.getByRole("dialog", { name: "Controller actions" });
  for (let cycle = 0; cycle < 2; cycle++) {
    await opener.focus();
    await opener.press("Enter");
    await expect(bar).toBeVisible();
    await expect.poll(() => bar.evaluate(el => getComputedStyle(el).opacity)).toBe("1");
    await bar.getByRole("button").focus();
    await bar.getByRole("button").press("Enter");
    await expect(bar).toBeHidden();
    await expect(opener).toBeFocused();
  }
});
