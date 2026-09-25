import { expect, test } from "../../evidence-test.js";

test("fade exit stays transparent through cleanup and rapid switching settles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/tabs");
  const root = page.locator("#animation .brick-tabs").last();
  await root.scrollIntoViewIfNeeded();
  // Measure a completed exit, not cancellation of the initial entry animation.
  await expect.poll(() => root.evaluate(node => node.getAnimations({ subtree: true })
    .filter(animation => animation.playState === "running" || animation.pending).length)).toBe(0);
  await root.evaluate(root => {
    const state = root as HTMLElement & { exitOpacities: number[] };
    state.exitOpacities = [];
    const observer = new MutationObserver(() => {
      const panel = root.querySelector<HTMLElement>('[data-presence="closed"]');
      if (!panel) return;
      const exit = panel.getAnimations().find(animation =>
        (animation as CSSAnimation).animationName === "brick-tabs-exit");
      if (exit) {
        // Sample the actual CSS endpoint before presence cleanup; mobile
        // engines may deliver animationend after the cleanup timeout.
        exit.finish();
        state.exitOpacities.push(Number(getComputedStyle(panel).opacity));
        observer.disconnect();
      }
    });
    observer.observe(root, { attributes: true, childList: true, subtree: true });
  });
  await root.getByRole("tab", { name: "Projects", exact: true }).click();
  await expect(root.locator('[data-presence="closed"]')).toHaveCount(0);
  const opacity = await root.evaluate(root => (root as HTMLElement & { exitOpacities: number[] }).exitOpacities);
  expect(opacity.length).toBeGreaterThan(0);
  expect(opacity.every(value => value === 0)).toBe(true);
  await root.evaluate(async root => {
    const tabs = root.querySelectorAll<HTMLElement>('[role="tab"]');
    for (const index of [2, 0, 1, 2, 0]) {
      tabs[index].click();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
  });
  await expect(root.locator('[data-presence="closed"]')).toHaveCount(0);
  await expect(root.getByRole("tabpanel")).toHaveText("Manage the people on your team.");
  await expect(root.getByRole("tabpanel")).toHaveCSS("opacity", "1");
});

test("adding a selected tab keeps the indicator on its horizontal baseline", async ({ page }) => {
  for (const dir of ["ltr", "rtl"]) {
    await page.goto("/tabs");
    const section = page.locator("#dynamic");
    await section.evaluate((node, dir) => node.setAttribute("dir", dir), dir);
    const samples = await section.evaluate(async section => {
      const indicator = section.querySelector<HTMLElement>(".brick-tabs-indicator")!;
      const baseline = indicator.getBoundingClientRect().y;
      const samples: number[] = [];
      const buttons = [...section.querySelectorAll<HTMLButtonElement>("button")];
      buttons.find(button => button.textContent === "Add document")!.click();
      for (let frame = 0; frame < 24; frame++) {
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        samples.push(Math.abs(indicator.getBoundingClientRect().y - baseline));
      }
      return samples;
    });
    expect(Math.max(...samples)).toBeLessThan(1);
    const selected = section.getByRole("tab", { name: "Document 3", exact: true });
    const a = await selected.boundingBox();
    const b = await section.locator(".brick-tabs-indicator").boundingBox();
    expect(Math.abs(a!.x - b!.x)).toBeLessThan(1);
    expect(Math.abs(a!.width - b!.width)).toBeLessThan(1);
  }
});

test("panel handoff never paints inactive non-animated content", async ({ page }) => {
  await page.goto("/tabs");
  for (const section of ["dynamic", "lifecycle"]) {
    const result = await page.locator(`#${section} .brick-tabs`).last().evaluate(async root => {
      const samples: { painted: number; inactive: number }[] = [];
      const sample = () => {
        const panels = [...root.querySelectorAll<HTMLElement>(".brick-tabs-content")];
        const painted = panels.filter(panel => panel.getClientRects().length > 0);
        samples.push({ painted: painted.length, inactive: painted.filter(panel => panel.dataset.state === "inactive").length });
      };
      const observer = new MutationObserver(sample);
      observer.observe(root, { subtree: true, childList: true, attributes: true });
      const tabs = root.querySelectorAll<HTMLElement>('[role="tab"]');
      for (const index of [1, 0, 1, 0]) {
        tabs[index].click();
        await new Promise<void>(resolve => requestAnimationFrame(() => { sample(); resolve(); }));
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      }
      observer.disconnect();
      return samples;
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(sample => sample.painted === 1 && sample.inactive === 0)).toBe(true);
  }
});

test("fade retains outgoing paint only when motion is allowed", async ({ page }) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/tabs");
    const root = page.locator("#animation .brick-tabs").last();
    const sawPaintedExit = await root.evaluate(async root => {
      let paintedExit = false;
      const observer = new MutationObserver(() => {
        paintedExit ||= [...root.querySelectorAll<HTMLElement>('.brick-tabs-content[data-state="inactive"]')]
          .some(panel => panel.getClientRects().length > 0);
      });
      observer.observe(root, { subtree: true, childList: true, attributes: true });
      root.querySelectorAll<HTMLElement>('[role="tab"]')[1].click();
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      observer.disconnect();
      return paintedExit;
    });
    expect(sawPaintedExit).toBe(reducedMotion === "no-preference");
    await expect(root.locator('.brick-tabs-content[data-state="inactive"]')).toHaveCount(0);
    await expect(root.getByRole("tabpanel")).toHaveText("Explore your active projects.");
  }
});

