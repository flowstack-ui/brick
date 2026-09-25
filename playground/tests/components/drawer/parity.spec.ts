import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";

test("Drawer docs has reference examples and named props", async ({ page }) => {
  await page.goto("/drawer");
  for (const id of ["controlled","sizes","context","offset","placement","initial-focus","custom-container","header-actions","responsive","nonmodal","retained","props-positioner","props-context"]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole("table", { name: "Drawer.Positioner props", exact: true })).toBeVisible();
});

test("Drawer sizes, base type and inset match the new recipes", async ({ page }) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto("/drawer");
  for (const [size,width] of [["xs",320],["sm",448],["md",512],["lg",672],["xl",896],["full",1440]] as const) {
    await page.locator("#sizes").getByRole("button",{name:size,exact:true}).click();
    const panel = page.getByRole("dialog");
    await expect.poll(async () => Math.round((await panel.boundingBox())!.width)).toBe(width);
    await expect(panel).toHaveCSS("font-size","14px");
    await expect(panel.locator('[data-slot="drawer-body"]')).toHaveCSS("padding-left","24px");
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
  }
});

test("retained Drawer draft and node survive closing", async ({ page }) => {
  await page.goto("/drawer");
  await page.getByRole("button",{name:"Retained drawer",exact:true}).click();
  const input = page.getByRole("textbox",{name:"Draft"});
  await input.fill("Keep my draft");
  await input.evaluate(node => node.setAttribute("data-identity-probe","retained"));
  await page.getByRole("button",{name:"Cancel",exact:true}).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button",{name:"Retained drawer",exact:true}).click();
  await expect(input).toHaveValue("Keep my draft");
  await expect(input).toHaveAttribute("data-identity-probe","retained");
});

test("responsive placement resets dimensions without remounting", async ({page}) => {
  await page.setViewportSize({width:390,height:800});
  await page.goto("/drawer");
  await page.getByRole("button",{name:"Responsive drawer",exact:true}).click();
  const panel=page.getByRole("dialog");
  await expect.poll(async()=>Math.round((await panel.boundingBox())!.width)).toBe(390);
  await expect.poll(async()=>{const b=(await panel.boundingBox())!;return Math.round(b.y+b.height);}).toBe(800);
  await panel.evaluate(node=>node.setAttribute("data-identity-probe","responsive"));
  for (const [viewport,width] of [[500,448],[800,512],[1100,672],[1400,896]]) {
    await page.setViewportSize({width:viewport,height:800});
    await expect.poll(async()=>Math.round((await panel.boundingBox())!.width)).toBe(width);
    await expect.poll(async()=>Math.round((await panel.boundingBox())!.height)).toBe(800);
    await expect(panel).toHaveAttribute("data-identity-probe","responsive");
  }
  await page.setViewportSize({width:390,height:800});
  await expect.poll(async()=>Math.round((await panel.boundingBox())!.width)).toBe(390);
  await expect.poll(async()=>{const box=(await panel.boundingBox())!; return Math.round(box.y+box.height);}).toBe(800);
});

test("nonmodal leaves the page interactive and does not lock scroll", async ({page}) => {
  await page.goto("/drawer");
  await page.getByRole("button",{name:"Nonmodal drawer",exact:true}).click();
  const panel=page.getByRole("dialog");
  await expect(panel).not.toHaveAttribute("aria-modal");
  await page.getByRole("button",{name:"Background count: 0",exact:true}).click();
  await expect(page.getByRole("button",{name:"Background count: 1",exact:true})).toBeVisible();
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
});

test("container and offset stay in the owning region", async ({page}) => {
  await page.goto("/drawer");
  await page.getByRole("button",{name:"Contained drawer",exact:true}).click();
  const panel=page.getByRole("dialog");
  await expect(panel).toBeVisible();
  await expect.poll(async()=>panel.evaluate(node=>{
    const p=node.parentElement!.getBoundingClientRect(); const b=node.getBoundingClientRect();
    return Math.abs(b.right-(p.right-8))<1 && Math.abs(b.top-(p.top+8))<1 && Math.abs(b.height-(p.height-16))<1;
  })).toBe(true);
  await page.keyboard.press("Escape");
  await page.getByRole("button",{name:"Inset drawer",exact:true}).click();
  await expect.poll(async()=>Math.round((await page.getByRole("dialog").boundingBox())!.y)).toBe(16);
  await expect(page.getByRole("dialog")).toHaveCSS("opacity", "1");
  expect((await new AxeBuilder({page}).include('[data-slot="drawer-content"]').analyze()).violations).toEqual([]);
});

test("Context and initial focus use the existing state and focus owners",async({page})=>{
  await page.goto("/drawer");
  await page.getByRole("button",{name:"Context drawer",exact:true}).click();
  await page.getByRole("button",{name:"Close from context: true",exact:true}).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button",{name:"Initial focus",exact:true}).click();
  await expect(page.getByRole("textbox",{name:"Project name",exact:true})).toBeFocused();
});

test("documented nested panels restore focus one layer at a time", async ({page}) => {
  await page.goto("/drawer");
  await page.getByRole("button", {name:"Nested drawer", exact:true}).click();
  const childTrigger=page.getByRole("button", {name:"Edit details", exact:true});
  await childTrigger.click();
  await expect(page.getByRole("dialog", {name:"Project details", exact:true})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", {name:"Project details", exact:true})).toHaveCount(0);
  await expect(childTrigger).toBeFocused();
  await expect(page.getByRole("dialog", {name:"Project settings", exact:true})).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", {name:"Nested drawer", exact:true})).toBeFocused();
});

test("documented scrolling and header actions fit a narrow viewport", async ({page}) => {
  await page.setViewportSize({width:390,height:640});
  await page.goto("/drawer");
  await page.getByRole("button",{name:"Scrollable drawer",exact:true}).click();
  const panel=page.getByRole("dialog");
  const body=panel.locator('[data-slot="drawer-body"]');
  await expect.poll(()=>body.evaluate(node=>node.scrollHeight>node.clientHeight)).toBe(true);
  await body.evaluate(node=>node.scrollTop=node.scrollHeight);
  await expect(panel.getByText(/Section 24\./)).toBeInViewport();
  await expect(page.getByRole("button",{name:"Done reading",exact:true})).toBeInViewport();
  await page.keyboard.press("Escape");
  await page.getByRole("button",{name:"Header actions",exact:true}).click();
  await expect(panel.locator('[data-slot="drawer-footer"]')).toHaveCount(0);
  await expect(panel.getByRole("button",{name:"Save",exact:true})).toBeInViewport();
  await expect.poll(()=>panel.evaluate(node=>node.scrollWidth<=node.clientWidth)).toBe(true);
  await panel.getByRole("button",{name:"Cancel",exact:true}).click();
  await expect(panel).toHaveCount(0);
});
