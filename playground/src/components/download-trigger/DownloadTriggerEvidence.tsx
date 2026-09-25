import { useState } from "react";
import { Download } from "lucide-react";
import { Button, DownloadTrigger, FormatByte, HStack, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
export const downloadTriggerScenarios = [
  {id:"download-trigger.ready",number:1,title:"Ready data",description:"A text file with standard Button geometry."},
  {id:"download-trigger.async",number:2,title:"Preparation",description:"Lazy preparation exposes pending state and preserves the label."},
  {id:"download-trigger.error",number:3,title:"Error and disabled",description:"Application-owned feedback without claiming a successful save."},
  {id:"download-trigger.formats",number:4,title:"File formats",description:"Blob, File and SVG producers use the same download behavior."},
  {id:"download-trigger.cancel",number:5,title:"Cancellation",description:"Removing a preparing trigger aborts its producer without starting a download."},
] as const;
export function DownloadTriggerEvidence(){const [error,setError]=useState(""); const [mounted, setMounted] = useState(true); const fail = () => setError("Export unavailable. Try again."); return <VStack gap="6" data-component-page="download-trigger">
  <Scenario {...downloadTriggerScenarios[0]}><Specimen label="Project notes"><DownloadTrigger onDownloadError={fail} data-testid="ready-download" data="Project notes\nHello 🌍" fileName="project-notes.txt" mimeType="text/plain" startIcon={<Download/>}>Download notes</DownloadTrigger></Specimen></Scenario>
  <Scenario {...downloadTriggerScenarios[1]}><Specimen label="Prepared report"><DownloadTrigger onDownloadError={fail} data={()=>new Promise<string>(resolve=>setTimeout(()=>resolve("Report"),500))} fileName="report.txt" mimeType="text/plain" variant="outline" size={{lg:"md"}} startIcon={<Download/>}>Prepare report</DownloadTrigger></Specimen></Scenario>
  <Scenario {...downloadTriggerScenarios[2]}><Specimen label="Unavailable export"><VStack gap="3"><HStack gap="3"><DownloadTrigger data={()=>Promise.reject(new Error("Export unavailable. Try again."))} fileName="report.txt" mimeType="text/plain" onDownloadError={()=>setError("Export unavailable. Try again.")}>Retry export</DownloadTrigger><DownloadTrigger disabled data="" fileName="empty.txt" mimeType="text/plain">Unavailable</DownloadTrigger></HStack><Text role="status">{error}</Text></VStack></Specimen></Scenario>
  <Scenario {...downloadTriggerScenarios[3]}><VStack gap="4"><Specimen label="JSON Blob"><DownloadTrigger onDownloadError={fail} data={() => new Blob([JSON.stringify({ project: "Northstar" })], { type: "application/json" })} fileName="project.json" variant="outline">Download JSON</DownloadTrigger></Specimen>
    <Specimen label="Binary File"><DownloadTrigger onDownloadError={fail} data={() => new File([new Uint8Array([0, 1, 2, 255])], "sample.bin", { type: "application/octet-stream" })} fileName="sample.bin" variant="outline">Download binary — <FormatByte value={4} /></DownloadTrigger></Specimen>
    <Specimen label="SVG artwork"><DownloadTrigger onDownloadError={fail} data={'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>'} fileName="circle.svg" mimeType="image/svg+xml" variant="outline" fullWidth startIcon={<Download />}>Download vector</DownloadTrigger></Specimen>
  </VStack></Scenario>
  <Scenario {...downloadTriggerScenarios[4]}><Specimen label="Abortable preparation"><VStack gap="3">{mounted && <DownloadTrigger onDownloadError={fail} fileName="large-report.txt" mimeType="text/plain" data={({ signal }) => new Promise<string>((resolve, reject) => {
    const timer = setTimeout(() => resolve("Prepared report"), 5000);
    signal.addEventListener("abort", () => { clearTimeout(timer); reject(new DOMException("Cancelled", "AbortError")); }, { once: true });
  })}>Prepare large report</DownloadTrigger>}<Button variant="outline" onClick={() => setMounted(!mounted)}>{mounted ? "Remove export control" : "Restore export control"}</Button></VStack></Specimen></Scenario>
</VStack>;}
