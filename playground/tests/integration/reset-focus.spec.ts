import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("reset fallback respects themes, component owners and either CSS import order", async ({ page }) => {
  const reset = await readFile("dist/reset.css", "utf8");
  const components = await readFile("dist/styles.css", "utf8");
  for (const sheets of [[reset, components], [components, reset]]) {
    await page.setContent(`<style>${sheets.join("\n")}</style>
      <button id="native">Native action</button>
      <section id="target" tabindex="-1">Document destination</section>
      <button class="brick-switch" id="switch" aria-label="Switch"></button>
      <button class="brick-tabs-trigger" id="tab">Tab</button>
      <input class="brick-input-control" id="input" aria-label="Input">
      <button class="brick-button" data-focus-ring="inside" id="inside">Inside</button>`);
    await page.keyboard.press("Tab");
    for (const appearance of ["light", "dark"]) {
      await page.locator("html").evaluate((el, value) => el.setAttribute("data-brick-appearance", value), appearance);
      const color = await page.locator("#target").evaluate(el => {
        el.style.color = "var(--brick-color-focus-ring)";
        return getComputedStyle(el).color;
      });
      for (const selector of ["#native", "#target"]) {
        await page.locator(selector).focus();
        await expect(page.locator(selector)).toHaveCSS("outline-color", color);
        await expect(page.locator(selector)).toHaveCSS("outline-style", "solid");
        await expect(page.locator(selector)).toHaveCSS("outline-offset", "4px");
      }
      await page.locator("#switch").focus();
      await expect(page.locator("#switch")).toHaveCSS("outline-style", "none");
      expect(await page.locator("#switch").evaluate(el => getComputedStyle(el, "::before").outlineColor)).toBe(color);
      await page.locator("#tab").focus();
      await expect(page.locator("#tab")).toHaveCSS("outline-offset", "-2px");
      await page.locator("#input").focus();
      await expect(page.locator("#input")).toHaveCSS("outline-style", "none");
      await page.locator("#inside").focus();
      await expect(page.locator("#inside")).toHaveCSS("outline-offset", "-2px");
    }
  }
  await page.emulateMedia({ forcedColors: "active" });
  await page.locator("#target").focus();
  const highlight = await page.locator("#target").evaluate(el => {
    el.style.color = "Highlight";
    return getComputedStyle(el).color;
  });
  await expect(page.locator("#target")).toHaveCSS("outline-color", highlight);
});

test("token-free reset retains a visible native focus fallback", async ({ page }) => {
  const reset = await readFile("dist/reset.css", "utf8");
  await page.setContent(`<style>${reset}</style><button>Native action</button>`);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button")).toHaveCSS("outline-width", "2px");
  await expect(page.getByRole("button")).toHaveCSS("outline-style", "solid");
});

test("TOC destination uses themed focus and passive scrolling does not steal it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/aspect-ratio?testMode=1");
  await page.keyboard.press("Tab");
  const usage = page.locator('.docs-table-of-contents-rail a[href="#usage"]');
  await usage.focus();
  await page.keyboard.press("Enter");
  const target = page.locator("#usage");
  await expect(target).toBeFocused();
  const color = await target.evaluate(el => {
    const probe = document.createElement("span");
    probe.style.color = "var(--brick-color-focus-ring)";
    el.append(probe); const color = getComputedStyle(probe).color;
    probe.remove(); return color;
  });
  await expect(target).toHaveCSS("outline-color", color);
  await expect(target).toHaveCSS("outline-style", "solid");
  await expect(usage).toHaveAttribute("aria-current", "location");
  await page.locator("#props").evaluate(el => {
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 88, behavior: "instant" });
  });
  await expect(target).toBeFocused();
  await expect(usage).not.toHaveAttribute("aria-current", "location");
});
