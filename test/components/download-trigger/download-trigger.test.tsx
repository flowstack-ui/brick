import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { DownloadTrigger } from "../../../src/download-trigger.js";
import { ButtonGroup } from "../../../src/button.js";
it("DownloadTrigger renders shared custom loading without leaking props", () => {
 render(<DownloadTrigger loading loadingText="Preparing" spinner={<span>Custom spinner</span>} spinnerPlacement="end" data="x" fileName="x.txt" mimeType="text/plain">Export</DownloadTrigger>);
 const host=screen.getByRole("button",{name:"Preparing"});
 expect(host).toHaveAttribute("data-custom-loading", "");
 expect(host).not.toHaveAttribute("loadingText");
 expect(host).not.toHaveAttribute("spinnerPlacement");
 expect(host).not.toHaveAttribute("spinner");
 expect(host.querySelector(".brick-button__loading-content")?.lastElementChild).toHaveClass("brick-button__spinner");
});
it("DownloadTrigger automatic pending uses loadingText and icon-only uses IconButton", () => {
 render(<><DownloadTrigger data={()=>new Promise<string>(()=>{})} fileName="a.txt" mimeType="text/plain" loadingText="Preparing report">Export report</DownloadTrigger>
 <DownloadTrigger iconOnly aria-label="Download file" data="x" fileName="x.txt" mimeType="text/plain" loading spinner={<span>Busy</span>}><svg /></DownloadTrigger></>);
 fireEvent.click(screen.getByRole("button",{name:"Export report"}));
 expect(screen.getByRole("button",{name:"Preparing report"})).toHaveAttribute("aria-busy","true");
 const icon=screen.getByRole("button",{name:"Download file"});
 expect(icon).toHaveClass("brick-icon-button");
 expect(icon.querySelector(".brick-button__loading-overlay")).not.toBeNull();
 expect(icon.querySelector("button")).toBeNull();
});
it("DownloadTrigger inherits action-group defaults and preserves explicit overrides", () => {
 render(<ButtonGroup size="sm" variant="outline" tone="neutral" focusRing="inside">
  <DownloadTrigger data="x" fileName="x.txt" mimeType="text/plain">Inherited</DownloadTrigger>
  <DownloadTrigger data="x" fileName="x.txt" mimeType="text/plain" size="lg" tone="accent">Explicit</DownloadTrigger>
 </ButtonGroup>);
 const inherited = screen.getByRole("button", { name: "Inherited" });
 expect(inherited).toHaveAttribute("data-size", "sm");
 expect(inherited).toHaveAttribute("data-variant", "outline");
 expect(inherited).toHaveAttribute("data-tone", "neutral");
 expect(inherited).toHaveAttribute("data-focus-ring", "inside");
 expect(screen.getByRole("button", { name: "Explicit" })).toHaveAttribute("data-size", "lg");
 expect(screen.getByRole("button", { name: "Explicit" })).toHaveAttribute("data-tone", "accent");
});
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
