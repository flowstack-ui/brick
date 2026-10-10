import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { EmptyStateEvidence } from "./EmptyStateEvidence.js";
import { EmptyStateBasic } from "./examples/EmptyStateBasic.js";
import source from "./examples/EmptyStateBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { emptyStateScenarios } from "./EmptyStateEvidence.js";
export function EmptyStatePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <EmptyStateEvidence />;
  return (<VStack gap={12} data-component-page="empty-state">
    <ExamplePreview label="Empty State basic" source={source}><EmptyStateBasic /></ExamplePreview>
    <OwnerDocumentation name="EmptyState" usage={'<EmptyState.Root>\n  <EmptyState.Content>\n    <EmptyState.Title>No results</EmptyState.Title>\n    <EmptyState.Description>Try another search.</EmptyState.Description>\n  </EmptyState.Content>\n</EmptyState.Root>'} usageDescription="Present an empty collection with a clear message and an application-owned next step." examples={examples} parts={parts} />
  </VStack>);
}
