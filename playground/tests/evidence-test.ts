import { test as base } from "@playwright/test";
export * from "@playwright/test";

/** Owner suites exercise ordinary inline pages with deterministic settings.
 * There is one Page implementation, not a test-only duplicate.
 */
export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const navigate = page.goto.bind(page);
    page.goto = (input, options) => {
      const url = new URL(input, baseURL);
      if (url.origin === new URL(baseURL!).origin && /^\/[a-z][a-z-]*$/.test(url.pathname)) {
        if (!url.searchParams.has("testMode")) url.searchParams.set("testMode", "1");
      }
      return navigate(url.href, options);
    };
    await use(page);
  },
});
