import { expect, test } from "../../evidence-test.js";

test("Link documentation pairs source and complete responsive typography", async ({ page }) => {
  await page.goto("/link");
  await expect(page.getByRole("heading", { name: "Within text", exact: true })).toBeVisible();
  const link = page.getByRole("link", { name: "Resize to see responsive typography", exact: true });
  for (const [width, token] of [[390, "xl"], [600, "sm"], [800, "md"], [1100, "lg"], [1400, "xl"]] as const) {
    await page.setViewportSize({ width, height: 900 });
    const result = await link.evaluate((element, size) => {
      const style = getComputedStyle(element);
      const parent = getComputedStyle(element.parentElement!);
      return { size: style.fontSize, expected: parent.getPropertyValue(`--brick-typography-body-${size}-font-size`).trim(), family: style.fontFamily, parentFamily: parent.fontFamily };
    }, token);
    // Compare resolved token on a temporary measurement element (tokens may use rem).
    const expected = await link.evaluate((element, size) => {
      const probe = document.createElement("span");
      probe.style.fontSize = `var(--brick-typography-body-${size}-font-size)`;
      element.parentElement!.append(probe);
      const value = getComputedStyle(probe).fontSize;
      probe.remove();
      return value;
    }, token);
    expect(result.size).toBe(expected);
    expect(result.family).toBe(result.parentFamily);
  }
  const section = page.locator("#composition");
  await section.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(section).toContainText('asChild href="#usage"');
});
