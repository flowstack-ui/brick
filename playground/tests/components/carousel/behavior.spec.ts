import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/carousel?qualification=1"); await expect(page.getByRole("group", { name: "Flowstack story" }).first()).toBeVisible(); });

test("Carousel navigates with arrows and picker dots", async ({ page }) => {
  const root = page.locator("#scenario-carousel-overview .brick-carousel");
  const next = root.getByRole("button", { name: "Next slide" });
  await next.press("Enter");
  await expect(root.getByRole("button", { name: "Launch faster" })).toHaveAttribute("data-state", "active");
  await root.getByRole("button", { name: "Grow without rewrites" }).click();
  await expect(root.getByText("A foundation that scales.")).toBeVisible();
});

test("Carousel fill propagates an explicitly owned parent height", async ({ page }) => {
  const root = page.locator("#scenario-carousel-overview .brick-carousel");
  await expect(root).toHaveAttribute("data-fill", "");

  for (const part of [
    root,
    root.locator(".brick-carousel__viewport"),
    root.locator(".brick-carousel__track"),
    root.locator('.brick-carousel__slide[data-state="active"]'),
  ]) {
    await expect(part).toHaveCSS("height", "420px");
  }
});

test("Carousel Viewport keeps its focus indicator inside its clipped edge", async ({ page }) => {
  const root = page.locator("#scenario-carousel-overview .brick-carousel").first();
  const viewport = page
    .locator("#scenario-carousel-overview .brick-carousel__viewport")
    .first();
  await viewport.focus();
  await expect(viewport).toBeFocused();

  const focusGeometry = await viewport.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      outlineStyle: style.outlineStyle,
      radius: Number.parseFloat(style.borderStartStartRadius),
    };
  });
  const overlayGeometry = await root.evaluate((node) => {
    const style = getComputedStyle(node, "::after");
    return {
      content: style.content,
      borderStyle: style.borderStyle,
      borderWidth: Number.parseFloat(style.borderTopWidth),
      radius: Number.parseFloat(style.borderStartStartRadius),
    };
  });
  expect(focusGeometry.outlineStyle).toBe("none");
  expect(focusGeometry.radius).toBeGreaterThan(0);
  expect(overlayGeometry.content).not.toBe("none");
  expect(overlayGeometry.borderStyle).toBe("solid");
  expect(overlayGeometry.borderWidth).toBeGreaterThan(0);
  expect(overlayGeometry.radius).toBeGreaterThan(0);
});

test("Carousel permits control-free and picker-only composition", async ({ page }) => {
  const scenario = page.locator("#scenario-carousel-controls");
  await expect(scenario.getByRole("group", { name: "Manual story" }).getByRole("button")).toHaveCount(0);
  await expect(scenario.getByRole("group", { name: "Picker story" }).getByRole("button")).toHaveCount(3);
});

test("Carousel exposes rotation control, mobile containment, and no axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const root = page.locator("#scenario-carousel-rotation .brick-carousel");
  await expect(root.getByRole("button", { name: "Stop slide rotation" })).toBeVisible();
  await root.getByRole("button", { name: "Stop slide rotation" }).click();
  await expect(root.getByRole("button", { name: "Start slide rotation" })).toBeVisible();
  expect((await new AxeBuilder({ page }).include("#scenario-carousel-rotation").analyze()).violations).toEqual([]);
  expect(await root.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
});

test("Carousel keeps interaction arrows keyboard reachable and picker treatment independent", async ({ page }) => {
  const root = page.locator("#scenario-carousel-rotation .brick-carousel");
  const navigation = root.locator(".brick-carousel__navigation");
  const picker = root.locator(".brick-carousel__picker");
  await expect(navigation).toHaveAttribute("data-visibility", "interaction");
  await expect(picker).toHaveAttribute("data-variant", "bare");
  await expect(root.getByRole("button", { name: "Stop slide rotation" })).toHaveAttribute("data-size", "xs");
  await expect(navigation).toHaveCSS("opacity", "0");
  await root.getByRole("button", { name: "Previous slide" }).focus();
  await expect(navigation).toHaveCSS("opacity", "1");
  await expect(root.getByRole("button", { name: "Previous slide" })).toBeFocused();
});

test("Carousel loop preserves forward direction across the last boundary", async ({ page }) => {
  const root = page.locator("#scenario-carousel-overview .brick-carousel");
  const next = root.getByRole("button", { name: "Next slide" });
  await next.press("Enter");
  await next.press("Enter");
  await next.press("Enter");
  await expect(root.locator('[data-slot="carousel-slide"][data-value="build"]')).toHaveAttribute("data-state", "active");
  await expect(root.locator('[data-slot="carousel-slide"][data-value="build"]')).not.toHaveAttribute("data-loop-position", "before");
});

