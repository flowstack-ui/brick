import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ContextMenuGuide } from "./ContextMenuGuide.js";
import { ContextMenuEvidence } from "./ContextMenuEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { contextMenuScenarios } from "./ContextMenuEvidence.js";
export function ContextMenuPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <ContextMenuEvidence />;
  return (
    <VStack gap={12} data-component-page="context-menu">
      <ExamplePreview label="ContextMenu basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <OwnerDocumentation
        name="ContextMenu"
        usage={usage}
        examples={examples}
        parts={parts}
        guide={<ContextMenuGuide />}
        usageDescription="Supplemental contextual commands need a visible alternative for important actions."
      />
    </VStack>
  );
}
