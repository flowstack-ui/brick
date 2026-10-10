import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { OverlayManagerEvidence } from "./OverlayManagerEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { overlayManagerScenarios } from "./OverlayManagerEvidence.js";
export function OverlayManagerPage() {
 const preview = usePreviewContext();
 if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <OverlayManagerEvidence />;
 return <VStack gap={12} data-component-page="overlay-manager">
 <ExamplePreview label="Overlay Manager basic" source={basicSource}><Basic /></ExamplePreview>
 <OwnerDocumentation name="createOverlay" usage={usage} examples={examples} parts={parts} usageDescription="Create a stable manager and mount one Viewport under your providers. Forward all injected lifecycle props to the authored overlay. Await open for the answer; await close or waitForExit for completed exit." />
 </VStack>;
}
