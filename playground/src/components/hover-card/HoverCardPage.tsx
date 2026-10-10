import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { HoverCardEvidence } from "./HoverCardEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { hoverCardScenarios } from "./HoverCardEvidence.js";
export function HoverCardPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <HoverCardEvidence />;
  return (
    <VStack gap={12} data-component-page="hover-card">
      <ExamplePreview label="Hover Card basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="HoverCard"
        usage={usage}
        examples={examples}
        parts={parts}
        usageDescription="Use a genuine link for a passive, supplementary preview. Keep essential information at its destination; use Popover for interactive content. Touch preserves the link's native action."
      />
    </VStack>
  );
}
