import { expect, type Page } from "./evidence-test.js";

/** Shared assertions; every owner runs them against its real public examples. */
export async function verifyFormSurfaceRecipes(
  page: Page,
  owner: string,
  rootSelector: string,
  planeSelector = "",
) {
  for (const appearance of ["light", "dark"]) {
    await page.goto(`/${owner}?appearance=${appearance}`);
    const root = (variant: string) =>
      page.locator(`${rootSelector}[data-variant="${variant}"]`).first();
    const plane = (variant: string) =>
      planeSelector ? root(variant).locator(planeSelector).first() : root(variant);
    const outline = plane("outline");
    const surface = plane("surface");
    await expect(outline).toBeVisible();
    await expect(surface).toBeVisible();
    await expect(outline).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    const raised = await surface.evaluate(element => {
      const probe = document.createElement("span");
      probe.style.backgroundColor = "var(--brick-color-surface-raised)";
      element.parentElement!.append(probe);
      const value = getComputedStyle(probe).backgroundColor;
      probe.remove();
      return value;
    });
    expect(raised).not.toBe("rgba(0, 0, 0, 0)");
    await expect(surface).toHaveCSS("background-color", raised);
    const before = await surface.boundingBox();
    await surface.hover();
    await expect(surface).toHaveCSS("background-color", raised);
    expect((await surface.boundingBox())!.height).toBe(before!.height);
    await outline.hover();
    await expect(outline).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(surface).toHaveCSS("box-sizing", "border-box");
    const surfaceBorder = await surface.evaluate(e => getComputedStyle(e).borderBottomWidth);
    expect(parseFloat(surfaceBorder)).toBeGreaterThan(0);
    // Variant must stay on the visual owner, never leak to native controls.
    await expect(page.locator("input[variant], textarea[variant], select[variant]")).toHaveCount(0);
    await page.emulateMedia({ forcedColors: "active" });
    await expect(surface).not.toHaveCSS("border-bottom-color", "rgba(0, 0, 0, 0)");
    await page.emulateMedia({ forcedColors: "none" });
  }
}
