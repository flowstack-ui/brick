import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

const contract = JSON.parse(
  readFileSync(
    new URL("../../component-evidence-contract.json", import.meta.url),
    "utf8",
  ),
) as {
  reviewStandards: { labeledSpecimenOwners: string[] };
};

for (const owner of contract.reviewStandards.labeledSpecimenOwners) {
  test(`${owner} keeps labeled specimens separated and contained`, async ({ page }) => {
    for (const viewport of [
      { width: 1280, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(`/${owner}`);
      await expect(page.locator(`[data-component-page="${owner}"]`)).toBeVisible();
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);

      const specimens = page.locator(".playground-specimen");
      expect(await specimens.count()).toBeGreaterThan(0);
      const relationships = await specimens.evaluateAll((nodes) =>
        nodes.map((node) => {
          const label = node.querySelector(".playground-specimen-label");
          const preview = node.querySelector(".playground-specimen__preview");
          const labelBox = label?.getBoundingClientRect();
          const previewBox = preview?.getBoundingClientRect();
          const specimenBox = node.getBoundingClientRect();
          return {
            gap: labelBox && previewBox ? previewBox.top - labelBox.bottom : -1,
            labelContained: Boolean(labelBox) &&
              labelBox!.left >= specimenBox.left - 0.5 &&
              labelBox!.right <= specimenBox.right + 0.5,
            ordered: Boolean(labelBox && previewBox) && previewBox!.top >= labelBox!.bottom,
          };
        }),
      );
      expect(relationships.every(({ gap }) => gap >= 8)).toBe(true);
      expect(relationships.every(({ labelContained }) => labelContained)).toBe(true);
      expect(relationships.every(({ ordered }) => ordered)).toBe(true);
    }
  });
}
