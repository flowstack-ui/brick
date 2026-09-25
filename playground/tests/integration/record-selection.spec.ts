import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("record examples expose their real utility composition in Code", async ({ page }) => {
  for (const owner of ["table", "list", "card"]) {
    await page.goto(`/${owner}${owner === "table" ? "" : "?qualification=1"}`);
    const region = page.locator(owner === "table" ? "#record-workflow" : `#scenario-${owner}-records`);
    await region.getByRole("tab", { name: "Code", exact: true }).click();
    const code = region.getByRole("tabpanel");
    await expect(code).toContainText("useSelection");
    await expect(code).toContainText("ActionDelegate");
    await region.getByRole("tab", { name: "Preview", exact: true }).click();
    await expect(region.getByRole("checkbox", { name: /^Select / }).first()).toBeVisible();
  }
});

test("record presentations retain geometry, contrast hooks and native accessibility", async ({ page }, info) => {
  test.skip(info.project.name !== "chromium", "Visual review lane; interactions run on all projects.");
  for (const owner of ["table", "list", "card"]) {
    for (const appearance of ["light", "dark"]) {
      await page.goto(`/${owner}?appearance=${appearance}${owner === "table" ? "" : "&qualification=1"}`);
      const region = page.locator(owner === "table" ? "#record-workflow" : `#scenario-${owner}-records`);
      await region.scrollIntoViewIfNeeded();
      const checkbox = region.getByRole("checkbox", { name: /^Select / }).filter({ visible: true }).first();
      await checkbox.click();
      await expect(region.locator("[data-selected]").first()).toBeVisible();
      const painted = region.locator(owner === "table" ? "tbody > [data-selected] > td" : "[data-selected]").first();
      await expect(painted).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      await region.screenshot({ path: info.outputPath(`${owner}-${appearance}.png`) });
      const results = await new AxeBuilder({ page }).include(owner === "table" ? "#record-workflow" : `#scenario-${owner}-records`).analyze();
      expect(results.violations).toEqual([]);
      await region.evaluate(el => el.setAttribute("dir", "rtl"));
      await region.screenshot({ path: info.outputPath(`${owner}-${appearance}-rtl.png`) });
      await page.emulateMedia({ forcedColors: "active" });
      await expect(checkbox).toBeChecked();
      await page.emulateMedia({ forcedColors: "none" });
    }
  }
});

test("transactions keep record selection, primary actions and portalled menu independent", async ({ page }) => {
  await page.goto("/table");
  const region = page.locator("#record-workflow");
  const selected = region.getByRole("checkbox", { name: "Select Acme Studio", exact: true });
  await selected.click();
  await expect(region.getByRole("status")).toContainText("1 selected. No record opened");
  const row = region.getByRole("row").filter({ has: page.getByRole("checkbox", { name: "Select Acme Studio", exact: true }) });
  const size = await row.boundingBox();
  const cell = row.getByRole("cell").filter({ hasText: "inv-1042" });
  const background = await cell.evaluate(el => getComputedStyle(el).backgroundColor);
  await cell.hover();
  await expect(cell).toHaveCSS("background-color", background);
  expect((await row.boundingBox())?.height).toBe(size?.height);
  await cell.click();
  await expect(region.getByRole("status")).toContainText("1 selected. Opened Acme Studio");
  await region.getByRole("button", { name: "Actions for Birch Design" }).click();
  await page.getByRole("menuitem", { name: "Preview receipt" }).click();
  await expect(region.getByRole("status")).toContainText("Receipt preview for Birch Design");
  await expect(region.getByRole("button", { name: "Actions for Birch Design" })).toBeFocused();
  await region.getByRole("checkbox", { name: "Select this page" }).click();
  await expect(region.getByRole("status")).toContainText("2 selected");
  await region.getByRole("button", { name: "Next page" }).click();
  await expect(region.getByRole("checkbox", { name: "Select Cedar Labs" })).toBeDisabled();
  await expect(region.getByRole("status")).toContainText("2 selected");
  await region.getByRole("checkbox", { name: "Select this page" }).click();
  await expect(region.getByRole("status")).toContainText("3 selected");
  const actions = page.getByRole("dialog", { name: "Selected transaction actions" });
  await actions.getByRole("button", { name: "Remove selected from demo" }).click();
  await actions.getByRole("button", { name: "Cancel removal" }).click();
  await expect(region.getByRole("status")).toContainText("3 selected");
  await actions.getByRole("button", { name: "Remove selected from demo" }).click();
  await actions.getByRole("button", { name: "Confirm removal" }).click();
  await expect(region.getByRole("status")).toContainText("0 selected. Demo records removed");
  await expect(region.getByRole("textbox", { name: "Filter transactions" })).toBeFocused();
});

