import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/collapsible"); });

test("initial partial preview settles without resize errors across responsive widths", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const width of [1280, 1024, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/collapsible");
    await page.evaluate(() => document.fonts.ready);
    const content = page.locator("#partial-height .brick-collapsible-content");
    await expect(content).toHaveAttribute("inert");
    await expect(content).toHaveCSS("height", "48px");
    // Observe the mounted preview through its finite entrance/exit animation,
    // not just the first rendered heading. Do not filter native page errors.
    await content.evaluate(async node => {
      await Promise.all(node.getAnimations().map(animation => animation.finished));
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });
    expect(await content.evaluate(node => node.getBoundingClientRect().height)).toBe(48);
    expect(errors).toEqual([]);
  }
});

test("responsive outline resets paint and Activity retains drafts while pausing effects", async ({page}) => {
  const root=page.locator("#responsive .brick-collapsible");
  await page.setViewportSize({width:1200,height:900});
  await expect(root).toHaveCSS("border-top-width","1px");
  await expect(root).not.toHaveCSS("border-top-color","rgba(0, 0, 0, 0)");
  await expect(root.getByRole("button")).toHaveCSS("min-height","52px");
  await page.setViewportSize({width:390,height:844});
  await expect(root).toHaveCSS("border-top-width","0px");
  const activity=page.locator("#activity");
  const trigger=activity.getByRole("button",{name:"Activity-retained draft"});
  await trigger.click();
  await activity.getByRole("textbox").fill("Saved draft");
  await expect.poll(()=>activity.getByText(/Effect ticks:/).textContent()).not.toBe("Effect ticks: 0");
  await trigger.click();
  await expect(activity.locator(".brick-collapsible-content")).toHaveAttribute("hidden");
  const paused=await activity.getByText(/Effect ticks:/).textContent();
  await page.waitForTimeout(1200);
  expect(await activity.getByText(/Effect ticks:/).textContent()).toBe(paused);
  await trigger.click();
  await expect(activity.getByRole("textbox")).toHaveValue("Saved draft");
});

test("docs expose labeled parts and copyable examples", async ({ page }) => {
  await expect(page.locator("#props-root")).toBeVisible();
  await expect(page.getByRole("table", { name: "Collapsible.Trigger props", exact: true })).toBeAttached();
  await page.locator("#composed").getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.locator("#composed")).toContainText("unstyled");
});

test("highlight none preserves transparency and keyboard focus", async ({ page }) => {
  const fineHover = await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches);
  const trigger = page.locator('#highlight .brick-collapsible-trigger[data-highlight="none"]');
  await trigger.hover();
  await expect(trigger).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await trigger.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(trigger).toHaveCSS("outline-style", "solid");
  for (const mode of ["hover", "open", "both"]) {
    const other = page.locator(`#highlight .brick-collapsible-trigger[data-highlight="${mode}"]`);
    await other.hover();
    if (mode !== "open" && fineHover) await expect(other).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    else await expect(other).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await other.click();
    await page.locator("#highlight h3").hover();
    if (mode !== "hover") await expect(other).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    else await expect(other).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }
});

test("composed buttons keep their dimensions and toggle exactly once", async ({ page }) => {
  const section = page.locator("#composed");
  const button = section.getByRole("button", { name: "Button-owned appearance", exact: true });
  await expect(button).toHaveClass(/brick-button/);
  await expect(button).toHaveCSS("display", "inline-flex");
  const initial = await button.boundingBox();
  await button.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await button.press("Space");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  expect((await button.boundingBox())!.height).toBe(initial!.height);
  const icon = section.getByRole("button", { name: "Show compact details", exact: true });
  const box = await icon.boundingBox();
  expect(box!.width).toBeCloseTo(box!.height, 1);
  await icon.click();
  await expect(icon).toHaveAttribute("aria-expanded", "true");
});

test("partial preview geometry and retained inputs survive toggling", async ({ page }) => {
  const section = page.locator("#partial-height");
  const content = section.locator(".brick-collapsible-content");
  await expect(content).toHaveAttribute("inert");
  await expect.poll(async () => (await content.boundingBox())!.height).toBe(48);
  await section.getByRole("button", { name: "Read more", exact: true }).click();
  await expect(content).not.toHaveAttribute("inert");
  await expect.poll(async () => (await content.boundingBox())!.height).toBeGreaterThan(48);
  await section.getByRole("button", { name: "Read more", exact: true }).click();
  await expect.poll(async () => (await content.boundingBox())!.height).toBe(48);
  const lazy = page.locator("#lazy-mounted");
  const trigger = lazy.getByRole("button", { name: "Write a note" });
  await expect(lazy.locator("input")).toHaveCount(0);
  await trigger.click();
  await lazy.getByRole("textbox").fill("Retained draft");
  await trigger.click();
  await expect(lazy.locator("input")).toHaveValue("Retained draft");
  await expect(lazy.locator(".brick-collapsible-content")).toHaveAttribute("inert");
  await trigger.click();
  await expect(lazy.getByRole("textbox")).toHaveValue("Retained draft");
});

test("custom indicator replaces the default chevron", async ({ page }) => {
  const section = page.locator("#custom-indicator");
  const indicator = section.locator(".brick-collapsible-indicator");
  const trigger = section.getByRole("button", { name: "Custom indicator", exact: true });
  await expect(indicator).toHaveCount(1);
  await expect(indicator).toHaveText("+");
  await expect(indicator.locator("svg")).toHaveCount(0);
  await trigger.click();
  await expect(indicator).toHaveText("−");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await trigger.click();
  await expect(indicator).toHaveText("+");
});

test("nested indicators, fully closed horizontal content, reduced motion and narrow RTL", async ({ page }) => {
  const nested = page.locator("#nested");
  const indicators = nested.locator(".brick-collapsible-indicator");
  await expect(indicators.nth(0)).toHaveCSS("transform", "matrix(-1, 0, 0, -1, 0, 0)");
  await expect(indicators.nth(1)).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  const horizontal = page.locator("#horizontal .brick-collapsible-content");
  await expect(horizontal).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#horizontal").getByRole("button", { name: "Reveal horizontally" }).click();
  await expect(horizontal).toHaveCSS("animation-name", "none");
  await expect.poll(async () => (await horizontal.boundingBox())!.width).toBeGreaterThan(32);
  await expect(page.locator("#inset .brick-collapsible-content-inner")).toHaveCSS("padding", "0px");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-component-page="collapsible"]').evaluate(node => node.setAttribute("dir", "rtl"));
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.locator("#horizontal").getByRole("button", { name: "Reveal horizontally" }).click();
  await expect(horizontal).toHaveCount(0);
});
