import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/marquee"); });
test("Marquee motion, pause and replica safety", async ({ page }) => {
  const root = page.locator('[data-example="Partners"]');
  await expect(root).toHaveAttribute("data-state", "playing");
  await expect(root).not.toHaveAttribute("data-static");
  const content = root.locator("[data-original]");
  const initial = await content.evaluate(node => getComputedStyle(node).transform);
  await expect.poll(() => content.evaluate(node => getComputedStyle(node).transform)).not.toBe(initial);
  await page.getByRole("button", { name: "Pause Partners", exact: true }).click();
  await expect(root).toHaveAttribute("data-state", "paused");
  expect(await content.evaluate(node => getComputedStyle(node).animationPlayState)).toBe("paused");
  expect(await root.locator("[data-replica]").evaluateAll(nodes => nodes.every(node => node.hasAttribute("inert") && node.getAttribute("aria-hidden") === "true"))).toBe(true);
  for (const label of ["Missing replicas", "Rejected link replicas"]) await expect(page.locator(`[data-example="${label}"]`)).toHaveAttribute("data-static");
});
test("Marquee directions, geometry and semantic spacing", async ({ page }) => {
  for (const [label, reversed] of [["Start", false], ["End", true], ["Reverse", true], ["RTL start", true], ["Up", false], ["Down", true]] as const) {
    const root = page.locator(`[data-example="${label}"]`);
    await expect(root).not.toHaveAttribute("data-static");
    expect(await root.locator("[data-original]").evaluate(node => getComputedStyle(node).animationDirection)).toBe(reversed ? "reverse" : "normal");
    const geometry = await root.evaluate(node => ({ distance: parseFloat((node as HTMLElement).style.getPropertyValue("--atom-marquee-distance")), duration: parseFloat((node as HTMLElement).style.getPropertyValue("--atom-marquee-duration")) }));
    expect(geometry.distance / geometry.duration).toBeCloseTo(50);
  }
  expect(await page.locator('[data-example="Slow"] [data-original]').evaluate(node => getComputedStyle(node).gap)).toBe("8px");
  expect(await page.locator('[data-example="Fast delayed"] [data-original]').evaluate(node => getComputedStyle(node).gap)).toBe("32px");
  expect(await page.locator('[data-example="Up"]').evaluate(node => node.getBoundingClientRect().height)).toBe(192);
});
test("Marquee finite callbacks, hidden reveal and independent pause", async ({ page }) => {
  await expect(page.getByTestId("finite-events")).toHaveText("Loop 1 · Loop 2 · Complete", { timeout: 15000 });
  await page.getByRole("button", { name: "Restart finite", exact: true }).click();
  await expect(page.getByTestId("finite-events")).toHaveText("Waiting for the first loop");
  await page.getByRole("button", { name: "Toggle hidden lane" }).click();
  await expect(page.locator('[data-example="Hidden lane"]')).not.toHaveAttribute("data-static");
  await page.getByRole("button", { name: "Pause Controlled hover", exact: true }).click();
  await page.locator('[data-example="Controlled hover"]').hover();
  await page.getByRole("heading", { name: "Independent pause reasons", exact: true }).hover();
  await expect(page.locator('[data-example="Controlled hover"]')).toHaveAttribute("data-state", "paused");
});
test("Marquee focus and reduced motion expose only stationary originals", async ({ page }) => {
  const news = page.locator('[data-example="News"]');
  await news.locator("[data-original] a").last().focus();
  await expect(news).toHaveAttribute("data-static");
  expect(await news.locator(".brick-marquee-viewport").evaluate(node => getComputedStyle(node).overflowX)).toBe("auto");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('[data-example="Partners"]')).toHaveAttribute("data-static");
  await expect(page.locator('[data-example="Partners"] [data-replica]')).toHaveCount(0);
  await expect(page.locator('[data-example="Partners"] .brick-marquee-edge').first()).toBeHidden();
});
test("Marquee accessibility and forced-colors preserve readable originals", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  await expect(page.locator('[data-example="Partners"] .brick-marquee-edge').first()).toBeHidden();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("Marquee delayed images resize the original and passive copies together", async ({ page }) => {
  const root = page.getByRole("region", { name: "Customer stories", exact: true });
  const original = root.locator("[data-original]");
  const before = await original.evaluate(node => node.getBoundingClientRect().height);
  await page.getByRole("button", { name: "Load customer details", exact: true }).click();
  await expect(original.locator("img")).toHaveCount(3);
  await expect.poll(() => original.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await expect.poll(() => original.evaluate(node => node.getBoundingClientRect().height)).toBeGreaterThan(before + 100);
  await expect(root).not.toHaveAttribute("data-static");
  await expect.poll(() => root.locator("[data-replica] img").count()).toBeGreaterThanOrEqual(3);
});
test("Marquee replicas meet the moving track at each loop boundary", async ({ page }) => {
  for (const label of ["Start", "End", "RTL start", "Up", "Down"]) {
    const root = page.locator(`[data-example="${label}"]`);
    await expect(root).not.toHaveAttribute("data-static");
    const results = await root.evaluate(async node => {
      const tracks = Array.from(node.querySelectorAll<HTMLElement>(".brick-marquee-viewport > .brick-marquee-content"));
      const distance = parseFloat((node as HTMLElement).style.getPropertyValue("--atom-marquee-distance"));
      const duration = parseFloat((node as HTMLElement).style.getPropertyValue("--atom-marquee-duration"));
      const vertical = node.getAttribute("data-orientation") === "vertical";
      const viewport = node.querySelector(".brick-marquee-viewport")!.getBoundingClientRect();
      const samples = [];
      for (const progress of [0.001, 0.999]) {
        for (const track of tracks) for (const animation of track.getAnimations()) { animation.pause(); animation.currentTime = duration * 1000 * progress; }
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
        const boxes = tracks.map(track => track.getBoundingClientRect());
        samples.push({ separation: vertical ? boxes[1].top - boxes[0].top : boxes[1].left - boxes[0].left, start: Math.min(...boxes.map(box => vertical ? box.top : box.left)), end: Math.max(...boxes.map(box => vertical ? box.bottom : box.right)) });
      }
      return { distance, start: vertical ? viewport.top : viewport.left, end: vertical ? viewport.bottom : viewport.right, samples };
    });
    for (const sample of results.samples) {
      expect(sample.separation).toBeCloseTo(results.distance, 0);
      expect(sample.start).toBeLessThanOrEqual(results.start + 1);
      expect(sample.end).toBeGreaterThanOrEqual(results.end - 1);
    }
  }
});