test("Carousel measured pages keep visible peers interactive and deduplicate the terminal page", async ({ page }) => {
  await page.goto("/carousel");
  const root = page.getByRole("group", { name: "Multiple carousel", exact: true });
  await expect(root.locator('[data-visible]')).toHaveCount(2);
  await expect(root.locator('.brick-carousel__picker-item')).toHaveCount(3);
  await root.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(root).toHaveAttribute("data-page", "1");
  await root.getByRole("button", { name: "Next slide", exact: true }).click();
  await expect(root).toHaveAttribute("data-page", "2");
  await expect(root.getByRole("button", { name: "Next slide", exact: true })).toBeDisabled();
  await expect(root.locator('[data-visible]')).toHaveCount(2);
});

test("Carousel honors reduced motion after initialization and centers controls in RTL", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const root = page.locator("#scenario-carousel-overview .brick-carousel");
  await expect(root.locator('.brick-carousel__viewport')).toHaveCSS("scroll-behavior", "auto");
  await root.evaluate(node => node.setAttribute("dir", "rtl"));
  const geometry = await root.evaluate(node => {
    const bounds = node.getBoundingClientRect();
    const controls = node.querySelector('.brick-carousel__controls')!.getBoundingClientRect();
    return Math.abs((bounds.left + bounds.right) / 2 - (controls.left + controls.right) / 2);
  });
  expect(geometry).toBeLessThan(1);
});

test("Carousel controls use independent shared action recipes", async ({ page }) => {
  const root = page.locator("#scenario-carousel-rotation .brick-carousel");
  const action = root.getByRole("button", { name: "Stop slide rotation" });
  await expect(action).toHaveClass(/brick-button/);
  await expect(action).toHaveClass(/brick-icon-button/);
  await expect(action).toHaveAttribute("data-variant", "ghost");
  await expect(action).toHaveAttribute("data-tone", "neutral");
});

test("Carousel vertical, controlled and store examples navigate", async ({ page }) => {
  await page.goto("/carousel");
  for (const name of ["Vertical carousel", "Controlled carousel"]) {
    const root = page.getByRole("group", { name, exact: true });
    await root.getByRole("button", { name: "Next slide", exact: true }).click();
    await expect(root).toHaveAttribute("data-page", "1");
    const viewport = root.locator('.brick-carousel__viewport');
    await expect.poll(() => viewport.evaluate(node => Math.max(Math.abs(node.scrollLeft), node.scrollTop))).toBeGreaterThan(20);
  }
  await page.getByRole("button", { name: "Go to Share", exact: true }).click();
  await expect(page.getByRole("group", { name: "Store carousel", exact: true })).toHaveAttribute("data-page", "2");
});

test("Carousel drag changes position and releases its cursor", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mouse drag is qualified on desktop; native touch has separate coverage.");
  await page.goto("/carousel");
  const root = page.getByRole("group", { name: "Drag carousel", exact: true });
  const viewport = root.locator('.brick-carousel__viewport');
  await viewport.scrollIntoViewIfNeeded();
  const box = (await viewport.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.8, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.15, box.y + 100, { steps: 12 });
  await expect(viewport).toHaveAttribute("data-dragging", "");
  await page.mouse.up();
  await expect(viewport).not.toHaveAttribute("data-dragging", "");
  await expect.poll(() => viewport.evaluate(node => node.scrollLeft)).toBeGreaterThan(20);
});

test("Carousel forward and reverse loops have no empty animation frames or duplicate content", async ({ page }) => {
  await page.emulateMedia({reducedMotion:"no-preference"});
  const root=page.locator("#scenario-carousel-overview .brick-carousel");
  await root.getByRole("button",{name:"Grow without rewrites"}).click();
  const viewport=root.locator('.brick-carousel__viewport');
  await expect.poll(()=>viewport.evaluate(node=>Math.abs(node.scrollLeft-node.clientWidth*3))).toBeLessThan(2);
  for (const part of ["next","previous"]) {
    const frames=await root.evaluate(async (node,part)=>{
      const viewport=node.querySelector('.brick-carousel__viewport') as HTMLElement;
      const start=performance.now(); const frames:Array<{offset:number;gap:number}>=[];
      (node.querySelector(`.brick-carousel__${part}`) as HTMLButtonElement).click();
      await new Promise<void>(resolve=>{
        const sample=()=>{
          const v=viewport.getBoundingClientRect();
          const intervals=Array.from(node.querySelectorAll('.brick-carousel__slide')).map(slide=>slide.getBoundingClientRect()).filter(r=>r.right>v.left&&r.left<v.right).sort((a,b)=>a.left-b.left);
          let end=v.left;let gap=0;for(const r of intervals){gap+=Math.max(0,r.left-end);end=Math.max(end,r.right);}gap+=Math.max(0,v.right-end);
          frames.push({offset:viewport.scrollLeft,gap});
          if(performance.now()-start<800)requestAnimationFrame(sample);else resolve();
        };requestAnimationFrame(sample);
      });return frames;
    },part);
    expect(Math.max(...frames.map(frame=>frame.gap))).toBeLessThan(3);
    expect(await root.locator('.brick-carousel__slide').count()).toBe(3);
    const offsets=frames.map(frame=>frame.offset);
    if(part==="next")expect(Math.max(...offsets)).toBeGreaterThan(3*await viewport.evaluate(node=>node.clientWidth));
    else expect(Math.min(...offsets)).toBeLessThan(await viewport.evaluate(node=>node.clientWidth));
  }
});

