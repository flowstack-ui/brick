import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({page}) => {
  await page.goto("/chip");
  await expect(page.locator("[data-component-page=chip]")).toBeVisible();
});

test("documentation chips follow the selected theme radius except the explicit pill", async ({ page }) => {
  for (const appearance of ["light", "dark"]) {
    const measured: string[] = [];
    for (const radius of ["square", "small", "large"]) {
      await page.goto(`/chip?appearance=${appearance}&radius=${radius}`);
      const chips = page.locator('[data-component-page="chip"] .brick-chip:not([data-unstyled], [data-shape="pill"])');
      expect(await chips.count()).toBeGreaterThan(20);
      const corners = await chips.evaluateAll(nodes => nodes.map(node => getComputedStyle(node).borderTopLeftRadius));
      expect(new Set(corners).size).toBe(1);
      if (radius === "square") expect(corners[0]).toBe("0px");
      measured.push(corners[0]);
      await expect(page.locator('#radius .brick-chip[data-shape="pill"]')).toHaveCSS("border-top-left-radius", "9999px");
    }
    expect(new Set(measured).size).toBe(3);
  }
});

test("all palette recipes preserve pairs, borders and the subtle alias", async ({page}) => {
  for (const appearance of ["light","dark"]) {
    await page.goto("/chip?appearance="+appearance);
    const failures=await page.locator("#variants .brick-chip").first().evaluate(root => {
      const errors:string[]=[];
      const probe=document.createElement("span"); root.append(probe);
      const resolve=(value:string)=>{probe.style.color=value;return getComputedStyle(probe).color;};
      for(const tone of ["neutral","contrast","accent","info","success","warning","danger"]) {
        root.setAttribute("data-tone",tone);
        for(const variant of ["soft","subtle","outline","surface","solid"]) {
          root.setAttribute("data-variant",variant);
          const s=getComputedStyle(root);
          const fg=resolve("var(--brick-chip-tone-"+(variant==="outline"?"text":variant==="solid"?"on-solid":"on-soft")+")");
          const bg=variant==="outline"?"rgba(0, 0, 0, 0)":resolve("var(--brick-chip-tone-"+(variant==="solid"?"solid":"soft")+")");
          const border=["soft","subtle"].includes(variant)?"rgba(0, 0, 0, 0)":resolve("var(--brick-chip-tone-"+(variant==="solid"?"solid":"border")+")");
          if(s.color!==fg || s.backgroundColor!==bg || s.borderTopColor!==border) errors.push(tone+"/"+variant);
        }
      }
      probe.remove(); return errors;
    });
    expect(failures).toEqual([]);
    const colors=await page.locator("#colors .brick-chip").evaluateAll(nodes=>nodes.slice(0,2).map(n=>getComputedStyle(n).backgroundColor));
    expect(colors[0]).not.toBe(colors[1]);
  }
});

test("responsive geometry resets without remounting and compact padding is ordered", async ({page}) => {
  const root=page.locator("#responsive .brick-chip");
  await root.evaluate(n=>n.setAttribute("data-stable-marker","yes"));
  for(const [width,height,font] of [[390,20,12],[800,24,14],[1100,36,16],[1400,32,14],[390,20,12]]) {
    await page.setViewportSize({width,height:900});
    await expect(root).toHaveCSS("min-height",height+"px");
    await expect(root).toHaveCSS("font-size",font+"px");
    await expect(root).toHaveAttribute("data-stable-marker","yes");
  }
  const values=await page.locator("#sizes .brick-chip").evaluateAll(nodes=>nodes.map(n=>{
    n.setAttribute("data-density","compact");
    const s=getComputedStyle(n); return [n.getBoundingClientRect().height,parseFloat(s.paddingInlineStart),parseFloat(s.fontSize)];
  }));
  expect(values).toEqual([[18,6,12],[20,6,12],[24,8,14],[32,10,14]]);
  for(const [suffix,width] of [["",390],["-sm",600],["-md",850],["-lg",1100],["-xl",1400]] as const) {
    await page.setViewportSize({width,height:900});
    const geometry=await root.evaluate((n,suffix)=>{
      for(const name of n.getAttributeNames()) if(name.startsWith("data-size") || name.startsWith("data-density")) n.removeAttribute(name);
      n.setAttribute("data-size","md"); n.setAttribute("data-density","comfortable");
      const values=[];
      for(const density of ["compact","comfortable"]) for(const size of ["sm","md","lg","xl"]) {
        n.setAttribute("data-size"+suffix,size);n.setAttribute("data-density"+suffix,density);
        values.push(n.getBoundingClientRect().height);
      }
      return values;
    },suffix);
    expect(geometry).toEqual([18,20,24,32,28,32,36,40]);
  }
});

