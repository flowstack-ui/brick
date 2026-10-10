import type { Page, TestInfo } from "@playwright/test";

/** Read-only teardown evidence; never changes test assertions or component state. */
export async function captureReleaseDiagnostic(page: Page, testInfo: TestInfo) {
  if (process.env.FLOWSTACK_DIAGNOSTIC_CAPTURE !== "1") return;
  const state = await page.evaluate(() => ({
    events: (window as unknown as { releasePointerEvidence?: unknown[] }).releasePointerEvidence,
    resizeObservers: (window as unknown as { releaseResizeEvidence?: unknown[] }).releaseResizeEvidence,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    marquees: Array.from(document.querySelectorAll(".brick-marquee-viewport"), node => ({
      html: node.outerHTML.slice(0, 600), tabIndex: (node as HTMLElement).tabIndex,
      overflow: getComputedStyle(node).overflow, rootStatic: node.parentElement?.hasAttribute("data-static"),
    })),
  }));
  await testInfo.attach("release-diagnostic-state", { body: Buffer.from(JSON.stringify(state, null, 2)), contentType: "application/json" });
  const geometry = await page.evaluate(() => {
    const properties = ["display", "position", "box-sizing", "overflow", "overflow-x", "overflow-y", "width", "height", "min-width", "max-width", "min-height", "max-height", "font-size", "line-height", "padding", "margin", "gap", "grid-template-columns", "align-items", "justify-content", "transform", "translate", "scale", "transform-origin", "transition", "pointer-events", "inset", "border-width"];
    const record = (el: Element) => {
      const css = getComputedStyle(el);
      const variables = Array.from(css).filter(key => key.startsWith("--atom-toast-") || key.startsWith("--brick-toast-") || key.startsWith("--brick-avatar-group-") || key.startsWith("--radio-group-indicator-"));
      return { tag: el.tagName, class: el.className, attributes: Object.fromEntries(Array.from(el.attributes).map(a => [a.name, a.value])), rect: el.getBoundingClientRect().toJSON(), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth,
        styles: Object.fromEntries([...properties, ...variables].map(key => [key, css.getPropertyValue(key)])) };
    };
    const targets = Array.from(document.querySelectorAll('[data-testid="avatar-group-stress"] .brick-avatar-group, .brick-toast-viewport, .brick-toast, .evidence-app-bar, .brick-popover, [data-slot="popover-viewport"], .brick-popover__footer'));
    return { url: location.href, viewport: { innerWidth, innerHeight, visual: visualViewport && { width: visualViewport.width, height: visualViewport.height, scale: visualViewport.scale } }, coarse: matchMedia("(pointer: coarse)").matches,
      root: record(document.documentElement), overflow: Array.from(document.querySelectorAll("body *")).filter(el => el.getBoundingClientRect().right > document.documentElement.clientWidth + 1 || el.scrollWidth > el.clientWidth + 1).slice(0, 100).map(record), targets: targets.map(el => ({ element: record(el), children: Array.from(el.children).map(record), ancestors: (() => { const list = []; let parent = el.parentElement; for (let i = 0; parent && i < 6; i++, parent = parent.parentElement) list.push(record(parent)); return list; })() })) };
  });
  await testInfo.attach("release-diagnostic-geometry", { body: Buffer.from(JSON.stringify(geometry, null, 2)), contentType: "application/json" });
  await testInfo.attach("release-diagnostic-viewport", { body: await page.screenshot({ timeout: 5000 }), contentType: "image/png" });
  const stress = page.getByTestId("avatar-group-stress");
  if (await stress.count()) await testInfo.attach("release-diagnostic-avatar-stress", { body: await stress.screenshot({ timeout: 5000 }), contentType: "image/png" });
  if (testInfo.status !== testInfo.expectedStatus && new URL(page.url()).pathname === "/segment-group") {
    // Preserve the failed page. Probe scroll-overflow ownership in a separate
    // page after the original assertions, geometry and screenshot are retained.
    const results: unknown[] = [];
    for (const [name, rule] of [
      ["untreated", ""],
      ["indicator-hidden", ".brick-segment-group__indicator { display:none!important }"],
      ["rtl-stress-hidden", '[data-testid="segment-group-stress"] > [dir="rtl"] { display:none!important }'],
      ["indicator-transform", ".brick-segment-group__indicator { translate:none!important; transform:translate(var(--radio-group-indicator-x,0),var(--radio-group-indicator-y,0))!important }"],
      ["root-scroll-contained", ".brick-segment-group { overflow:auto!important }"],
      ["stress-relative", '[data-testid="segment-group-stress"] { position:relative!important }'],
      ["rtl-specimen-relative", '[data-testid="segment-group-stress"] > [dir="rtl"] { position:relative!important }'],
      ["indicator-no-transition", ".brick-segment-group__indicator { transition:none!important }"],
      ["root-transform", ".brick-segment-group { transform:translateZ(0)!important }"],
      ["indicator-no-translate", ".brick-segment-group__indicator { translate:none!important; transform:none!important }"],
      ["root-inline-grid", ".brick-segment-group { display:inline-grid!important; grid-auto-flow:column!important }"],
      ["root-ltr", ".brick-segment-group { direction:ltr!important }"],
    ]) {
      // Every intervention gets its own navigation: a layout invalidation in
      // one probe must not repair the starting state of the next experiment.
      const probe = await page.context().newPage();
      try {
      // Install before the application mounts. Post-layout interventions can
      // merely invalidate WebKit's cached overflow, obscuring the initial cause.
      // The untreated control uses the identical response interception.
      await probe.route(url => url.pathname === "/segment-group", async route => {
        const response = await route.fetch();
        const body = (await response.text()).replace("<head>", `<head><style id="release-overflow-probe">${rule}</style>`);
        await route.fulfill({ response, body });
      });
      await probe.goto(page.url());
      await probe.locator('[data-testid="segment-group-stress"]').waitFor();
      results.push(await probe.evaluate(async ({ name, rule }) => {
        const start = performance.now();
        const measure = (phase: string) => ({ phase, elapsed: performance.now() - start, width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth });
        const settle = () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        const samples = [measure("pre-render-rule")];
        await settle();
        samples.push(measure("pre-render-two-frames"));
          document.getElementById("release-overflow-probe")?.remove();
          await settle();
          samples.push(measure("restored"));
        return { probe: name, samples };
      }, { name, rule }));
      } finally { await probe.close(); }
    }
    await testInfo.attach("segment-overflow-isolation", { body: Buffer.from(JSON.stringify(results, null, 2)), contentType: "application/json" });
  }
}
