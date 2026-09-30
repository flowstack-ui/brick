import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("docs examples preserve geometry, semantics, and real source", async ({ page }) => {
  await page.goto("/center");
  const basic = page.locator("[data-example-canvas] .brick-center").first();
  const content = basic.locator(".brick-text");
  await expect(basic).toHaveCSS("height", "100px");
  const parent = (await basic.boundingBox())!;
  const child = (await content.boundingBox())!;
  expect(child.x + child.width / 2).toBeCloseTo(parent.x + parent.width / 2, 0);
  expect(child.y + child.height / 2).toBeCloseTo(parent.y + parent.height / 2, 0);
  const inline = page.locator("#inline a .brick-center");
  await expect(inline).toHaveCSS("display", "inline-flex");
  await expect(inline).toHaveCSS("align-items", "center");
  const labelBox = (await inline.locator(".brick-text").boundingBox())!;
  const iconBox = (await inline.locator(".brick-icon").boundingBox())!;
  expect(labelBox.y + labelBox.height / 2).toBeCloseTo(iconBox.y + iconBox.height / 2, 0);
  await expect(page.locator("#inline [data-example-canvas]").getByRole("link", { name: "Learn about Center", exact: true })).toBeVisible();
  await expect(page.locator("#inline [data-example-canvas]").getByRole("link", { name: "centering content", exact: true })).toBeVisible();
  const sentenceLink = page.locator("#inline [data-example-canvas] a.brick-center");
  await expect(sentenceLink).toHaveCSS("vertical-align", "baseline");
  await expect(sentenceLink).toHaveCSS("align-items", "center");
  const textOffset = await sentenceLink.evaluate(link => {
    const before = document.createRange();
    before.selectNodeContents(link.previousSibling!);
    const content = document.createRange();
    content.selectNodeContents(link.querySelector(".brick-link__content")!);
    return content.getBoundingClientRect().top - before.getBoundingClientRect().top;
  });
  expect(Math.abs(textOffset)).toBeLessThan(0.5);
  for (const appearance of ["light", "dark"]) {
    await page.evaluate(value => { document.documentElement.dataset.brickAppearance = value; }, appearance);
    for (const width of [320, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const dir of ["ltr", "rtl"]) {
        await page.locator('[data-component-page="center"]').evaluate((el, value) => el.setAttribute("dir", value), dir);
        for (const shape of await page.locator("#square .brick-square, #circle .brick-circle").all()) {
          const box = (await shape.boundingBox())!;
          expect(box.width).toBe(box.height);
          const item = (await shape.locator(".brick-text").boundingBox())!;
          expect(item.x + item.width / 2).toBeCloseTo(box.x + box.width / 2, 0);
          expect(item.y + item.height / 2).toBeCloseTo(box.y + box.height / 2, 0);
          if (await shape.evaluate(el => el.classList.contains("brick-circle"))) {
            expect(await shape.evaluate(el => parseFloat(getComputedStyle(el).borderRadius))).toBeGreaterThanOrEqual(box.width / 2);
          } else await expect(shape).toHaveCSS("border-radius", "0px");
        }
        const responsive = page.locator("#responsive .brick-square");
        await expect(responsive).toHaveCSS("width", width >= 1280 ? "48px" : width >= 768 ? "40px" : "32px");
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      }
    }
  }
  await page.getByRole("tablist", { name: "Center view", exact: true }).getByRole("tab", { name: "Code", exact: true }).click();
  const code = page.getByRole("tabpanel").filter({ hasText: "export function CenterBasic" });
  await expect(code).toBeVisible();
  await expect(code).toContainText("return (");
  await expect(code).not.toContainText("data-testid");
});

test("docs navigation, props and accessibility are complete", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/center");
  await expect(page.getByRole("tablist")).toHaveCount(6);
  await expect(page.getByRole("table", { name: "Center props", exact: true }).getByRole("rowheader")).toHaveText(["inline", "as", "asChild"]);
  for (const name of ["Square props", "Circle props"]) {
    await expect(page.getByRole("table", { name, exact: true }).getByRole("rowheader")).toHaveText(["size", "inline", "as", "asChild"]);
  }
  await page.getByRole("navigation", { name: "On this page" }).getByRole("link", { name: "Props", exact: true }).click();
  await expect(page).toHaveURL(/#props$/);
  const results = await new AxeBuilder({ page }).include('[data-component-page="center"]').analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath("center-docs-review.png"), fullPage: true });
});
