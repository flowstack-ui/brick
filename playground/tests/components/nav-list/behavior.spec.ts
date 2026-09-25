import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/nav-list?qualification=1"); });

test("docs show scoped recipes, accessible metadata and composed current/disabled links", async ({ page }) => {
  await page.goto("/nav-list");
  await expect(page.getByRole("heading", { name: "Root", exact: true })).toBeAttached();
  const current = page.getByRole("navigation", { name: "Composed destinations" }).getByText("Current destination");
  await expect(current).toHaveAttribute("aria-current", "page");
  await expect(current).toHaveAttribute("data-current", "");
  await expect(page.getByText("Unavailable destination", { exact: true })).not.toHaveAttribute("href");
  await expect(page.getByRole("link", { name: "Inbox Messages from your team 12 unread" })).toBeAttached();
  const plain = page.getByRole("navigation", { name: "plain", exact: true }).getByRole("link", { name: "plain", exact: true });
  await plain.hover();
  await expect(plain).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  const custom = page.getByRole("navigation", { name: "Custom disclosures" });
  const trigger = custom.getByRole("button", { name: "Resources", exact: true });
  await expect(trigger.locator(".brick-nav-list__indicator")).toHaveCount(1);
  expect(await trigger.evaluate(el => getComputedStyle(el, "::after").content)).toBe("none");
  await trigger.click();
  await expect(custom.getByRole("link", { name: "Documentation", exact: true })).toBeVisible();
  await trigger.click();
  await expect(custom.getByRole("link", { name: "Documentation", exact: true })).toHaveCount(0);
  const none = custom.getByRole("button", { name: "More resources", exact: true });
  expect(await none.evaluate(el => getComputedStyle(el, "::after").content)).toBe("none");
  await expect(none.locator(".brick-nav-list__indicator")).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator('[data-component-page="nav-list"]').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  const results = await new AxeBuilder({ page }).include('[data-component-page="nav-list"]').analyze();
  expect(results.violations).toEqual([]);
});

test("retained sections hide after closing and allow unclipped settled focus", async ({ page }) => {
  await page.goto("/nav-list");
  const root = page.getByRole("navigation", { name: "Project navigation", exact: true });
  const content = root.locator(".brick-nav-list__section-content");
  const trigger = root.getByRole("button", { name: "Projects", exact: true });
  await expect(content).toHaveCSS("overflow", "visible");
  await trigger.click();
  await expect(content).toHaveAttribute("inert", "");
  await expect(content).toBeHidden();
  // Exercise the horizontal CSS recipe's display:contents interaction with hidden.
  await root.evaluate(el => el.setAttribute("data-orientation", "horizontal"));
  await expect(content).toBeHidden();
  await root.evaluate(el => el.setAttribute("data-orientation", "vertical"));
  await trigger.click();
  await expect(content).toBeVisible();
  await expect(content).toHaveCSS("overflow", "visible");
  await expect(content).not.toHaveAttribute("inert");
});

test("group gaps are independent from heading gaps and item density", async ({ page }) => {
  for (const dir of ["ltr", "rtl"]) {
    for (const gap of ["default", "6"]) {
      const root = page.getByRole("navigation", { name: `Group gap ${gap}`, exact: true });
      await root.evaluate((el, value) => el.setAttribute("dir", value), dir);
      await expect(root).toHaveCSS("row-gap", gap === "default" ? "8px" : "32px");
      const sections = root.locator(".brick-nav-list__section");
      await expect(sections.nth(0)).toHaveCSS("row-gap", "8px");
      await expect(sections.nth(1)).toHaveCSS("row-gap", "0px");
      await expect(root.locator(".brick-nav-list__list").first()).toHaveCSS("row-gap", "1px");
    }
  }
});

test("row inset and group indentation are independent and logical", async ({ page }) => {
  for (const dir of ["ltr", "rtl"]) {
    for (const inset of ["default", "none"]) {
      for (const indent of ["default", "none"]) {
        const root = page.getByRole("navigation", { name: `Spacing ${inset} ${indent}`, exact: true });
        await root.evaluate((el, value) => el.setAttribute("dir", value), dir);
        const row = root.getByRole("link").first();
        await expect(row).toHaveCSS("padding-inline-start", inset === "none" ? "0px" : "12px");
        await expect(row).toHaveCSS("padding-inline-end", inset === "none" ? "0px" : "12px");
        await expect(row).toHaveCSS("padding-block-start", "6px");
        await expect(root.locator(".brick-nav-list__section-content")).toHaveCSS("padding-inline-start", indent === "none" ? "0px" : "12px");
        const delta = await root.evaluate(el => {
          const label = el.querySelector(".brick-nav-list__section-label")!;
          const item = el.querySelector(".brick-nav-list__link-label")!;
          const range = document.createRange(); range.selectNodeContents(label);
          const a = range.getBoundingClientRect(); const b = item.getBoundingClientRect();
          return getComputedStyle(el).direction === "rtl" ? a.right - b.right : b.left - a.left;
        });
        expect(delta).toBeCloseTo(indent === "none" ? 1 : 13, 0);
      }
    }
  }
});

