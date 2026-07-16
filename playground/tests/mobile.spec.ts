import { expect, test } from "@playwright/test";

const mobileProjects = new Set(["mobile-chromium", "mobile-webkit"]);

test("Button remains operable in touch device profiles", async ({ page }, testInfo) => {
  test.skip(!mobileProjects.has(testInfo.project.name), "This check is specific to the release mobile profiles.");

  await page.goto("/button");
  expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);

  const overview = page.getByTestId("button-overview");
  await overview.getByRole("button", { name: "Publish project" }).tap();
  await expect(overview.getByText("Pressed 1 time")).toBeVisible();

  const stress = page.getByTestId("button-stress");
  for (const button of await stress.getByRole("button").all()) {
    const box = await button.boundingBox();
    const frame = await button.locator("..").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(frame!.x);
    expect(box!.x + box!.width).toBeLessThanOrEqual(frame!.x + frame!.width);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => innerWidth),
  );
});
