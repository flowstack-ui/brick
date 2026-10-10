import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const { owners } = JSON.parse(readFileSync(new URL("../../recent-component-capabilities.json", import.meta.url), "utf8")) as {
  owners: Array<{id: string; scenarios: string[]; route?: string}>;
};

for (const owner of owners) {
  test(`${owner.id} renders its complete scenario inventory in order without page overflow`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(owner.route ?? `/${owner.id}?qualification=1`);
      const expected = owner.scenarios.map(id => `scenario-${id.replace(/\./g, "-")}`);
      const sections = page.locator(`[data-scenario^="${owner.id}."]`);
      await expect(sections).toHaveCount(expected.length);
      // The Scenario host is the semantic article/section with its stable ID.
      const actual = await sections.evaluateAll(nodes => nodes.map(node => node.id));
      expect(actual).toEqual(expected);
      for (const id of expected) await expect(page.locator(`[id="${id}"]`)).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const offenders = overflow > 1 ? await page.locator("[data-scenario] *").evaluateAll(nodes => nodes.filter(node => node.getBoundingClientRect().right > innerWidth + 1).slice(0, 12).map(node => ({tag:node.tagName,slot:node.getAttribute("data-slot"),class:node.className,width:node.getBoundingClientRect().width,right:node.getBoundingClientRect().right}))) : [];
      expect(overflow, JSON.stringify(offenders)).toBeLessThanOrEqual(1);
      expect(errors).toEqual([]);
    }
  });
}
