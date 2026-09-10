import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("DownloadTrigger preserves generated file bytes and cancels unmounted preparation", async ({ page }) => {
 await page.goto("/download-trigger");
 const pending = page.waitForEvent("download");
 await page.getByRole("button", { name: /Download binary/ }).click();
 const download = await pending;
 expect(download.suggestedFilename()).toBe("sample.bin");
 const stream = await download.createReadStream();
 const chunks: Buffer[] = [];
 for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
 expect([...Buffer.concat(chunks)]).toEqual([0, 1, 2, 255]);
 await page.clock.install();
 let downloads = 0; page.on("download", () => downloads++);
 await page.getByRole("button", { name: "Prepare large report", exact: true }).click();
 await page.getByRole("button", { name: "Remove export control", exact: true }).click();
 await page.clock.fastForward(6000);
 expect(downloads).toBe(0);
 await expect(page.getByRole("status")).toBeEmpty();
 await page.getByRole("button", { name: "Restore export control", exact: true }).click();
 await expect(page.getByRole("button", { name: "Prepare large report", exact: true })).toBeEnabled();
});
test("DownloadTrigger downloads and preserves button geometry during preparation",async({page})=>{
 await page.goto("/download-trigger");const pending=page.waitForEvent("download");await page.getByRole("button",{name:"Download notes"}).click();expect((await pending).suggestedFilename()).toBe("project-notes.txt");
 const prepare=page.getByRole("button",{name:"Prepare report"});const before=await prepare.boundingBox();const asyncDownload=page.waitForEvent("download");await prepare.click();await expect(prepare).toHaveAttribute("aria-busy","true");const after=await prepare.boundingBox();expect(after!.width).toBeCloseTo(before!.width,0);expect(after!.height).toBe(before!.height);await asyncDownload;
 await page.getByRole("button",{name:"Retry export"}).click();await expect(page.getByRole("status")).toHaveText("Export unavailable. Try again.");
 const result=await new AxeBuilder({page}).include('[data-component-page="download-trigger"]').analyze();expect(result.violations.filter(v=>v.impact==="serious"||v.impact==="critical")).toEqual([]);
});
