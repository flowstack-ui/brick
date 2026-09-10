import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("Splitter exposes non-drag collapse, restore and bounded resizing", async ({ page }) => {
  await page.goto("/splitter");
  const handle = page.getByRole("separator", { name: "Navigation rail width" });
  await page.getByRole("button", { name: "Collapse rail", exact: true }).click();
  await expect(handle).toHaveAttribute("aria-valuenow", "8");
  await page.getByRole("button", { name: "Expand rail", exact: true }).click();
  await expect(handle).toHaveAttribute("aria-valuenow", "30");
  await handle.focus(); await page.keyboard.press("End");
  await expect(handle).toHaveAttribute("aria-valuenow", "45");
  await page.getByRole("button", { name: "Hide files", exact: true }).click();
  await expect(page.getByRole("separator", { name: "Project files width", exact: true })).toHaveAttribute("aria-valuenow", "0");
  await page.getByRole("button", { name: "Reset workspace", exact: true }).click();
  await expect(page.getByRole("separator", { name: "Project files width", exact: true })).toHaveAttribute("aria-valuenow", "30");
});
test("Splitter accessibility has no serious violations", async ({ page }) => {
  await page.goto("/splitter");
  const result = await new AxeBuilder({ page }).include('[data-component-page="splitter"]').analyze();
  expect(result.violations.filter(v => v.impact === "serious" || v.impact === "critical")).toEqual([]);
});
test("Splitter grip is centered without consuming panel space", async ({ page }) => {
  await page.goto("/splitter");
  const root = page.getByTestId("splitter-workspace");
  const geometry = await root.evaluate(el => {
    const bounds = el.getBoundingClientRect(), grip = el.querySelector(".brick-splitter-indicator")!.getBoundingClientRect();
    const panels = Array.from(el.querySelectorAll(".brick-splitter-panel")).map(p => p.getBoundingClientRect());
    return { root: bounds.width, sum: panels.reduce((s, p) => s + p.width, 0), gap: panels[1]!.left - panels[0]!.right,
      centerY: grip.top + grip.height / 2 - (bounds.top + bounds.height / 2), width: grip.width, height: grip.height };
  });
  expect(Math.abs(geometry.root - geometry.sum)).toBeLessThan(1); expect(Math.abs(geometry.gap)).toBeLessThan(1);
  expect(Math.abs(geometry.centerY)).toBeLessThan(1); expect(geometry.width).toBe(8); expect(geometry.height).toBe(24);
  const trigger = root.getByRole("separator"); await trigger.focus(); await page.keyboard.press("End");
  await expect(trigger).toHaveAttribute("aria-valuenow", "75");
});
test("Vertical grip rotates and focus remains visible", async ({ page }) => {
  await page.goto("/splitter"); const root = page.getByTestId("splitter-vertical");
  const grip = await root.locator(".brick-splitter-indicator").boundingBox(); expect(grip!.width).toBe(24); expect(grip!.height).toBe(8);
  await root.getByRole("separator").focus();
  await expect(root.locator(".brick-splitter-indicator")).toHaveCSS("outline-style", "solid");
  await page.emulateMedia({ forcedColors: "active" }); await expect(root.locator(".brick-splitter-separator")).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});
