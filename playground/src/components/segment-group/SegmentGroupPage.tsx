import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { SegmentGroupEvidence } from "./SegmentGroupEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { segmentGroupScenarios } from "./SegmentGroupEvidence.js";
export function SegmentGroupPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <SegmentGroupEvidence />;
  return (
    <VStack gap={12} data-component-page="segment-group">
      <ExamplePreview label="SegmentGroup basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="SegmentGroup"
        usage={usage}
        examples={examples}
        parts={parts}
        usageDescription="A compact radio-semantic choice. Tone affects only the selected surface; use Tabs for paired panels."
      />
    </VStack>
  );
}