test("compact spacing preserves size typography and permits growing rows", async ({ page }) => {
  for (const [size, height] of [["sm", 28], ["md", 35], ["lg", 42]] as const) {
    const compact = page.getByRole("navigation", { name: `compact ${size} navigation`, exact: true });
    const comfortable = page.getByRole("navigation", { name: `comfortable ${size} navigation`, exact: true });
    const row = compact.getByRole("link").first();
    const font = await comfortable.getByRole("link").first().evaluate(el => getComputedStyle(el).fontSize);
    await expect(row).toHaveCSS("font-size", font);
    expect((await row.boundingBox())!.height).toBeCloseTo(height, 0);
    await expect(compact.getByRole("list")).toHaveCSS("row-gap", "1px");
    await row.evaluate(el => { el.style.inlineSize = "90px"; el.textContent = "A longer localized navigation destination"; });
    expect((await row.boundingBox())!.height).toBeGreaterThan(height);
  }
});

test("section labels use primary text while idle links use secondary", async ({ page }) => {
  const root = page.getByRole("navigation", { name: "Settings", exact: true });
  for (const appearance of ["light", "dark"]) {
    await page.locator("html").evaluate((el, value) => el.setAttribute("data-brick-appearance", value), appearance);
    const label = root.locator(".brick-nav-list__section-label");
    const link = root.getByRole("link", { name: "Members" });
    const colors = await root.evaluate(el => {
      const probe = document.createElement("span"); el.append(probe);
      probe.style.color = "var(--brick-color-text-primary)";
      const primary = getComputedStyle(probe).color;
      probe.style.color = "var(--brick-color-text-secondary)";
      const secondary = getComputedStyle(probe).color;
      probe.remove(); return { primary, secondary };
    });
    await expect(label).toHaveCSS("color", colors.primary);
    await expect(link).toHaveCSS("color", colors.secondary);
  }
});

test("defaults and recipes preserve finished navigation semantics", async ({ page }) => {
  const root = page.getByTestId("nav-list-overview").locator(".brick-nav-list");
  await expect(root).toHaveAttribute("data-orientation", "vertical");
  await expect(root).toHaveAttribute("data-variant", "soft");
  await expect(root).toHaveAttribute("data-tone", "accent");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root.getByRole("link", { name: "Workspace" })).toHaveAttribute("aria-current", "page");
});

test("logical row padding can align leading and trailing content independently", async ({ page }) => {
  const root = page.getByTestId("nav-list-overview").locator(".brick-nav-list");
  const link = root.getByRole("link", { name: "Workspace" });

  await root.evaluate((element) => {
    element.style.setProperty("--brick-nav-list-row-padding-inline-start", "1rem");
    element.style.setProperty("--brick-nav-list-row-padding-inline-end", "2rem");
  });

  await expect(link).toHaveCSS("padding-left", "16px");
  await expect(link).toHaveCSS("padding-right", "32px");
});

test("neutral soft current paint stays visible and changes on hover", async ({ page }) => {
  const root = page.locator('[data-scenario="nav-list.tones"] .brick-nav-list[data-tone="neutral"][data-variant="soft"]').first();
  const current = root.getByRole("link", { name: "Workspace" });
  const before = await current.evaluate((element) => getComputedStyle(element).backgroundColor);
  const foreground = await current.evaluate((element) => getComputedStyle(element).color);
  const parent = await current.evaluate((element) => getComputedStyle(element.parentElement!).backgroundColor);
  expect(before).not.toBe(parent);
  await current.hover();
  await expect.poll(() => current.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(before);
  await expect(current).toHaveCSS("color", foreground);
});

test("accent current foreground survives hover across navigation variants", async ({ page }) => {
  const roots = page.locator('[data-scenario="nav-list.variants"] .brick-nav-list[data-tone="accent"]');

  for (const root of await roots.all()) {
    const current = root.getByRole("link", { name: "Workspace" });
    const foreground = await current.evaluate((element) => getComputedStyle(element).color);
    await current.hover();
    await expect(current).toHaveCSS("color", foreground);
  }
});

test("disclosure updates native state and relationship output", async ({ page }) => {
  const scenario = page.locator('[data-scenario="nav-list.sections"]');
  const trigger = scenario.getByRole("button", { name: "Foundations" });
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const contentId = await trigger.getAttribute("aria-controls");
  expect(contentId).toBeTruthy();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(`#${contentId}`)).toBeHidden();
});

test("disabled links, composition output, horizontal wrap, RTL, and accessibility remain correct", async ({ page }) => {
  const disabled = page.locator('[data-scenario="nav-list.content"] .brick-nav-list__link').filter({ hasText: "Billing" });
  await expect(disabled).toHaveAttribute("aria-disabled", "true");
  const outputs = page.locator('[data-scenario="nav-list.composition"] [data-rendered-output]');
  await expect(outputs).toHaveCount(2);
  await expect(outputs.nth(0)).toContainText("<ol");
  await expect(outputs.nth(1)).toContainText("aria-current");
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.locator('[data-scenario="nav-list.stress"]');
  const box = await stress.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await expect(stress.locator('[dir="rtl"]')).toHaveCSS("direction", "rtl");
  const results = await new AxeBuilder({ page }).include('[data-component-page="nav-list"]').analyze();
  expect(results.violations).toEqual([]);
});

test("the playground shell consumes public Nav List", async ({ page }) => {
  const navigation = page.getByRole("navigation", { name: "Component navigation" });
  if (await navigation.count() === 0) {
    await page.getByRole("button", { name: "Open component navigation" }).click();
  }
  await expect(navigation).toHaveClass(/brick-nav-list/);
  await expect(navigation.getByRole("link", { name: "Nav List" })).toHaveAttribute("aria-current", "page");
});