test("documentation exposes capabilities, parts and executable examples", async ({ page }) => {
  await page.goto("/tabs");
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "RootProvider", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ContentGroup", exact: true })).toBeVisible();
  const lifecycle = page.locator("#lifecycle");
  const input = lifecycle.getByRole("textbox", { name: "Team name" });
  await input.fill("My team");
  await lifecycle.getByRole("tab", { name: "Projects", exact: true }).click();
  await expect(input).toBeHidden();
  await lifecycle.getByRole("tab", { name: "Members", exact: true }).click();
  await expect(input).toHaveValue("My team");
});

test("scrolled indicator stays aligned in LTR and RTL and never double paints", async ({ page }) => {
  await page.goto("/tabs?qualification=1");
  for (const name of ["Constrained sections", "أقسام الحساب"]) {
    const list = page.getByRole("tablist", { name, exact: true });
    await list.getByRole("tab").first().focus();
    await page.keyboard.press("End");
    const selected = list.getByRole("tab").last();
    await expect(selected).toHaveAttribute("aria-selected", "true");
    await expect.poll(async () => {
      const a = await selected.boundingBox(), b = await list.locator(".brick-tabs-indicator").boundingBox();
      return Math.abs(a!.x - b!.x) < 1.1 && Math.abs(a!.width - b!.width) < 1.1;
    }).toBe(true);
    await expect(selected).toHaveCSS("border-bottom-color", "rgba(0, 0, 0, 0)");
    await expect(list).toHaveAttribute("data-indicator-ready", "");
  }
});

test("filled selection handoff, compact sizes and responsive resets", async ({ page }) => {
  await page.goto("/tabs?qualification=1");
  const solid = page.getByRole("tablist", { name: "solid sections", exact: true });
  await expect(solid).toHaveAttribute("data-indicator-ready", "");
  await expect(solid.locator('[aria-selected="true"]')).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(solid.locator('[aria-selected="true"]')).toHaveCSS("box-shadow", "none");
  await expect(solid.locator(".brick-tabs-indicator")).not.toHaveCSS("box-shadow", "none");
  for (const [size, height] of [["sm", 36], ["md", 40], ["lg", 44]] as const) {
    await expect(page.getByRole("tablist", { name: `${size} sections`, exact: true }).getByRole("tab").first()).toHaveCSS("min-height", `${height}px`);
  }
  await page.goto("/tabs");
  const responsive = page.locator("#responsive").locator(".brick-tabs").filter({ has: page.getByRole("tab", { name: "Members", exact: true }) }).last();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("flex-direction", "column");
  await expect(responsive.getByRole("tablist")).toHaveCSS("display", "grid");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(responsive).toHaveCSS("flex-direction", "row");
  await expect(responsive.getByRole("tablist")).toHaveCSS("display", "flex");
});

test("dynamic IDs, router links, and deselection remain usable", async ({ page }) => {
  await page.goto("/tabs");
  const dynamic = page.locator("#dynamic");
  await dynamic.getByRole("button", { name: "Add document", exact: true }).click();
  const added = dynamic.getByRole("tab", { name: "Document 3", exact: true });
  await expect(added).toHaveAttribute("aria-selected", "true");
  const controls = await added.getAttribute("aria-controls");
  expect(controls).not.toMatch(/\s/);
  await expect(page.locator(`[id="${controls}"]`)).toBeVisible();
  await dynamic.getByRole("button", { name: "Add document", exact: true }).click();
  await expect(dynamic.getByRole("tab", { name: "Document 4", exact: true })).toHaveAttribute("aria-selected", "true");
  await dynamic.getByRole("button", { name: "Close selected document", exact: true }).click();
  await expect(added).toHaveAttribute("aria-selected", "true");
  await dynamic.getByRole("button", { name: "Close selected document", exact: true }).click();
  await expect(dynamic.getByRole("tab", { name: "Document 2", exact: true })).toHaveAttribute("aria-selected", "true");
  await dynamic.getByRole("tab", { name: "Document 1", exact: true }).click();
  await dynamic.getByRole("button", { name: "Close selected document", exact: true }).click();
  await expect(dynamic.getByRole("tab", { name: "Document 2", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(dynamic.getByRole("button", { name: "Close selected document", exact: true })).toBeDisabled();
  const links = page.locator("#links");
  await expect(links.getByRole("tab", { name: "Settings", exact: true })).not.toHaveAttribute("href");
  await links.getByRole("tab", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/#tab-projects$/);
  const deselectable = page.locator("#deselectable");
  await deselectable.getByRole("tab", { name: "Members", exact: true }).click();
  await expect(deselectable.getByRole("tabpanel").filter({ hasText: "Manage the people" })).toHaveCount(0);
});
