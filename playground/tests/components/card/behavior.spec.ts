import { expect, test } from "@playwright/test";

test("Card exposes the approved static anatomy and visual recipes", async ({ page }) => {
  await page.goto("/card");

  const overview = page.getByTestId("card-overview");
  const card = overview.getByRole("article");
  await expect(card).toHaveAttribute("data-variant", "outline");
  await expect(card).toHaveAttribute("data-size", "md");
  await expect(card).toHaveAttribute("data-slot", "card");
  await expect(card).not.toHaveAttribute("role");
  await expect(card).not.toHaveAttribute("tabindex");
  await expect(card.locator("[data-slot='card-header']")).toBeVisible();
  await expect(card.locator("[data-slot='card-title']")).toHaveText("Quarterly report");
  await expect(card.locator("[data-slot='card-description']")).toBeVisible();
  await expect(card.locator("[data-slot='card-action']")).toBeVisible();
  await expect(card.locator("[data-slot='card-content']")).toBeVisible();
  await expect(card.locator("[data-slot='card-footer']")).toBeVisible();

  for (const variant of ["outline", "elevated", "subtle"]) {
    await expect(page.getByTestId("card-variants").locator(`[data-variant='${variant}']`)).toHaveCount(1);
  }
  for (const size of ["sm", "md", "lg"]) {
    await expect(page.getByTestId("card-sizes").locator(`.brick-card[data-size='${size}']`)).toHaveCount(1);
  }
});

test("Card stays static while explicit nested controls own interaction and focus", async ({ page }) => {
  await page.goto("/card");

  const root = page.getByTestId("card-overview").getByRole("article");
  expect(await root.evaluate((element) => element.matches(":focus"))).toBe(false);

  const more = root.getByRole("button", { name: "More" });
  await more.focus();
  await expect(more).toBeFocused();
  await expect(more).toHaveCSS("outline-style", "solid");

  const link = page.getByRole("link", { name: /Single-action preview/ });
  await expect(link).toHaveAttribute("aria-labelledby", "single-action-card-title");
  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#single-action-card$/);
});

test("Card appearance scopes and public component tokens remain inspectable", async ({ page }) => {
  await page.goto("/card");

  const scopes = page.getByTestId("card-appearance");
  const light = scopes.locator("[data-brick-appearance='light'] .brick-card");
  const dark = scopes.locator("[data-brick-appearance='dark'] .brick-card");
  expect(await light.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(
    await dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  );

  const customized = page.locator("[data-slot='project-summary']");
  await expect(customized).toHaveCSS("border-radius", "4px");
  await expect(customized).toHaveCSS("--brick-card-space", "2rem");
  await expect(customized.locator("[data-slot='project-summary-header']")).toBeVisible();
});

test("Card reflows at an extreme constrained width without clipping content", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 900 });
  await page.goto("/card");

  const stress = page.getByTestId("card-stress");
  for (const card of await stress.locator(".brick-card").all()) {
    const cardBox = await card.boundingBox();
    const frameBox = await card.locator("..").boundingBox();
    expect(cardBox!.x).toBeGreaterThanOrEqual(frameBox!.x);
    expect(cardBox!.x + cardBox!.width).toBeLessThanOrEqual(frameBox!.x + frameBox!.width);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(256);
});

test("Card survives 400 percent page zoom without horizontal document overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "CSS zoom evidence is Chromium-specific.");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/card");
  await page.evaluate(() => { document.documentElement.style.zoom = "4"; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
  await expect(page.getByTestId("card-stress")).toBeVisible();
});
