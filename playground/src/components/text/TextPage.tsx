import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { TextEvidence } from "./TextEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { textScenarios } from "./TextEvidence.js";
export function TextPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <TextEvidence />;
  return <VStack gap={12} data-component-page="text">
    <ExamplePreview label="Text basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Text" usage={basicSource} usageDescription="Choose semantic structure independently from the visual recipe. Named typography exports share Text presentation options." examples={examples} parts={parts} />
  </VStack>;
}
