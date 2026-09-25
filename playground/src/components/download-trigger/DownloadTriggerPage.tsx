import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { DownloadTriggerEvidence } from "./DownloadTriggerEvidence.js";
import { DownloadTriggerBasic } from "./examples/DownloadTriggerBasic.js";
import source from "./examples/DownloadTriggerBasic.tsx?raw";
import { examples,parts } from "./documentation.js";
export { downloadTriggerScenarios } from "./DownloadTriggerEvidence.js";
export function DownloadTriggerPage(){const preview=usePreviewContext();if(preview || (typeof window!=="undefined" && new URLSearchParams(window.location.search).get("qualification")==="1"))return <DownloadTriggerEvidence />;
return <VStack gap={12} data-component-page="download-trigger"><ExamplePreview label="Download Trigger basic" source={source}><DownloadTriggerBasic /></ExamplePreview><OwnerDocumentation name="DownloadTrigger" usage={'<DownloadTrigger data="Hello" fileName="hello.txt" mimeType="text/plain">\n  Download text\n</DownloadTrigger>'} usageDescription="Download generated content after user activation. Use a Link with download for an existing file URL." examples={examples} parts={parts}/></VStack>;}
