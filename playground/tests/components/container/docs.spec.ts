import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("docs navigation, props and exact source", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/container");
  await expect(page.getByRole("tablist")).toHaveCount(7);
  await expect(
    page.getByRole("table", { name: "Container props" }).getByRole("rowheader"),
  ).toHaveText(["measure", "gutter", "as", "asChild"]);
  await expect(
    page.locator("[data-example-canvas] .brick-container").first(),
  ).toHaveCSS("border-width", "0px");
  await page
    .getByRole("tablist", { name: "Container view", exact: true })
    .getByRole("tab", { name: "Code", exact: true })
    .click();
  const code = page
    .getByRole("tabpanel")
    .filter({ hasText: "export function ContainerBasic" });
  await expect(code).toBeVisible();
  await expect(code).toContainText("return (");
  await expect(code).not.toContainText("data-testid");
  await page
    .getByRole("navigation", { name: "On this page" })
    .getByRole("link", { name: "Props", exact: true })
    .click();
  await expect(page).toHaveURL(/#props$/);
  expect(
    (
      await new AxeBuilder({ page })
        .include('[data-component-page="container"]')
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("docs containment, gutters and child alignment", async ({ page }) => {
  await page.goto("/container");
  for (const width of [320, 768, 1600]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const dir of ["ltr", "rtl"]) {
      await page
        .locator("[data-example-canvas]")
        .evaluateAll(
          (els, direction) =>
            els.forEach((el) => el.setAttribute("dir", direction)),
          dir,
        );
      const gutters = page.locator("#gutters .brick-container");
      const expected = [
        0,
        Math.min(16, Math.max(12, width * 0.02)),
        Math.min(32, Math.max(16, width * 0.03)),
        Math.min(64, Math.max(16, width * 0.04)),
      ];
      for (let i = 0; i < expected.length; i++) {
        const padding = await gutters
          .nth(i)
          .evaluate((el) =>
            parseFloat(getComputedStyle(el).paddingInlineStart),
          );
        // Engines quantize fractional CSS pixels differently.
        expect(Math.abs(padding - expected[i])).toBeLessThan(0.05);
      }
      const stack = page.locator(
        "#centered-content .brick-container > .brick-stack",
      );
      const parent = (await stack.boundingBox())!;
      const child = (await stack
        .locator(":scope > .brick-surface")
        .boundingBox())!;
      expect(child.x + child.width / 2).toBeCloseTo(
        parent.x + parent.width / 2,
        0,
      );
      const regions = page.locator("#shared-alignment .brick-container");
      const a = (await regions.nth(0).boundingBox())!;
      const b = (await regions.nth(1).boundingBox())!;
      expect(a.x).toBeCloseTo(b.x, 1);
      expect(a.width).toBeCloseTo(b.width, 1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
  }
});

test("real measures cap at their declared values in an unconstrained evidence parent", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/container");
  // Move the actual rendered specimens to a wide test-only parent, not a
  // scaled docs illustration or a substitute implementation.
  await page.locator("#measures [data-example-canvas]").evaluate((canvas) => {
    document.body.append(canvas);
    Object.assign((canvas as HTMLElement).style, {
      width: "1800px",
      padding: "0",
      border: "0",
    });
    document.documentElement.style.fontSize = "16px";
  });
  const roots = page.locator("body > [data-example-canvas] .brick-container");
  for (const [i, width] of [672, 1024, 1152, 1440, 1800].entries()) {
    expect((await roots.nth(i).boundingBox())!.width).toBeCloseTo(width, 1);
  }
});
