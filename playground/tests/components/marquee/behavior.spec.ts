import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test("public pause freezes every track without changing separation", async ({ page }) => {
  // Twelve complete pause/resume cycles made forward progress until the hosted
  // WebKit 30s deadline. Preserve every cycle and assertion with a bounded budget.
  test.setTimeout(60000);
  await page.goto("/marquee");
  for (const [label, button] of [["Partners", "partners"], ["Reversed partners", "reversed partners"], ["Left studio gallery", "left gallery"], ["Right studio gallery", "right gallery"]]) {
    const root = page.getByRole("region", { name: label, exact: true }).first();
    await root.scrollIntoViewIfNeeded();
    await expect(root).not.toHaveAttribute("data-static");
    for (let cycle = 0; cycle < 3; cycle++) {
      await page.getByRole("button", { name: `Pause ${button}`, exact: true }).click();
      await expect(root).toHaveAttribute("data-state", "paused");
      const read = () => root.locator(".brick-marquee-content").evaluateAll(nodes => nodes.map(node => {
        const rect = node.getBoundingClientRect();
        const animation = node.getAnimations()[0];
        return { transform: getComputedStyle(node).transform, time: Number(animation?.currentTime), playState: animation?.playState, pending: animation?.pending, x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }));
      // Atom synchronizes each replica once immediately and again after the
      // browser commits every CSS animation's ready promise. Wait for that
      // observable lifecycle state instead of assuming a fixed timer is long
      // enough on every engine.
      await expect.poll(async () => {
        const tracks = await read();
        const times = tracks.map(track => track.time);
        return {
          paused: tracks.every(track => track.playState === "paused"),
          pending: tracks.some(track => track.pending),
          synchronized: Math.max(...times) - Math.min(...times) < 1,
        };
      }).toEqual({ paused: true, pending: false, synchronized: true });
      const before = await read();
      await page.waitForTimeout(250);
      const after = await read();
      expect(after).toEqual(before);
      // Firefox can serialize synchronized CSS animation times 0.02ms apart.
      // Keep the same sub-millisecond bound as the late-replica regression.
      for (const track of after) expect(Math.abs(track.time - after[0].time)).toBeLessThan(1);
      const vertical = await root.getAttribute("data-orientation") === "vertical";
      const gap = await root.locator(".brick-marquee-viewport").evaluate(n => parseFloat(getComputedStyle(n).gap));
      for (let i = 1; i < after.length; i++) {
        const previous = after[i - 1], current = after[i];
        const separation = vertical ? current.y - previous.y - previous.height : current.x - previous.x - previous.width;
        expect(Math.abs(separation - gap)).toBeLessThan(1);
      }
      await page.getByRole("button", { name: `Resume ${button}`, exact: true }).click();
      await expect.poll(async () => (await read())[0].time).toBeGreaterThan(after[0].time);
    }
  }
});

test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/marquee?qualification=1"); });
test("pause realigns a late replica before holding its position", async ({ page }) => {
  await page.goto("/marquee");
  const root = page.getByRole("region", { name: "Reversed partners", exact: true });
  await expect(root.locator("[data-replica]").first()).toBeAttached();
  // Reproduce independently scheduled track phases deterministically, rather
  // than depending on a particular browser's background/compositor timing.
  await root.evaluate(node => {
    const original = node.querySelector("[data-original]")!.getAnimations()[0];
    const copy = node.querySelector("[data-replica]")!.getAnimations()[0];
    copy.currentTime = Number(original.currentTime) + 1500;
  });
  await page.getByRole("button", { name: "Pause reversed partners", exact: true }).click();
  await expect.poll(() => root.evaluate(node => {
    const times = [...node.querySelectorAll(".brick-marquee-content")].map(n => Number(n.getAnimations()[0].currentTime));
    return Math.max(...times) - Math.min(...times);
  })).toBeLessThan(1);
});
test("Marquee documentation exposes source-paired features, part headings and responsive gaps", async ({ page }) => {
  await page.goto("/marquee");
  for (const id of ["reversed", "vertical", "speed", "interaction", "store", "finite", "edges", "multiple", "diagonal", "news", "gallery", "testimonials", "responsive", "defaults"]) {
    const section = page.locator(`#${id}`);
    await expect(section.getByRole("tab", {name: "Code", exact: true})).toHaveCount(1);
  }
  for (const part of ["Root", "RootProvider", "PropsProvider", "Viewport", "Content", "Item", "Edge", "Context"]) {
    await expect(page.locator(`#props-${part.toLowerCase()}`).getByRole("heading", {name: part, exact: true})).toBeVisible();
  }
  const root = page.getByRole("region", {name: "Responsive spacing", exact: true});
  await page.setViewportSize({width: 600, height: 900});
  await expect.poll(() => root.locator("[data-original]").evaluate(n => getComputedStyle(n).gap)).toBe("8px");
  await page.setViewportSize({width: 1000, height: 900});
  await expect.poll(() => root.locator("[data-original]").evaluate(n => getComputedStyle(n).gap)).toBe("24px");
  await expect(root).not.toHaveAttribute("data-static");
});
test("Marquee synchronizes coverage immediately when a paused viewport grows", async ({ page }) => {
  for (const label of ["Start", "End", "RTL start", "Up", "Down"]) {
    const root = page.locator(`[data-example="${label}"]`);
    await expect(root).not.toHaveAttribute("data-static");
    await root.evaluate(node => {
      const root = node as HTMLElement;
      const vertical = root.dataset.orientation === "vertical";
      root.style[vertical ? "height" : "width"] = "120px";
    });
    await page.waitForTimeout(100);
    // Keyboard activation avoids sticky-shell overlap after deliberately
    // expanding a qualification fixture beyond the device viewport.
    const pause = page.getByRole("button", { name: `Pause ${label}`, exact: true });
    await pause.focus();
    await pause.press("Enter");
    const before = await root.evaluate(node => {
      const original = node.querySelector<HTMLElement>("[data-original]")!;
      const animation = original.getAnimations()[0];
      animation.currentTime = parseFloat((node as HTMLElement).style.getPropertyValue("--atom-marquee-duration")) * 1000 * .99;
      return animation.currentTime;
    });
    await root.evaluate(node => {
      const root = node as HTMLElement;
      const distance = parseFloat(root.style.getPropertyValue("--atom-marquee-distance"));
      root.style[root.dataset.orientation === "vertical" ? "height" : "width"] = `${distance * 2.5}px`;
    });
    await expect(root.locator("[data-replica]")).toHaveCount(3);
    const result = await root.evaluate(node => {
      const tracks = [...node.querySelectorAll<HTMLElement>(".brick-marquee-content")];
      const boxes = tracks.map(n => n.getBoundingClientRect());
      const v = node.querySelector(".brick-marquee-viewport")!.getBoundingClientRect();
      const vertical = node.getAttribute("data-orientation") === "vertical";
      return {
        times: tracks.map(n => Number(n.getAnimations()[0].currentTime)),
        uncovered: (vertical ? v.bottom : v.right) - Math.max(...boxes.map(b => vertical ? b.bottom : b.right)),
      };
    });
    for (const time of result.times) expect(time).toBeCloseTo(Number(before), 0);
    expect(result.uncovered).toBeLessThanOrEqual(1);
  }
});
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
  // CSS responds before the media-query change reaches every controller. Check
  // the complete static/accessibility contract, not just the CSS-hidden edge.
  const viewports = page.locator(".brick-marquee-viewport");
  await expect.poll(() => viewports.evaluateAll(nodes => nodes.every(node =>
    node.hasAttribute("data-static") && (node as HTMLElement).tabIndex === 0,
  ))).toBe(true);
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