test("pagination and dismissed bulk actions preserve truthful selection scope", async ({ page }, info) => {
  await page.goto("/table");
  const region = page.locator("#record-workflow");
  const pages = region.getByRole("navigation", { name: "Transaction pages" });
  await expect(pages.locator('[aria-current="page"]')).toHaveText("1");
  await region.getByRole("checkbox", { name: "Select Acme Studio", exact: true }).click();
  const actions = page.getByRole("dialog", { name: "Selected transaction actions" });
  await expect(actions).toBeVisible();
  await actions.screenshot({ path: info.outputPath("selected-transaction-actions.png") });
  const bounds = await actions.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await actions.getByRole("button", { name: "Dismiss selected actions" }).click();
  await expect(actions).toBeHidden();
  await expect(region.getByRole("checkbox", { name: "Select Acme Studio", exact: true })).toBeChecked();
  await pages.getByRole("button", { name: "Next page" }).click();
  await expect(pages.locator('[aria-current="page"]')).toHaveText("2");
  await expect(region.getByRole("status")).toContainText("1 selected");
  await region.getByRole("textbox", { name: "Filter transactions" }).fill("no matches");
  await expect(region.getByRole("checkbox", { name: "Select this page" })).toBeDisabled();
  await expect(pages.locator('[aria-current="page"]')).toHaveText("1");
  await region.getByRole("button", { name: "Show selected actions" }).click();
  await expect(actions).toBeVisible();
  await actions.getByRole("button", { name: "Clear selection" }).click();
  await expect(actions).toBeHidden();
  await expect(region.getByRole("status")).toContainText("0 selected");
  await expect(region.getByRole("textbox", { name: "Filter transactions" })).toBeFocused();
});

test("user list has checkbox state without option or button row semantics", async ({ page }) => {
  await page.goto("/list?qualification=1");
  const region = page.locator("#scenario-list-records");
  await region.getByRole("checkbox", { name: "Select Ada Chen" }).click();
  await expect(region.getByRole("status")).toContainText("1 selected. No user opened");
  const row = region.getByRole("listitem").first();
  await expect(row).toHaveAttribute("data-selected", "");
  await expect(row).not.toHaveAttribute("aria-selected");
  await row.getByText("Designer", { exact: true }).click();
  await expect(region.getByRole("status")).toContainText("Opened Ada Chen");
  await row.getByRole("button", { name: "Message" }).click();
  await expect(region.getByRole("status")).toContainText("1 selected. Message to Ada Chen");
});

test("inventory selection survives explicit card/table view changes", async ({ page }) => {
  await page.goto("/card?qualification=1");
  const region = page.locator("#scenario-card-records");
  await region.getByRole("checkbox", { name: "Select Studio Keyboard" }).click();
  await expect(region.getByRole("status")).toContainText("1 selected");
  await region.getByRole("button", { name: "Show table" }).click();
  await expect(region.getByRole("checkbox", { name: "Select Studio Keyboard" })).toBeChecked();
  await expect(region.getByRole("article")).toHaveCount(0);
  await region.getByRole("button", { name: "Show cards" }).click();
  await expect(region.getByRole("table")).toHaveCount(0);
  await expect(region.getByRole("checkbox", { name: "Select Studio Keyboard" })).toBeChecked();
  await expect(region.getByRole("checkbox", { name: "Select Pro Display" })).toBeDisabled();
  await region.getByRole("button", { name: "Pro Display", exact: true }).click();
  await expect(region.getByRole("status")).toContainText("Opened Pro Display");
});
