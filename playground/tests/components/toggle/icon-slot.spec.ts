import { expect, test } from "../../evidence-test.js";
test("toggle owns wrapped Icon geometry", async ({page}) => {
  await page.goto('/icon');
  const markup=await page.locator('[data-component-page="icon"] [role=tabpanel] .brick-icon').first().evaluate(el=>el.outerHTML);
  await page.goto('/toggle');
  const geometry=await page.locator('.brick-toggle').first().evaluate((slot,markup)=>{
    const parent=slot.closest('.brick-toggle')!; parent.setAttribute('data-size','2xs');
    const holder=document.createElement('div');holder.innerHTML=markup;
    const wrapped=holder.firstElementChild!; wrapped.setAttribute('data-size','2xl');
    const raw=wrapped.querySelector('svg')!.cloneNode(true) as Element;
    const previous=Array.from(slot.childNodes);slot.replaceChildren(raw);
    const expected=raw.getBoundingClientRect().width;
    slot.replaceChildren(wrapped);const actual=wrapped.getBoundingClientRect().width;
    const flex=getComputedStyle(wrapped).flexBasis;
    slot.replaceChildren(...previous);return {expected,actual,flex};
  },markup);
  expect(geometry.actual).toBeCloseTo(geometry.expected,2);
});
