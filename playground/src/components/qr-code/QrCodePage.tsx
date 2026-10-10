import { Text, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { QrCodeEvidence } from "./QrCodeEvidence.js";
import { QrCodeBasic } from "./examples/QrCodeBasic.js";
import basicSource from "./examples/QrCodeBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { qrCodeScenarios } from "./QrCodeEvidence.js";
export function QrCodePage() { const preview=usePreviewContext(); if(preview || (typeof window!=="undefined" && new URLSearchParams(window.location.search).get("qualification")==="1")) return <QrCodeEvidence/>;
return <VStack gap={12} data-component-page="qr-code"><ExamplePreview label="QR Code basic" source={basicSource}><QrCodeBasic/></ExamplePreview><OwnerDocumentation name="QR Code" usage={'<QrCode.Root value="https://example.com">\n  <QrCode.Frame titleText="Open destination" />\n</QrCode.Root>'} usageDescription="Generate a code locally and provide a normal link to the same destination." examples={examples} parts={parts} guide={<Text>Keep the quiet zone and high-contrast scanning surface. Size, custom paint and logos need real-device scan checks. Handle download errors; browser handoff does not confirm the file was saved.</Text>}/></VStack>; }
