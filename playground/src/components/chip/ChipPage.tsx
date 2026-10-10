import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ChipEvidence } from "./ChipEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { chipScenarios } from "./ChipEvidence.js";
export function ChipPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <ChipEvidence />;
  return (
    <VStack gap={12} data-component-page="chip">
      <ExamplePreview label="Chip basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Chip"
        usage={basicSource}
        examples={examples}
        parts={parts}
        usageDescription="Present an existing value. Add independently named actions only when the application can perform them."
      />
    </VStack>
  );
}
