import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/data-grid"); });

test("entry, child editing, arrows, escape and tab exit", async ({ page }) => {
  const basic = page.getByRole("grid", { name: "Project estimates" }).first();
  await basic.focus();
  await expect(basic.locator("[data-active]")).toHaveText("Project");
  await page.keyboard.press("ArrowRight");
  await expect(basic.locator("[data-active]")).toHaveText("Owner");
  const root = page.getByRole("grid", { name: "Edit project", exact: true });
  await root.locator("tbody td").first().click({ position: { x: 2, y: 2 } });
  await page.keyboard.press("F2");
  const input = root.getByRole("textbox");
  await expect(input).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(input).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(root).toBeFocused();
  await expect(root.locator("[data-active]")).toHaveAttribute("aria-colindex", "1");
  await page.keyboard.press("Tab");
  await expect(root).not.toBeFocused();
  await expect(input).not.toBeFocused();
});

test("resize keyboard, drag and cancellation", async ({ page }) => {
  const root = page.getByRole("grid", { name: "Resizable projects" });
  await root.focus();
  await page.keyboard.press("F2");
  const handle = root.getByRole("separator");
  await expect(handle).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "250");
  await page.keyboard.press("Escape");
  await expect(root).toBeFocused();
  await handle.scrollIntoViewIfNeeded();
  const box = (await handle.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2);
  await expect(handle).toHaveAttribute("aria-valuenow", "290");
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await expect(handle).toHaveAttribute("aria-valuenow", "250");
});

test("actual sizes, density and responsive geometry", async ({ page }) => {
  const rows = page.locator("#sizes .brick-data-grid tbody tr:first-child");
  expect(await rows.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height))).toEqual([40,48,56]);
  const densities = page.locator("#density .brick-data-grid tbody tr:first-child");
  const heights = await densities.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(heights[0]).toBeLessThan(heights[1]); expect(heights[1]).toBeLessThan(heights[2]);
  const grid = page.locator("#responsive .brick-data-grid");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(grid).toHaveCSS("font-size", "14px");
  await expect(grid).toHaveCSS("border-top-width", "0px");
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(grid).toHaveCSS("font-size", "16px");
  await expect(grid).toHaveCSS("border-top-width", "1px");
});

test("virtual navigation retains real active descendants and limited DOM", async ({ page }) => {
  const root = page.getByRole("grid", { name: "Virtual project archive" });
  await root.scrollIntoViewIfNeeded();
  await root.focus();
  await page.keyboard.press("Control+End");
  await expect(root.locator("[data-active]")).toHaveText("1000");
  await expect(root).toHaveAttribute("aria-rowcount", "1001");
  expect(await root.locator("[role=row]").count()).toBeLessThan(40);
  await page.keyboard.press("PageUp");
  await expect(root.locator("[data-active]")).toHaveText("990");
  await page.keyboard.press("Control+Home");
  await expect(root.locator("[data-active]")).toHaveText("Project");
});

test("optional engine filters, sorts and paginates", async ({ page }) => {
  const section = page.locator("#engine");
  const grid = section.getByRole("grid");
  await expect(grid.locator("tbody tr")).toHaveCount(5);
  await section.getByRole("button", { name: "Next", exact: true }).click();
  await expect(grid.locator("tbody tr").first()).toHaveAttribute("aria-rowindex", "7");
  await section.getByRole("textbox").fill("Project 24");
  await expect(grid.locator("tbody tr")).toHaveCount(1);
  await expect(grid).toHaveAttribute("aria-rowcount", "2");
});
