import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const registry = readFileSync(new URL("../../src/preview/preview-registry.ts", import.meta.url), "utf8");
const owners = [...registry.matchAll(/^  "([a-z-]+)": \{/gm)].map(match => match[1]);

for (const owner of owners) {
  test(`${owner}: authored scenarios resolve in the isolated document`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto(`/${owner}?isolated=0&testMode=1`, { waitUntil: "domcontentloaded", timeout: 15000 });
    await expect(page.locator("[data-scenario]").first()).toBeVisible();
    const ids = await page.locator("[data-scenario]").evaluateAll(nodes => nodes.map(node => node.getAttribute("data-scenario")!));
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      await page.goto(`/preview.html?component=${owner}&example=${encodeURIComponent(id)}&testMode=1`, { waitUntil: "domcontentloaded", timeout: 15000 });
      await expect(page.locator("html")).toHaveAttribute("data-playground-ready", "true", { timeout: 10000 });
      await expect(page.locator("[data-scenario]")).toHaveCount(1);
      await expect(page.locator("[data-scenario]")).toHaveAttribute("data-scenario", id);
      await expect(page.getByText("This example could not render. Reload to retry.", { exact: true })).toHaveCount(0);
    }
  });
}
