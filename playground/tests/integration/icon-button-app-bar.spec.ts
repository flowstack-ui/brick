import { expect, test } from "@playwright/test";

test("default IconButton remains readable on a solid accent AppBar", async ({
  page,
}) => {
  await page.goto("/app-bar");
  const root = page
    .getByTestId("app-bar-tones")
    .locator('.brick-app-bar[data-variant="solid"][data-tone="accent"]');
  const iconButton = root.getByRole("button", {
    name: "Open menu for solid accent AppBar",
  });

  await expect(iconButton).toHaveAttribute("data-variant", "ghost");
  await expect(iconButton).toHaveAttribute("data-tone", "neutral");
  await expect(iconButton).toHaveAttribute("data-size", "lg");
  await expect(iconButton).toHaveAttribute("data-shape", "rounded");
  await expect(iconButton).toHaveCSS(
    "color",
    await root.evaluate((element) => getComputedStyle(element).color),
  );
});

test("IconButton actions retain square targets inside constrained and RTL AppBars", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/app-bar");

  for (const name of [
    "Open constrained menu",
    "Search constrained workspace",
    "فتح القائمة",
    "البحث",
  ]) {
    const control = page.getByRole("button", { name, exact: true });
    const box = await control.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeCloseTo(44, 2);
    expect(box!.height).toBeCloseTo(44, 2);
  }
});
