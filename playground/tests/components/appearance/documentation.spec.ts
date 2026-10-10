import { expect, test } from "../../evidence-test.js";

test("docs expose usage, reference examples, guide and props", async ({ page }) => {
 await page.goto("/appearance");
 for (const name of ["Usage", "Examples", "Nested", "Portalled", "Page-specific appearance", "Native HTML", "Composition", "Guide", "Props"]) {
  await expect(page.getByRole("heading", {name, exact:true})).toBeVisible();
 }
 await expect(page.getByRole("table", { name: "Appearance props" })).toBeVisible();
 await page.getByRole("button", {name:"Open dark popover", exact:true}).click();
 await expect(page.getByRole("dialog")).toHaveCSS("color-scheme","dark");
 await page.keyboard.press("Escape");
});

test("native foreground tracks scope without overriding component or author paint", async ({ page }) => {
 await page.goto("/appearance");
 for (const value of ["light", "dark"]) {
  const host = page.getByRole("region", {name:value+" native content"});
  const native = host.locator("p").first();
  const primary = host.getByText("Brick primary text", {exact:true});
  const secondary = host.getByText("Brick secondary text stays secondary.", {exact:true});
  await expect(native).toHaveCSS("color", await primary.evaluate(e=>getComputedStyle(e).color));
  await expect(native).not.toHaveCSS("color", await secondary.evaluate(e=>getComputedStyle(e).color));
  await expect(host).toHaveCSS("background-color","rgba(0, 0, 0, 0)");
  await expect(host).toHaveCSS("color-scheme",value);
  await expect(host.getByText("An explicit author color stays explicit.")).toHaveCSS("color",value === "dark" ? "rgb(196, 181, 253)" : "rgb(102, 51, 153)");
 }
 const light = page.getByRole("region", {name:"light native content"});
 const dark = page.getByRole("region", {name:"dark native content"});
 await expect(light).not.toHaveCSS("color", await dark.evaluate(e=>getComputedStyle(e).color));
 // Isolate the real defect: no colored Surface ancestor supplying foreground.
 const result = await dark.evaluate(host=>{
  const wrapper = document.createElement("div");
  wrapper.style.color="rgb(1, 2, 3)";
  host.before(wrapper); wrapper.append(host);
  const explicit=getComputedStyle(host).color;
  host.removeAttribute("data-brick-appearance");
  const inherited=getComputedStyle(host).color;
  host.style.color="rgb(4, 5, 6)";
  host.setAttribute("data-brick-appearance","dark");
  return {explicit,inherited,authored:getComputedStyle(host).color};
 });
 expect(result.explicit).not.toBe("rgb(1, 2, 3)");
 expect(result.inherited).toBe("rgb(1, 2, 3)");
 expect(result.authored).toBe("rgb(4, 5, 6)");
 const button=page.getByRole("button",{name:"Existing button paint is preserved"});
 expect(await button.evaluate(e=>getComputedStyle(e).color)).not.toBe(await button.evaluate(e=>{
  const probe=document.createElement("span");probe.style.color="var(--brick-color-text-primary)";e.append(probe);
  const color=getComputedStyle(probe).color;probe.remove();return color;
 }));
});

test("documentation reflows and preserves forced-color adaptation", async ({ page }) => {
 await page.setViewportSize({width:390,height:844});
 await page.goto("/appearance");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
 await page.emulateMedia({forcedColors:"active"});
 if (await page.evaluate(()=>CSS.supports("forced-color-adjust", "auto"))) {
  await expect(page.getByRole("region",{name:"dark native content"})).toHaveCSS("forced-color-adjust","auto");
 }
});
