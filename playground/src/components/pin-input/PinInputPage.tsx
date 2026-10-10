import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { PinInputEvidence } from "./PinInputEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { pinInputScenarios } from "./PinInputEvidence.js";
export function PinInputPage() {
  const preview = usePreviewContext();
  if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") return <PinInputEvidence />;
  return <VStack gap={12} data-component-page="pin-input">
    <ExamplePreview label="Pin Input basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Pin Input" usage={basicSource} examples={examples} parts={parts} usageDescription="Capture one fixed-length code. Root owns the combined form value; render one Input per length position." />
  </VStack>;
}
