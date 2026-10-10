import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/checkbox?qualification=1"); });

test("linked consent preserves label activation, independent links, keyboard and forms", async ({ page }, testInfo) => {
  const form = page.getByRole("form", { name: "Linked consent" });
  const control = form.getByRole("checkbox");
  await expect(control).toHaveAccessibleName(/I agree to the terms and conditions\s*\./);
  await expect(control.locator("a")).toHaveCount(0);
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByText("Please accept the terms to continue.")).toBeVisible();
  await expect(control).toHaveAttribute("aria-invalid", "true");
  await expect(control).toBeFocused();
  await form.locator(".brick-checkbox-label").click({ position: { x: 8, y: 12 } });
  await expect(control).toHaveAttribute("aria-checked", "true");
  await form.getByRole("link", { name: "terms and conditions" }).click();
  await expect(page).toHaveURL(/#consent-terms$/);
  await expect(control).toHaveAttribute("aria-checked", "true");
  await control.focus();
  await page.keyboard.press("Space");
  await expect(control).toHaveAttribute("aria-checked", "false");
  // WebKit's macOS default uses Option-Tab to include links in keyboard traversal.
  await page.keyboard.press(testInfo.project.name.includes("webkit") ? "Alt+Tab" : "Tab");
  await expect(form.getByRole("link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(control).toHaveAttribute("aria-checked", "false");
  await control.click();
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByRole("status")).toHaveText("Submitted: accepted");
  await form.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(control).toHaveAttribute("aria-checked", "false");
});

test("compound states keep links independent and expose valid names", async ({ page }) => {
  const disabled = page.getByRole("checkbox", { name: /^Disabled choice;/ });
  const readonly = page.getByRole("checkbox", { name: /^Read-only choice;/ });
  const mixed = page.getByRole("checkbox", { name: /^Mixed choice;/ });
  await expect(disabled).toBeDisabled();
  await page.getByRole("link", { name: "read the terms", exact: true }).click();
  await expect(disabled).toHaveAttribute("aria-checked", "true");
  await readonly.click();
  await expect(readonly).toHaveAttribute("aria-checked", "true");
  await readonly.press("Space");
  await expect(readonly).toHaveAttribute("aria-checked", "true");
  await expect(mixed).toHaveAttribute("aria-checked", "mixed");
  await page.getByRole("link", { name: "review details", exact: true }).click();
  await expect(mixed).toHaveAttribute("aria-checked", "mixed");
  await mixed.click();
  await expect(mixed).toHaveAttribute("aria-checked", "true");
});

test("compound geometry, focus and accessibility hold across widths, sizes and directions", async ({ page }) => {
  const section = page.locator("#scenario-checkbox-linked-label");
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const dir of ["ltr", "rtl"]) {
      await section.evaluate((el, value) => el.setAttribute("dir", value), dir);
      for (const root of await section.locator(".brick-checkbox-root").all()) {
        await root.evaluate((el, value) => el.setAttribute("dir", value), dir);
        await expect(root).toHaveCSS("direction", dir);
        const control = root.locator(".brick-checkbox-compound-control");
        const visual = control.locator(".brick-checkbox-control");
        const label = root.locator(".brick-checkbox-label");
        const bounds = (await control.boundingBox())!;
        expect(bounds.width).toBeGreaterThanOrEqual(44);
        expect(bounds.height).toBeGreaterThanOrEqual(44);
        const mark = (await visual.boundingBox())!;
        const labelBounds = (await label.boundingBox())!;
        if (dir === "rtl") expect(mark.x).toBeGreaterThan(labelBounds.x + labelBounds.width);
        else expect(mark.x + mark.width).toBeLessThan(labelBounds.x);
        expect(mark.width).toBe(mark.height);
        const firstLineCenter = await label.evaluate(el => {
          const range = document.createRange();
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          range.selectNodeContents(walker.nextNode()!);
          const line = range.getClientRects()[0];
          return line.y + line.height / 2;
        });
        expect(Math.abs(mark.y + mark.height / 2 - firstLineCenter)).toBeLessThan(3);
      }
      expect(await section.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
  }
  await section.evaluate(el => el.setAttribute("dir", "ltr"));
  await page.evaluate(() => { document.documentElement.dataset.brickAppearance = "dark"; });
  const result = await new AxeBuilder({ page }).include("#scenario-checkbox-linked-label").analyze();
  expect(result.violations).toEqual([]);
  await page.emulateMedia({ forcedColors: "active" });
  const control = section.locator(".brick-checkbox-compound-control").first();
  await control.focus();
  await expect(control.locator(".brick-checkbox-control")).toHaveCSS("outline-style", "solid");
});
