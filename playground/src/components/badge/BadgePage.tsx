import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { BadgeEvidence } from "./BadgeEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { badgeScenarios } from "./BadgeEvidence.js";
export function BadgePage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <BadgeEvidence />;
  return (
    <VStack gap={12} data-component-page="badge">
      <ExamplePreview label="Badge basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="Badge"
        usage={basicSource}
        examples={examples}
        parts={parts}
        usageDescription="Use a short visible label. Badge is passive; actions belong to Button or Chip."
      />
    </VStack>
  );
}
