import { expect, test } from "@playwright/test";

test("Button exposes the approved recipes and native semantics", async ({ page }) => {
  await page.goto("/button");

  const overview = page.getByTestId("button-overview");
  const primary = overview.getByRole("button", { name: "Publish project" });
  await expect(primary).toHaveAttribute("data-variant", "solid");
  await expect(primary).toHaveAttribute("data-tone", "accent");
  await expect(primary).toHaveAttribute("data-size", "md");
  await expect(primary).toHaveAttribute("data-shape", "rounded");

  await primary.click();
  await expect(overview.getByText("Pressed 1 time")).toBeVisible();

  await expect(page.getByRole("link", { name: "Native anchor" })).toHaveAttribute("href", "#composition");
  await expect(page.getByRole("link", { name: "Composed anchor" })).toHaveAttribute("href", "#composition");
  await expect(page.getByRole("link", { name: "Rendered anchor" })).toHaveAttribute("href", "#composition");
  await expect(page.getByRole("link", { name: "Inactive anchor" })).not.toHaveAttribute("href");
});

test("Button preserves loading layout and adopted target sizes", async ({ page }) => {
  await page.goto("/button");

  const loading = page.getByRole("button", { name: "Saving changes" });
  await expect(loading).toHaveAttribute("aria-busy", "true");
  const loadingBefore = await loading.boundingBox();
  await expect(loading).toHaveAttribute("data-loading", "");
  const loadingAfter = await loading.boundingBox();
  expect(loadingAfter).toEqual(loadingBefore);

  const sizeCanvas = page.getByTestId("button-sizes");
  const expected = { xs: 28, sm: 36, md: 44, lg: 52, xl: 60 } as const;
  for (const [size, minimum] of Object.entries(expected)) {
    const box = await sizeCanvas.getByRole("button", { name: `${size} button` }).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(minimum);
  }
});

test("Button preserves native keyboard activation and visible focus", async ({ page }) => {
  await page.goto("/button");

  const overview = page.getByTestId("button-overview");
  const primary = overview.getByRole("button", { name: "Publish project" });
  await primary.focus();
  await expect(primary).toBeFocused();
  await expect(primary).toHaveCSS("outline-style", "solid");

  await page.keyboard.press("Enter");
  await expect(overview.getByText("Pressed 1 time")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(overview.getByText("Pressed 2 times")).toBeVisible();

  const link = page.getByRole("link", { name: "Native anchor" });
  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#composition$/);
});

test("Button reflows in a constrained mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 800 });
  await page.goto("/button");

  const stress = page.getByTestId("button-stress");
  const longButton = stress.getByRole("button", {
    name: "Continue with the carefully selected delivery preferences",
  });
  const box = await longButton.boundingBox();
  const frame = await longButton.locator("..").boundingBox();
  expect(box?.width).toBeLessThanOrEqual(216);
  expect(box?.height).toBeGreaterThan(44);
  expect(box!.x).toBeGreaterThanOrEqual(frame!.x);
  expect(box!.x + box!.width).toBeLessThanOrEqual(frame!.x + frame!.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(256);
});
