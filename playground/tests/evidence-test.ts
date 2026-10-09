import { test as base } from "@playwright/test";
import { captureReleaseDiagnostic } from "./release-diagnostic-capture.js";
export * from "@playwright/test";

/** Owner suites exercise ordinary inline pages with deterministic settings.
 * There is one Page implementation, not a test-only duplicate.
 */
export const test = base.extend({
  page: async ({ page, baseURL }, use, testInfo) => {
    if (process.env.FLOWSTACK_DIAGNOSTIC_CAPTURE === "1") {
      await page.addInitScript(() => {
        const events: unknown[] = [];
        Object.defineProperty(window, "releasePointerEvidence", { value: events });
        // Diagnostic-only observer provenance. Native delivery and callbacks
        // remain synchronous; no errors are filtered or notifications deferred.
        if (location.pathname === "/nav-list") {
          const observations: unknown[] = [];
          Object.defineProperty(window, "releaseResizeEvidence", { value: observations });
          const NativeObserver = window.ResizeObserver;
          window.ResizeObserver = class extends NativeObserver {
            constructor(callback: ResizeObserverCallback) {
              const stack = new Error("ResizeObserver creation").stack;
              super((entries, observer) => {
                observations.push({ stack, time: performance.now(), entries: entries.map(entry => ({
                  target: entry.target.outerHTML.slice(0, 1000), rect: entry.contentRect.toJSON(),
                })) });
                if (observations.length > 100) observations.shift();
                callback.call(observer, entries, observer);
              });
            }
          };
        }
        for (const type of ["pointerdown", "pointerup", "click", "focusin", "focusout"]) {
          document.addEventListener(type, event => {
            const target = event.target as HTMLElement;
            if (!target.closest?.("#hook-form")) return;
            events.push({ type, time: performance.now(), target: target.outerHTML.slice(0, 1500),
              scrollY, checked: document.querySelector('#hook-form [data-value="email"]')?.getAttribute("aria-checked") });
          }, true);
        }
      });
    }
    const navigate = page.goto.bind(page);
    page.goto = (input, options) => {
      const url = new URL(input, baseURL);
      if (url.origin === new URL(baseURL!).origin && /^\/[a-z][a-z-]*$/.test(url.pathname)) {
        if (!url.searchParams.has("testMode")) url.searchParams.set("testMode", "1");
      }
      return navigate(url.href, options);
    };
    await use(page);
    await captureReleaseDiagnostic(page, testInfo);
  },
});
