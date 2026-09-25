import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

test.beforeEach(async ({ page }) => { await page.goto("/qr-code?qualification=1"); });
test("all scenarios render and preset frames stay square", async ({ page }) => {
  await expect(page.locator('[data-scenario^="qr-code."]')).toHaveCount(18);
  const sizes = await page.locator('[data-scenario="qr-code.sizes"] .brick-qr-code-frame').evaluateAll(nodes => nodes.map(node => {
    const r = node.getBoundingClientRect(); return [r.width, r.height];
  }));
  expect(sizes).toEqual([40,64,80,120,160,200,240].map(size => [size,size]));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});
test("controlled edits recover without stale graphics", async ({ page }) => {
  const scenario = page.locator('[data-scenario="qr-code.controlled"]');
  const pattern = scenario.locator("path");
  const before = await pattern.getAttribute("d");
  await scenario.getByRole("textbox").fill("Hello 🌎");
  await expect(pattern).not.toHaveAttribute("d", before!);
  await scenario.getByRole("textbox").fill("x".repeat(8000));
  await expect(pattern).toHaveCount(0);
  await scenario.getByRole("textbox").fill("Recovered");
  await expect(pattern).toHaveCount(1);
});
test("logo follows the square and dark mode retains scanning paint", async ({ page }) => {
  const root = page.locator('[data-scenario="qr-code.logos"] .brick-qr-code').first();
  await expect(root.locator('[data-slot="qr-code-overlay"]')).toBeVisible();
  await expect.poll(async () => root.evaluate(node => {
    const a = node.querySelector(".brick-qr-code-frame")!.getBoundingClientRect();
    const b = node.querySelector(".brick-qr-code-overlay")!.getBoundingClientRect();
    return Math.abs(a.x+a.width/2-b.x-b.width/2)+Math.abs(a.y+a.height/2-b.y-b.height/2);
  })).toBeLessThan(1);
  const paints = await page.locator('[data-scenario="qr-code.appearance"] .brick-qr-code-frame').evaluateAll(nodes => nodes.slice(0,2).map(node => [getComputedStyle(node.querySelector("path")!).fill, getComputedStyle(node.querySelector("rect")!).fill]));
  expect(paints[0]).toEqual(paints[1]);
  expect(paints[0]).toEqual(["rgb(0, 0, 0)", "rgb(255, 255, 255)"]);
});
test("download and dialog remain usable", async ({ page }) => {
  const scenario = page.locator('[data-scenario="qr-code.download"]');
  const download = page.waitForEvent("download");
  await scenario.getByRole("button", { name: "SVG", exact: true }).click();
  expect((await download).suggestedFilename()).toBe("document.svg");
  await page.getByRole("button", { name: "Share document", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("every logo backing stays square and authored text keeps scanning ink", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    const overlays = page.locator(".brick-qr-code-overlay");
    await expect(overlays).toHaveCount(4);
    for (const overlay of await overlays.all()) {
      await expect.poll(() => overlay.evaluate(node => {
        const box = node.getBoundingClientRect();
        const frame = node.closest(".brick-qr-code")!.querySelector(".brick-qr-code-frame")!.getBoundingClientRect();
        return Math.max(Math.abs(box.width-box.height), Math.abs(box.width-frame.width/3));
      })).toBeLessThan(1);
    }
    const letters = page.locator(".brick-qr-code-overlay > span");
    await expect(letters).toHaveCount(2);
    for (const letter of await letters.all()) {
      await expect(letter).toHaveCSS("color", "rgb(0, 0, 0)");
      const fits = await letter.evaluate(node => {
        const a=node.getBoundingClientRect(), b=node.parentElement!.getBoundingClientRect();
        return a.width<=b.width-8 && a.height<=b.height-8;
      });
      expect(fits).toBeTruthy();
    }
  }
});
test("QR accessibility and alternative actions", async ({ page }) => {
  const result = await new AxeBuilder({page}).include('[data-component-page="qr-code"]').analyze();
  expect(result.violations.filter(v=>v.impact === "serious" || v.impact === "critical")).toEqual([]);
});

test("public docs expose copyable features and independently styled actions", async ({page}) => {
  await page.goto("/qr-code");
  await expect(page.locator("[data-scenario]")).toHaveCount(0);
  await expect(page.getByRole("tab",{name:"Code",exact:true})).toHaveCount(15);
  await expect(page.getByRole("table",{name:"QR Code.DownloadTrigger props",exact:true})).toBeVisible();
  const action=page.locator("#download");
  await expect(action.getByRole("button",{name:"Download PNG",exact:true})).toHaveAttribute("data-size","sm");
  await expect(action.getByRole("button",{name:"Download SVG",exact:true})).toHaveClass(/brick-icon-button/);
  const download=page.waitForEvent("download");
  await action.getByRole("button",{name:"Download SVG",exact:true}).click();
  expect((await download).suggestedFilename()).toBe("document.svg");
  const result=await new AxeBuilder({page}).include('[data-component-page="qr-code"]').analyze();
  expect(result.violations.filter(v=>v.impact==="serious"||v.impact==="critical")).toEqual([]);
});

test("responsive full size remains square and resets at later breakpoints", async ({page}) => {
  await page.goto("/qr-code");
  const frame=page.locator("#responsive [data-slot=qr-code-frame]");
  for(const [width,expected] of [[390,0],[900,160],[1400,240]]) {
    await page.setViewportSize({width,height:900});
    await expect.poll(async()=>frame.evaluate(n=>Math.abs(n.getBoundingClientRect().width-n.getBoundingClientRect().height))).toBeLessThan(1);
    if(expected) await expect.poll(async()=>frame.evaluate(n=>n.getBoundingClientRect().width)).toBe(expected);
    else {
      const fit=await frame.evaluate(n=>n.getBoundingClientRect().width<=n.parentElement!.parentElement!.getBoundingClientRect().width);
      expect(fit).toBeTruthy();
    }
  }
});

test("root overlay tokens and projected graphic preserve geometry", async ({page}) => {
  await page.goto("/qr-code");
  const overlay=page.locator("#logo [data-slot=qr-code-overlay]");
  await expect(overlay).toHaveCSS("width","32px");
  await expect(overlay).toHaveCSS("padding","4px");
  await expect.poll(()=>overlay.evaluate(n=>{
    const b=n.getBoundingClientRect(),a=n.closest("[data-slot=qr-code-root]")!.querySelector("svg")!.getBoundingClientRect();
    return Math.abs(a.x+a.width/2-b.x-b.width/2)+Math.abs(a.y+a.height/2-b.y-b.height/2);
  })).toBeLessThan(1);
  const svg=page.getByRole("img",{name:"Composed unstyled code"});
  await expect(svg).not.toHaveClass(/brick-qr-code-frame/);
  await expect(svg).toHaveAttribute("id","composed-code-frame");
  await expect(svg.locator("path")).toHaveAttribute("d",/^M/);
});

test("portable overlay shows the Brick mark and downloads a PNG", async ({ page }) => {
  await page.goto("/qr-code");
  const example = page.locator("#overlay-export");
  const overlay = example.locator(".brick-qr-code-overlay");
  await expect(overlay.locator("span > svg rect")).toHaveCount(3);
  await expect(overlay).toHaveText("");
  await expect(overlay).toHaveCSS("width", "32px");
  const downloaded = page.waitForEvent("download");
  await example.getByRole("button", { name: "Download with logo" }).click();
  const file = await downloaded;
  expect(file.suggestedFilename()).toBe("branded.png");
  const bytes = await readFile((await file.path())!);
  expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  expect([bytes.readUInt32BE(16), bytes.readUInt32BE(20)]).toEqual([512, 512]);
  await expect(example.getByRole("status")).toHaveCount(0);
});
