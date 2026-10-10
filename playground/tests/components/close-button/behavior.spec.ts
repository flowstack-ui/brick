import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("CloseButton sizes and dialog dismissal retain accessibility",async({page})=>{
 await page.goto("/close-button?qualification=1");
 const sizes=await page.getByTestId("close-sizes").getByRole("button").evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect();const i=n.querySelector("svg")!.getBoundingClientRect();return {w:b.width,h:b.height,offset:Math.abs((i.left+i.width/2)-(b.left+b.width/2))};}));
 expect(sizes.map(s=>s.h)).toEqual([24,32,36,40,44,48,64]);for(const s of sizes){expect(s.w).toBe(s.h);expect(s.offset).toBeLessThan(1);}
 const trigger=page.getByRole("button",{name:"Open settings"});await trigger.click();await page.getByRole("button",{name:"Close settings"}).click();await expect(page.getByRole("dialog")).toHaveCount(0);await expect(trigger).toBeFocused();
 const result=await new AxeBuilder({page}).include('[data-component-page="close-button"]').analyze();expect(result.violations.filter(v=>v.impact==="serious"||v.impact==="critical")).toEqual([]);
});
