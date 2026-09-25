import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("For documentation exposes examples, props and stable-key behavior", async ({ page }) => {
  await page.goto("/for");
  for (const title of ["Usage", "Examples", "Object", "Fallback", "Stable keys", "Props"]) {
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  }
  await expect(page.getByRole("table", { name: "For props", exact: true })).toBeVisible();
  await expect(page.getByText("No items to show", { exact: true })).toBeVisible();
  const input = page.getByRole("textbox", { name: "Note for First item" });
  await input.fill("Remember me");
  await page.getByRole("button", { name: "Reverse items" }).click();
  await expect(input).toHaveValue("Remember me");
  await expect(page.getByRole("textbox").first()).toHaveAttribute("aria-label", "Note for Second item");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

for (const appearance of ["light", "dark"] as const) {
  test(`For docs remain contained in ${appearance}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: appearance === "dark" ? 390 : 1280, height: 900 });
    await page.goto(`/for?appearance=${appearance}&exampleDirection=${appearance === "dark" ? "rtl" : "ltr"}`);
    await expect(page.getByRole("heading", { name: "Props", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`docs-${appearance}.png`), fullPage: true });
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
