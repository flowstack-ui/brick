import {test,expect} from "@playwright/test";
test("share a document through a QR or its alternative link",async({page})=>{
 await page.goto("/");
 await expect(page.getByRole("img",{name:"Scan to open project notes"})).toBeVisible();
 await expect(page.getByRole("link",{name:"Open project notes",exact:true})).toHaveAttribute("href","https://example.com/shared/project-notes");
 const pending=page.waitForEvent("download");
 await page.getByRole("button",{name:"Save sharing code"}).click();
 const download=await pending;expect(download.suggestedFilename()).toBe("project-notes.png");
 const stream=await download.createReadStream();const chunks:Buffer[]=[];for await(const chunk of stream!) chunks.push(Buffer.from(chunk));
 expect(Buffer.concat(chunks).subarray(0,2).toString("hex")).toBe("8950");
});
