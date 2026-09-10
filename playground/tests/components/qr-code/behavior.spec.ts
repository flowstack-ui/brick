import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => { await page.goto("/qr-code"); });
test("all scenarios render and preset frames stay square", async ({ page }) => {
  await expect(page.locator('[data-scenario^="qr-code."]')).toHaveCount(18);
  const sizes = await page.locator('[data-scenario="qr-code.sizes"] .brick-qr-code-frame').evaluateAll(nodes => nodes.map(node => {
    const r = node.getBoundingClientRect(); return [r.width, r.height];
  }));
  expect(sizes).toEqual([40,64,80,120,160,200,240].map(size => [size,size]));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
test("controlled edits recover without stale graphics", async ({ page }) => {
  const scenario = page.locator('[data-scenario="qr-code.controlled"]');
  const pattern = scenario.locator("path");
  const before = await pattern.getAttribute("d");
  await scenario.getByRole("textbox").fill("Hello 🌎");
  await expect(pattern).not.toHaveAttribute("d", before!);
  await scenario.getByRole("textbox").fill("x".repeat(8000));
  await expect(pattern).toHaveCount(0);
  await scenario.getByRole("textbox").fill("Recovered");
  await expect(pattern).toHaveCount(1);
});
test("logo follows the square and dark mode retains scanning paint", async ({ page }) => {
  const root = page.locator('[data-scenario="qr-code.logos"] .brick-qr-code').first();
  await expect(root.locator('[data-slot="qr-code-overlay"]')).toBeVisible();
  await expect.poll(async () => root.evaluate(node => {
    const a = node.querySelector(".brick-qr-code-frame")!.getBoundingClientRect();
    const b = node.querySelector(".brick-qr-code-overlay")!.getBoundingClientRect();
    return Math.abs(a.x+a.width/2-b.x-b.width/2)+Math.abs(a.y+a.height/2-b.y-b.height/2);
  })).toBeLessThan(1);
  const paints = await page.locator('[data-scenario="qr-code.appearance"] .brick-qr-code-frame').evaluateAll(nodes => nodes.slice(0,2).map(node => [getComputedStyle(node.querySelector("path")!).fill, getComputedStyle(node.querySelector("rect")!).fill]));
  expect(paints[0]).toEqual(paints[1]);
  expect(paints[0]).toEqual(["rgb(0, 0, 0)", "rgb(255, 255, 255)"]);
});
test("download and dialog remain usable", async ({ page }) => {
  const scenario = page.locator('[data-scenario="qr-code.download"]');
  const download = page.waitForEvent("download");
  await scenario.getByRole("button", { name: "SVG", exact: true }).click();
  expect((await download).suggestedFilename()).toBe("document.svg");
  await page.getByRole("button", { name: "Share document", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("every logo backing stays square and authored text keeps scanning ink", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    const overlays = page.locator(".brick-qr-code-overlay");
    await expect(overlays).toHaveCount(4);
    for (const overlay of await overlays.all()) {
      await expect.poll(() => overlay.evaluate(node => {
        const box = node.getBoundingClientRect();
        const frame = node.closest(".brick-qr-code")!.querySelector(".brick-qr-code-frame")!.getBoundingClientRect();
        return Math.max(Math.abs(box.width-box.height), Math.abs(box.width-frame.width/3));
      })).toBeLessThan(1);
    }
    const letters = page.locator(".brick-qr-code-overlay > span");
    await expect(letters).toHaveCount(2);
    for (const letter of await letters.all()) {
      await expect(letter).toHaveCSS("color", "rgb(0, 0, 0)");
      const fits = await letter.evaluate(node => {
        const a=node.getBoundingClientRect(), b=node.parentElement!.getBoundingClientRect();
        return a.width<=b.width-8 && a.height<=b.height-8;
      });
      expect(fits).toBeTruthy();
    }
  }
});
test("QR accessibility and alternative actions", async ({ page }) => {
  const result = await new AxeBuilder({page}).include('[data-component-page="qr-code"]').analyze();
  expect(result.violations.filter(v=>v.impact === "serious" || v.impact === "critical")).toEqual([]);
});