test("Carousel dynamic removal and resize preserve a usable selected page",async({page})=>{
  await page.goto("/carousel");
  const root=page.getByRole("group",{name:"Dynamic loop carousel",exact:true});
  await root.getByRole("button",{name:"Go to page 3"}).click();
  await page.getByRole("button",{name:"Remove last",exact:true}).click();
  await expect(root).toHaveAttribute("data-value","Create");
  await page.setViewportSize({width:480,height:800});
  await expect.poll(()=>root.locator('.brick-carousel__slide[data-state="active"]').evaluate(node=>{
    const viewport=node.closest('.brick-carousel__viewport')!;return Math.abs(node.getBoundingClientRect().left-viewport.getBoundingClientRect().left);
  })).toBeLessThan(2);
});

test("Carousel text actions and inherited public indicator hooks retain their geometry",async({page})=>{
  await page.goto("/carousel");
  const root=page.getByRole("group",{name:"Arrows carousel",exact:true});
  const next=root.getByRole("button",{name:"Next slide"});
  await expect(next).not.toHaveClass(/brick-icon-button/);
  await expect(next).toHaveText("Next");
  const rectangle=await next.boundingBox();expect(rectangle!.width).toBeGreaterThan(rectangle!.height);
  await root.evaluate(node=>(node.parentElement as HTMLElement).style.setProperty("--brick-carousel-dot-active-background","rgb(12, 34, 56)"));
  await expect(root.locator('.brick-carousel__picker-item[data-state="active"] .brick-carousel__picker-dot')).toHaveCSS("background-color","rgb(12, 34, 56)");
});

test("Carousel runtime reduced motion and variable terminal geometry remain correct",async({page})=>{
  await page.goto("/carousel");
  const root=page.getByRole("group",{name:"Variable carousel",exact:true});
  const viewport=root.locator('.brick-carousel__viewport');
  await root.scrollIntoViewIfNeeded();
  await expect.poll(()=>root.getByRole("button",{name:/Go to page/}).count()).toBeGreaterThan(1);
  await root.getByRole("button",{name:/Go to page/}).last().click();
  await expect(root.getByRole("button",{name:"Next slide"})).toBeDisabled();
  await expect.poll(()=>viewport.evaluate(node=>Math.abs(node.scrollLeft-(node.scrollWidth-node.clientWidth)))).toBeLessThan(2);
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(viewport).toHaveCSS("scroll-behavior","auto");
});

test("Carousel rejected requests cannot move content and newer owner changes supersede them",async({page})=>{
  const root=page.getByRole("group",{name:"Controlled rejection fixture",exact:true});
  await root.scrollIntoViewIfNeeded();const viewport=root.locator('.brick-carousel__viewport');
  await root.getByRole("button",{name:"Next slide"}).click();
  await expect(root).toHaveAttribute("data-page","0");
  await expect.poll(()=>viewport.evaluate(node=>node.scrollLeft)).toBe(0);
  await page.getByRole("button",{name:"External last page"}).click();
  await expect(root).toHaveAttribute("data-page","2");
  await expect.poll(()=>viewport.evaluate(node=>Math.abs(node.scrollLeft-node.clientWidth*2))).toBeLessThan(2);
  await page.getByRole("button",{name:"Accept requests: false"}).click();
  await root.getByRole("button",{name:"Previous slide"}).click();
  await expect(root).toHaveAttribute("data-page","1");
  await expect.poll(()=>viewport.evaluate(node=>Math.abs(node.scrollLeft-node.clientWidth))).toBeLessThan(2);
});

test("Carousel short loops and no-overflow collections do not expose empty padding pages",async({page})=>{
  const root=page.getByRole("group",{name:"Short loop fixture",exact:true});
  await root.scrollIntoViewIfNeeded();await expect(root).toHaveAttribute("data-initialized","");
  await expect(root.locator('[data-slot="carousel-loop-boundary"]')).toHaveCount(0);
  await root.getByRole("button",{name:"Next slide"}).click();
  await root.getByRole("button",{name:"Next slide"}).click();
  await expect(root).toHaveAttribute("data-page","0");
  await expect.poll(()=>root.locator('.brick-carousel__viewport').evaluate(node=>node.scrollLeft)).toBe(0);
  const fits=page.getByRole("group",{name:"No overflow fixture",exact:true});await fits.scrollIntoViewIfNeeded();
  await expect(fits.getByRole("button",{name:"Next slide"})).toBeDisabled();
  await expect(fits.getByRole("button",{name:"Previous slide"})).toBeDisabled();
  await expect(fits.locator('[data-slot="carousel-loop-boundary"]')).toHaveCount(0);
  await expect(fits).not.toHaveAttribute("data-state","playing");
});
