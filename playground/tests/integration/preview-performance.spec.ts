import { test, expect } from "@playwright/test";

test("initial docs load stays lazy and records bounded readiness", async ({ page }, info) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const start = Date.now();
  await page.goto("/aspect-ratio?testMode=1&appearance=light");
  await expect(page.locator('[data-scenario]').first()).toBeVisible({ timeout: 10000 });
  const readyMs = Date.now() - start;
  const measurements = await page.evaluate(() => ({
    mountedDocuments: document.querySelectorAll('iframe[src*="preview.html"]').length,
    parentEncodedBytes: performance.getEntriesByType("resource").reduce((total, entry) => total + (entry as PerformanceResourceTiming).encodedBodySize, 0),
  }));
  await info.attach("preview-performance.json", { body: JSON.stringify({ readyMs, ...measurements, viewport: "1280x720", note: "Fresh browser context against local production preview; not real-device or internet latency evidence." }, null, 2), contentType: "application/json" });
  expect(readyMs).toBeLessThan(10000);
  expect(measurements.mountedDocuments).toBe(0);
  expect(measurements.parentEncodedBytes).toBeLessThan(5_000_000);
});
