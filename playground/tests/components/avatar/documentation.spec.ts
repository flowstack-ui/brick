import { expect, test } from "@playwright/test";

test("docs expose compact sizes, native images and full-cell fallback geometry", async ({ page }) => {
  await page.goto("/avatar?appearance=light");
  const basic = page.getByRole("tabpanel", { name: "Preview", exact: true }).first();
  const image = basic.locator("img");
  await expect(image).toHaveAttribute("data-state", "loaded");
  await expect(image).toBeVisible();
  const sizes = await page.locator("#sizes .brick-avatar").evaluateAll(elements => elements.map(e => ({
    width: e.getBoundingClientRect().width,
    height: e.getBoundingClientRect().height,
    fallback: e.querySelector(".brick-avatar__fallback")!.getBoundingClientRect().width,
  })));
  expect(sizes.map(s => s.width)).toEqual([24,32,36,40,44,48,64,96,112,128]);
  for (const size of sizes) { expect(size.height).toBe(size.width); expect(size.fallback).toBe(size.width); }
  const icon = basic.locator("svg");
  expect((await icon.boundingBox())!.width).toBe(20);
  await expect(page.getByRole("table", { name: "Avatar.Image props", exact: true })).toBeAttached();
});

test("outline stays transparent and loading controls restore identity", async ({ page }) => {
  await page.goto("/avatar?appearance=dark");
  const colors = await page.locator('#recipes .brick-avatar[data-variant="outline"]').evaluateAll(elements => elements.map(e=>getComputedStyle(e).backgroundColor));
  expect(colors).toEqual(["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"]);
  const section = page.locator("#loading");
  await section.getByRole("button", { name: "Load image", exact: true }).click();
  await expect(section.locator(".brick-avatar")).toHaveAttribute("data-state", "loaded");
  await section.getByRole("button", { name: "Fail image", exact: true }).click();
  await expect(section.locator(".brick-avatar")).toHaveAttribute("data-state", "error");
  await expect(section.getByRole("img", { name: "Brick workspace" })).toHaveText("B");
  await section.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(section.locator(".brick-avatar")).toHaveAttribute("data-state", "idle");
});

test("group defaults, borderless geometry and RTL remain contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/avatar-group?appearance=dark&exampleDirection=rtl");
  const groups = page.locator("#presentation .brick-avatar-group");
  await expect(groups).toHaveCount(2);
  const rings = await groups.nth(1).locator(".brick-avatar").evaluateAll(elements => elements.map(e => getComputedStyle(e).getPropertyValue("--brick-avatar-outline-width").trim()));
  expect(rings).toEqual(["0px", "0px", "0px"]);
  await expect(groups.first().locator(".brick-avatar").last()).toHaveAttribute("data-tone", "neutral");
  for (const avatar of await page.locator("[data-component-page] .brick-avatar").all()) {
    const box = await avatar.boundingBox();
    if (box) { expect(box.width).toBe(box.height); expect(box.x + box.width).toBeLessThanOrEqual(390); }
  }
});
