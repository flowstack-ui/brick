import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { DownloadTrigger } from "../../../src/download-trigger.js";
it("DownloadTrigger forwards focus placement to shared action presentation", () => {
 render(<DownloadTrigger focusRing="inside" data="bytes" fileName="a.txt">Export</DownloadTrigger>);
 const host = screen.getByRole("button", { name: "Export" });
 expect(host).toHaveAttribute("data-focus-ring", "inside");
 expect(host).not.toHaveAttribute("focusRing");
});
it("DownloadTrigger keeps one Button host and forwards visual props/ref without leaking data",()=>{
 const ref=createRef<HTMLElement>();render(<DownloadTrigger ref={ref} data="bytes" fileName="a.txt" mimeType="text/plain" size="sm" variant="outline" startIcon={<svg/>}>Export</DownloadTrigger>);
 const b=screen.getByRole("button",{name:"Export"});expect(b).toBe(ref.current);expect(b).toHaveClass("brick-button","brick-download-trigger");expect(b).toHaveAttribute("data-size","sm");expect(b).toHaveAttribute("type","button");expect(b).not.toHaveAttribute("fileName");expect(b.querySelector("button")).toBeNull();
});
it("DownloadTrigger preserves disabled and prevented activation",()=>{
 const data=vi.fn(()=>"bytes");render(<DownloadTrigger data={data} fileName="a.txt" mimeType="text/plain" onPress={e=>e.preventDefault()}>Export</DownloadTrigger>);
 fireEvent.click(screen.getByRole("button",{name:"Export"}));expect(data).not.toHaveBeenCalled();
});
it("DownloadTrigger retains Atom busy state without nesting Button behavior",()=>{
 const data=vi.fn(()=>new Promise<string>(()=>{}));
 render(<DownloadTrigger data={data} fileName="a.txt" mimeType="text/plain">Export</DownloadTrigger>);
 const button=screen.getByRole("button",{name:"Export"});
 fireEvent.click(button);expect(button).toHaveAttribute("aria-busy","true");
 fireEvent.click(button);expect(data).toHaveBeenCalledTimes(1);
});
