import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/avatar-group");
});

test("overview preserves canonical recipes, identity order, and neutral semantics", async ({
  page,
}) => {
  const group = page.getByTestId("avatar-group-overview").locator(".brick-avatar-group");
  await expect(page.getByTestId("avatar-group-workbench")).toBeVisible();
  await expect(group).toHaveAttribute("data-size", "md");
  await expect(group).toHaveAttribute("data-shape", "circle");
  await expect(group).toHaveAttribute("data-overlap", "md");
  await expect(group).toHaveAttribute("data-stacking", "last-on-top");
  await expect(group).not.toHaveAttribute("role");
  await expect(group.locator(".brick-avatar")).toHaveCount(5);
  await expect(group.locator("[data-slot='avatar-group-item']")).toHaveText([
    "AL",
    "GH",
    "KJ",
    "MH",
    "DV",
  ]);
});

test("group size and shape coordinate actual Avatar recipes", async ({ page }) => {
  const recipes = page.getByTestId("avatar-group-recipes");
  const groups = recipes.locator(".brick-avatar-group");
  const expectedSizes = [24, 32, 40, 48, 64, 80, 96, 112, 128, 48];
  const expectedNames = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "lg"];
  for (let index = 0; index < expectedSizes.length; index += 1) {
    const group = groups.nth(index);
    const avatars = group.locator(".brick-avatar");
    const boxes = await avatars.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          height: rect.height,
          shape: element.getAttribute("data-shape"),
          size: element.getAttribute("data-size"),
          width: rect.width,
        };
      }),
    );
    for (const box of boxes) {
      expect(box.height).toBe(expectedSizes[index]);
      expect(box.width).toBe(expectedSizes[index]);
      expect(box.size).toBe(expectedNames[index]);
    }
  }
  for (const avatar of await groups.nth(9).locator(".brick-avatar").all()) {
    await expect(avatar).toHaveAttribute("data-shape", "rounded");
  }
});

test("named overlap changes logical geometry while stacking changes paint only", async ({
  page,
}) => {
  const region = page.getByTestId("avatar-group-stacking");
  const groups = region.locator(".brick-avatar-group");
  const expectedOverlap = [0, 5, 10, 15];
  for (let index = 0; index < expectedOverlap.length; index += 1) {
    const items = groups.nth(index).locator("[data-slot='avatar-group-item']");
    const boxes = await items.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().x),
    );
    expect(40 - (boxes[1] - boxes[0])).toBeCloseTo(expectedOverlap[index], 1);
  }

  const first = groups.nth(4).locator("[data-slot='avatar-group-item']");
  const last = groups.nth(5).locator("[data-slot='avatar-group-item']");
  expect(await first.evaluateAll((items) => items.map((item) => getComputedStyle(item).zIndex))).toEqual([
    "5",
    "4",
    "3",
    "2",
    "1",
  ]);
  expect(await last.evaluateAll((items) => items.map((item) => getComputedStyle(item).zIndex))).toEqual([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);
});

test("max and total produce localized overflow with the promised slot budget", async ({
  page,
}) => {
  const region = page.getByTestId("avatar-group-overflow");
  const groups = region.locator(".brick-avatar-group");
  await expect(groups.nth(0).locator(".brick-avatar-group__item")).toHaveCount(3);
  await expect(groups.nth(0).getByRole("img", { name: "3 more collaborators" })).toHaveText(
    "+3",
  );
  await expect(groups.nth(1).locator(".brick-avatar-group__item")).toHaveCount(4);
  await expect(groups.nth(1).getByRole("img", { name: "21 more reviewers" })).toHaveText(
    "+21",
  );
});

test("custom overflow owns focus and activation without changing Avatar semantics", async ({
  page,
}) => {
  const region = page.getByTestId("avatar-group-composition");
  const button = region.getByRole("button", { name: "Show 3 more collaborators" });
  await button.focus();
  await expect(button).toBeFocused();
  await expect(region.locator(".brick-avatar")).toHaveCount(2);
  for (const fallback of await region.locator("[data-slot='avatar-fallback']").all()) {
    await expect(fallback).toHaveAttribute("aria-hidden", "true");
  }
});

test("RTL uses logical overlap without reversing source order", async ({ page }) => {
  const rtl = page.getByTestId("avatar-group-stress").locator("[dir='rtl']");
  const items = rtl.locator("[data-slot='avatar-group-item']");
  await expect(items).toHaveText(["ن", "ل", "س"]);
  const x = await items.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().x),
  );
  expect(x[0]).toBeGreaterThan(x[1]);
  expect(x[1]).toBeGreaterThan(x[2]);
  expect(x[0] - x[1]).toBeLessThan(40);
});

test("narrow width and 200% text preserve containment", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  for (const group of await page.getByTestId("avatar-group-stress").locator(".brick-avatar-group").all()) {
    const box = await group.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320.5);
  }
});

test("forced colors retain peer separation", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Forced-colors emulation is a Chromium release check.",
  );
  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const avatar = page.getByTestId("avatar-group-overview").locator(".brick-avatar").first();
  const computed = await avatar.evaluate((element) => ({
    border: getComputedStyle(element).borderTopWidth,
    shadow: getComputedStyle(element).boxShadow,
  }));
  expect(Number.parseFloat(computed.border)).toBeGreaterThanOrEqual(1);
  expect(computed.shadow).toBe("none");
});

test("AvatarGroup reference route has no automated accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
