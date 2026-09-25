import { expect, test } from "../../evidence-test.js";
import { setAppearance } from "../../visual-harness.js";

test("contrast follows appearance without recoloring the target", async ({page}) => {
  await page.goto("/notification-badge");
  const root=page.locator('#tones .brick-notification-badge[data-tone="contrast"]');
  const paints=[];
  for(const appearance of ["light","dark"] as const) {
    await setAppearance(page,appearance);
    paints.push(await root.evaluate(e=>{
      const style=getComputedStyle(e);
      const indicator=getComputedStyle(e.querySelector('.brick-notification-badge__indicator')!);
      return {bg:indicator.backgroundColor,fg:indicator.color,solid:style.getPropertyValue('--brick-badge-tone-solid').trim(),height:e.querySelector('.brick-notification-badge__indicator')!.getBoundingClientRect().height};
    }));
  }
  expect(paints[0].bg).not.toBe(paints[1].bg);
  for(const paint of paints) { expect(paint.bg).not.toBe(paint.fg); expect(paint.height).toBe(20); }
});

test("both anchoring compositions preserve independent target and indicator geometry", async ({ page }) => {
  await page.goto("/notification-badge");
  const basic = page.getByRole("button", {name:"Inbox, 3 unread messages"}).first();
  const outer = page.locator("#outer-anchor .brick-notification-badge");
  const measure = (element: Element) => {
    const button = element.matches("button") ? element : element.querySelector("button")!;
    const b = button.getBoundingClientRect();
    const svg = button.querySelector("svg")!.getBoundingClientRect();
    const badge = (element.matches("button") ? element.querySelector(".brick-notification-badge") : element)!.getBoundingClientRect();
    return { target: b.width, icon: svg.width, anchor: badge.width };
  };
  expect(await basic.evaluate(measure)).toEqual({target:44,icon:20,anchor:20});
  expect(await outer.evaluate(measure)).toEqual({target:44,icon:20,anchor:44});
  await expect(page.locator("#locale .brick-notification-badge__indicator").first()).toHaveText("٩٩+");
  const borders = await page.locator("#border .brick-notification-badge__indicator").evaluateAll(items => items.map(e => ({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,border:getComputedStyle(e).borderTopColor})));
  expect(borders[0].width).toBe(borders[1].width);
  expect(borders[0].height).toBe(borders[1].height);
  expect(borders[1].border).toBe("rgba(0, 0, 0, 0)");
});

test("all action sizes preserve nested raw, wrapped and projected icon sizing", async ({page}) => {
  await page.goto("/notification-badge?qualification=1");
  const region = page.getByTestId("notification-badge-sizing-integration");
  for (const [size,control,icon] of [["2xs",24,14],["xs",32,16],["sm",36,16],["md",40,20],["lg",44,20],["xl",48,20],["2xl",64,24]] as const) {
    for (const kind of ["Raw","Icon","Projected"]) {
      const button = region.getByRole("button",{name:`${kind} ${size}, 3 unread`,exact:true});
      expect(await button.evaluate(e=>e.getBoundingClientRect().width)).toBe(control);
      expect(await button.locator("svg").evaluate(e=>e.getBoundingClientRect().width)).toBe(icon);
      expect(await button.locator(".brick-notification-badge").evaluate(e=>e.getBoundingClientRect().width)).toBe(icon);
    }
  }
  await expect(region.getByRole("button",{name:"Disabled inbox, 3 unread"})).toBeDisabled();
  await expect(region.getByRole("button",{name:"Loading inbox"})).toHaveAttribute("aria-busy","true");
});

test("sizes progress and responsive offsets mirror logically", async ({page}) => {
  await page.goto("/notification-badge");
  const sizes=await page.locator("#sizes .brick-notification-badge__indicator").evaluateAll(items=>items.map(e=>({height:e.getBoundingClientRect().height,font:parseFloat(getComputedStyle(e).fontSize)})));
  expect(sizes).toEqual([14,16,20,24,28].map((height,i)=>({height,font:10+i})));
  const root=page.locator("#offsets .brick-notification-badge");
  for(const width of [390,1120]) {
    await page.setViewportSize({width,height:900});
    for(const dir of ["ltr","rtl"]) {
      await root.evaluate((e,dir)=>e.setAttribute("dir",dir),dir);
      const box=await root.boundingBox(); const indicator=await root.locator(".brick-notification-badge__indicator").boundingBox();
      const center=indicator!.x+indicator!.width/2;
      const start=width<768;
      expect(Math.abs(center - ((start === (dir==="ltr")) ? box!.x : box!.x+box!.width))).toBeLessThan(1);
      expect(indicator!.height).toBe(width<768 ? 16 : 20);
      const y=indicator!.y+indicator!.height/2;
      expect(Math.abs(y-(width<768 ? box!.y+box!.height : box!.y+4))).toBeLessThan(1);
    }
  }
});
