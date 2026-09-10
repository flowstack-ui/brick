import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => { await page.goto("/native-select"); });
test("NativeSelect changes, submits and resets without a proxy", async ({ page }) => {
  await page.getByRole("combobox", { name: "Controlled framework", exact: true }).selectOption("vue");
  await expect(page.getByText("Selected: vue", { exact: true })).toBeVisible();
  const field = page.getByRole("combobox", { name: "Submitted framework", exact: true });
  await field.selectOption("svelte"); await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByText("Submitted: svelte", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(field).toHaveValue("react");
  await expect(page.locator("#native-select-form input[type=hidden]")).toHaveCount(0);
  expect(await page.locator("#native-select-form").evaluate(node => Array.from(new FormData(node as HTMLFormElement)))).toEqual([["framework", "react"], ["region", "eu"]]);
});
test("NativeSelect sizes and variants preserve peer border-box geometry", async ({ page }) => {
  for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]) {
    const row = page.getByTestId(`size-${size}`);
    const heights = await row.locator("select, .brick-input, button").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
    expect(heights).toHaveLength(3);
    expect(Math.abs(heights[0] - heights[1]), `${size}: select/input ${heights.join("/")}`).toBeLessThan(1);
    // Compact Button recipes may be shorter than native form-control floors.
    // A stretched desktop comparison row must not disguise that distinction.
    expect(heights[2]).toBeLessThanOrEqual(heights[0] + 1);
  }
  const heights = await page.locator("#scenario-native-select-variants select").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
  expect(new Set(heights).size).toBe(1);
});
test("NativeSelect native lists, state and logical adornments", async ({ page }) => {
  const list = page.getByRole("listbox", { name: "Multiple frameworks", exact: true });
  await list.selectOption(["vue", "svelte"]); await expect(list).toHaveValues(["vue", "svelte"]);
  const colors = await list.locator("option").evaluateAll(nodes => nodes.map(node => ({ selected: (node as HTMLOptionElement).selected, background: getComputedStyle(node).backgroundColor, image: getComputedStyle(node).backgroundImage })));
  expect(colors[0].background, JSON.stringify(colors)).not.toBe(colors[1].background);
  await expect(page.locator("#scenario-native-select-list .brick-native-select-indicator")).toHaveCount(0);
  await expect(page.getByRole("combobox", { name: "Disabled framework", exact: true })).toBeDisabled();
  await expect(page.getByRole("combobox", { name: "Invalid framework", exact: true })).toHaveAttribute("aria-invalid", "true");
  const rtl = page.locator("#scenario-native-select-appearance .brick-native-select").first();
  const [root, icon] = await Promise.all([rtl.boundingBox(), rtl.locator(".brick-native-select-indicator").boundingBox()]);
  expect(icon!.x).toBeLessThan(root!.x + root!.width / 2);
});
test("NativeSelect accessibility, narrow containment and forced colors", async ({ page }) => {
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 900 });
  for (const root of await page.locator(".brick-native-select").all()) {
    const bounds = await root.evaluate(node => ({ width: node.clientWidth, scroll: node.scrollWidth, label: node.querySelector("select")?.getAttribute("aria-label") }));
    expect(bounds.scroll, JSON.stringify(bounds)).toBeLessThanOrEqual(bounds.width + 1);
  }
  await page.emulateMedia({ forcedColors: "active" });
  const field = page.locator("#scenario-native-select-basic select"); await field.focus();
  expect(await field.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
});
