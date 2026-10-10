import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test.beforeEach(async ({ page }) => {
  await page.goto("/table-of-contents");
});
test("current section, bounded article and independent rail", async ({
  page,
}) => {
  const example = page.locator('[data-scenario="table-of-contents.basic"]');
  const nav = example.getByRole("navigation");
  await nav.getByRole("link", { name: "Next steps" }).click();
  await expect(nav.getByRole("link", { name: "Next steps" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(nav.locator('[aria-current="location"]')).toHaveCount(1);
  const article = example.getByRole("region", { name: "Example article" });
  await expect
    .poll(() => article.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(400);
  const title = nav.locator(".brick-table-of-contents__title");
  const link = nav.getByRole("link", { name: "Introduction", exact: true });
  expect(
    Math.abs((await title.boundingBox())!.x - (await link.boundingBox())!.x),
  ).toBeLessThan(1);
  await expect(nav).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});
test("sparse responsive recipes reset cleanly and props parts have anchors", async ({ page }) => {
  const nav = page.locator('[data-scenario="table-of-contents.sizes"] nav').nth(2);
  const link = nav.locator("a").first();
  await page.setViewportSize({width: 700, height: 900});
  await expect(link).toHaveCSS("font-size", "14px");
  await expect(nav).toHaveCSS("padding-inline-start", "0px");
  await page.setViewportSize({width: 900, height: 900});
  await expect(link).toHaveCSS("font-size", "16px");
  await expect(nav).toHaveCSS("padding-inline-start", "16px");
  await page.setViewportSize({width: 1280, height: 900});
  await expect(link).toHaveCSS("font-size", "16px");
  await expect(nav).toHaveCSS("padding-inline-start", "0px");
  await expect(nav.locator('[data-toc-indicator]')).toHaveCSS("visibility", "hidden");
  for (const part of ["root", "provider", "nav", "item", "context"]) {
    await expect(page.locator(`#props-${part} h3`)).toHaveCount(1);
    await expect(page.locator(`#props-${part} table`)).toHaveCount(1);
  }
});
test("size recipes, indentation and indicator geometry", async ({ page }) => {
  const sizes = page.locator('[data-scenario="table-of-contents.sizes"]');
  const small = sizes
    .locator('nav[data-size="sm"] .brick-table-of-contents__link')
    .first();
  const medium = sizes
    .locator('nav[data-size="md"] .brick-table-of-contents__link')
    .first();
  expect(
    parseFloat(await medium.evaluate((el) => getComputedStyle(el).fontSize)),
  ).toBeGreaterThan(
    parseFloat(await small.evaluate((el) => getComputedStyle(el).fontSize)),
  );
  const nested = page.locator('[data-scenario="table-of-contents.nested"]');
  expect(await nested.locator("li li").count()).toBe(2);
  await expect(
    nested.getByRole("link", { name: "Installation", exact: true }),
  ).toHaveCSS("padding-inline-start", "16px");
  const nav = page.locator('[data-scenario="table-of-contents.indicator"] nav');
  await nav.getByRole("link", { name: "Next steps" }).click();
  const marker = nav.locator(".brick-table-of-contents__indicator");
  await expect(marker).toBeVisible();
  await expect
    .poll(async () =>
      Math.abs(
        (await marker.boundingBox())!.y -
          (await nav.getByRole("link", { name: "Next steps" }).boundingBox())!
            .y,
      ),
    )
    .toBeLessThan(2);
});
test("keyboard focus and RTL remain contained", async ({
  page,
  browserName,
}) => {
  const nav = page.locator('[data-scenario="table-of-contents.rtl"] nav');
  await expect(nav).toHaveCSS("direction", "rtl");
  const link = nav.getByRole("link").first();
  await link.focus();
  // WebKit's default macOS keyboard policy uses Option-Tab for native links.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(nav.getByRole("link").nth(1)).toBeFocused();
  await expect(nav.getByRole("link").nth(1)).toHaveCSS(
    "outline-offset",
    "-2px",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("dynamic targets and disclosure composition", async ({ page }) => {
  const dynamic = page.locator('[data-scenario="table-of-contents.dynamic"]');
  await dynamic.getByRole("button", { name: "Toggle final section" }).click();
  await expect(
    dynamic.getByRole("heading", { name: "Next steps" }),
  ).toHaveCount(0);
  await dynamic.getByRole("button", { name: "Toggle final section" }).click();
  await dynamic.getByRole("link", { name: "Next steps" }).click();
  await expect(
    dynamic.getByRole("link", { name: "Next steps" }),
  ).toHaveAttribute("aria-current", "location");
  const disclosure = page.locator(
    '[data-scenario="table-of-contents.disclosure"]',
  );
  await disclosure
    .getByRole("button", { name: "Contents", exact: true })
    .click();
  await expect(disclosure.getByRole("navigation")).toBeVisible();
});
test("basic navigation has no automated accessibility violations", async ({
  page,
}) => {
  const result = await new AxeBuilder({ page })
    .include('[data-scenario="table-of-contents.basic"]')
    .analyze();
  expect(result.violations).toEqual([]);
});
test("Aspect Ratio rail keeps metadata, final hash and narrow layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/aspect-ratio");
  const nav = page.getByRole("navigation", { name: "On this page" });
  await expect(nav).toBeVisible();
  const article = page.locator("[data-playground-content]");
  const articleBox = (await article.boundingBox())!;
  const railBox = (await nav.boundingBox())!;
  expect(railBox.x - articleBox.x - articleBox.width).toBeCloseTo(56, 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const editLink = page.getByRole("link", { name: "Edit page on GitHub (opens in a new tab)", exact: true });
  await expect(editLink).toHaveAttribute("href", "https://github.com/flowstack-ui/brick/edit/main/playground/src/components/aspect-ratio/AspectRatioDocumentation.tsx");
  await expect(editLink).toHaveAttribute("target", "_blank");
  await expect(editLink.locator("svg")).toHaveCount(2);
  expect(await nav.getByRole("link", { name: /Edit page/ }).count()).toBe(0);
  const divider = page.locator("aside .brick-divider");
  await expect(divider).toBeVisible();
  expect((await divider.boundingBox())!.y).toBeGreaterThan((await nav.boundingBox())!.y + (await nav.boundingBox())!.height);
  expect((await editLink.boundingBox())!.y).toBeGreaterThan((await divider.boundingBox())!.y);
  const heading = page.getByRole("heading", { name: "Aspect Ratio", exact: true, level: 1 });
  expect(Math.abs((await nav.boundingBox())!.y - (await heading.boundingBox())!.y)).toBeLessThan(2);
  for (const link of await nav.getByRole("link").all()) {
    const href = await link.getAttribute("href");
    await expect(page.locator(href!)).toHaveCount(1);
  }
  await nav.getByRole("link", { name: "Props", exact: true }).click();
  await expect(
    nav.getByRole("link", { name: "Props", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await expect(page).toHaveURL(/#props$/);
  await expect(nav).toBeInViewport();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(nav).not.toBeVisible();
});
