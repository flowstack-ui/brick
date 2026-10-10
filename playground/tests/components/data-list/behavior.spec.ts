import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/data-list?qualification=1");
});

test("responsive recipes reverse cleanly and sizes have the intended geometry", async ({
  page,
}) => {
  await page.goto("/data-list");
  const reversed = page.locator("#responsive .brick-data-list").nth(1);
  for (const [width, horizontal] of [
    [390, true],
    [800, false],
    [1100, true],
    [1400, false],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    const geometry = await reversed
      .locator(".brick-data-list__item")
      .first()
      .evaluate((node) => {
        const term = node.querySelector("dt")!.getBoundingClientRect(),
          value = node.querySelector("dd")!.getBoundingClientRect();
        return {
          sameRow: Math.abs(term.y - value.y) < 1,
          below: value.y >= term.bottom,
        };
      });
    expect(geometry.sameRow).toBe(horizontal);
    if (!horizontal) expect(geometry.below).toBe(true);
  }
  const sizes = page.locator("#sizes .brick-data-list");
  for (const [index, font, gap] of [
    [0, "12px", "12px"],
    [1, "14px", "16px"],
    [2, "16px", "20px"],
  ] as const) {
    await expect(sizes.nth(index)).toHaveCSS("font-size", font);
    await expect(sizes.nth(index)).toHaveCSS("row-gap", gap);
  }
});

test("long RTL values, measures and nested grouped terms stay bounded", async ({
  page,
}) => {
  await page.goto("/data-list");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of [
    "long-content",
    "label-measures",
    "orientation",
    "rich-values",
  ]) {
    for (const root of await page.locator(`#${id} .brick-data-list`).all()) {
      expect(
        await root.evaluate((n) => n.scrollWidth <= n.clientWidth + 1),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 1400, height: 900 });
  const custom = page.locator("#label-measures .brick-data-list").last();
  expect(
    await custom
      .locator("dt")
      .first()
      .evaluate((n) => n.getBoundingClientRect().width),
  ).toBeCloseTo(80, 0);
  const group = page.locator("#grouped .brick-data-list__item").first();
  const columns = await group.evaluate((n) =>
    Array.from(n.children).map((c) => getComputedStyle(c).gridColumnStart),
  );
  expect(columns).toEqual(["1", "1", "2", "2"]);
  const nested = page.locator("#grouped .brick-data-list .brick-data-list");
  await expect(nested).toHaveAttribute("data-orientation", "vertical");
});

test("info tip remains keyboard operable and documentation exposes every part", async ({
  page,
}) => {
  await page.goto("/data-list");
  const trigger = page.getByRole("button", { name: "About new users" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("People who joined in the last 30 days.", { exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  for (const title of ["Root", "Item", "Label", "Value", "PropsProvider"]) {
    await expect(
      page.getByRole("heading", { name: title, exact: true, level: 3 }),
    ).toBeVisible();
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("keeps native facts and changes only responsive presentation", async ({
  page,
}) => {
  const root = page.getByTestId("data-list-responsive");
  await expect(root).toHaveJSProperty("tagName", "DL");
  await expect(root.locator("dt")).toHaveCount(2);
  await expect(root.locator("dd")).toHaveCount(2);
  await expect(root).toHaveAttribute("data-orientation", "vertical");
  await page.setViewportSize({ width: 900, height: 720 });
  await expect(root).toHaveCSS("display", "grid");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
