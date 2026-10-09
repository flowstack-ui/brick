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
}