test("named actions, focus recovery, disabled and unstyled composition", async ({page}) => {
  const closed=page.locator("#closable");
  await closed.getByRole("button",{name:"Remove Design",exact:true}).click();
  await expect(closed.getByRole("button",{name:"Remove Research",exact:true})).toBeFocused();
  await closed.getByRole("button",{name:"Remove Research",exact:true}).click();
  await expect(closed.getByRole("button",{name:"Restore filters"})).toBeFocused();
  const disabled=page.locator("#disabled .brick-chip__remove-trigger").first();
  await expect(disabled).toBeDisabled();
  await expect(disabled).toHaveCSS("opacity","0.5");
  await expect(disabled).toHaveCSS("cursor","not-allowed");
  await expect(page.locator("#disabled .brick-chip").first()).toHaveCSS("opacity","1");
  const button=page.locator("#composition").getByRole("button",{name:"Open project"});
  await expect(button).toHaveClass(/brick-button/);
  await button.click();
  await expect(page.locator("#composition").getByRole("status")).toHaveText("Project opened");
  await expect(page.locator("#composition .brick-chip[data-unstyled]")).toHaveCSS("border-top-width","0px");
  expect((await new AxeBuilder({page}).include("[data-component-page=chip]").analyze()).violations).toEqual([]);
});

test("narrow long labels preserve reachable actions and forced colors",async({page})=>{
  await page.setViewportSize({width:390,height:900});
  const chip=page.locator("#overflow .brick-chip");
  const label=chip.locator(".brick-chip__label");
  expect(await label.evaluate(n=>n.scrollWidth>n.clientWidth)).toBe(true);
  const remove=chip.getByRole("button");
  const box=await remove.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(24);
  expect(box!.height).toBeGreaterThanOrEqual(24);
  expect(await chip.evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
  await page.emulateMedia({forcedColors:"active",reducedMotion:"reduce"});
  await expect(remove).toBeVisible();
  await remove.focus();
  await expect(remove).toBeFocused();
});

test("nested styling resets, native fieldset disabled and long primary actions",async({page})=>{
  const result=await page.locator("#disabled .brick-chip").first().evaluate(root=>{
    const outer=document.createElement("span");outer.className="brick-chip";outer.setAttribute("data-unstyled","");
    root.replaceWith(outer);outer.append(root);root.setAttribute("dir","rtl");
    const fieldset=document.createElement("fieldset");fieldset.disabled=true;outer.append(fieldset);
    const nested=root.cloneNode(true) as HTMLElement;fieldset.append(nested);
    const action=nested.querySelector("button")!;action.removeAttribute("disabled");action.removeAttribute("data-disabled");
    return {rootDisplay:getComputedStyle(root).display,outerDisplay:getComputedStyle(outer).display,opacity:getComputedStyle(action).opacity,cursor:getComputedStyle(action).cursor,disabled:action.matches(":disabled")};
  });
  // The outer span is blockified by the example's flex layout, not Chip styling.
  expect(result).toEqual({rootDisplay:"inline-flex",outerDisplay:"block",opacity:"0.5",cursor:"not-allowed",disabled:true});
  const chip=page.locator("#actions .brick-chip");
  await chip.evaluate(n=>{(n as HTMLElement).style.maxWidth="200px";n.querySelector(".brick-chip__label")!.textContent="International design systems working group";});
  expect(await chip.evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
  const boxes=await chip.locator("button").evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,height:r.height};}));
  expect(boxes[0].right).toBeLessThanOrEqual(boxes[1].left);
  for(const box of boxes){expect(box.width).toBeGreaterThanOrEqual(24);expect(box.height).toBeGreaterThanOrEqual(24);}
});

test("core plus modular Chip CSS delivers the same geometry and paint",async({page})=>{
  const root=page.locator("#closable .brick-chip").first();
  const measure=(n:Element)=>{const s=getComputedStyle(n);const b=n.querySelector("button")!.getBoundingClientRect();return {height:n.getBoundingClientRect().height,font:s.fontSize,background:s.backgroundColor,color:s.color,target:[b.width,b.height]};};
  const before=await root.evaluate(measure);
  const html=await root.evaluate(n=>n.outerHTML);
  const css=(await readFile("dist/styles/core.css","utf8"))+(await readFile("dist/styles/chip.css","utf8"));
  await page.setContent('<!doctype html><html data-brick-appearance="light"><head><style>'+css+'</style></head><body>'+html+'</body></html>');
  expect(await page.locator(".brick-chip").evaluate(measure)).toEqual(before);
});
