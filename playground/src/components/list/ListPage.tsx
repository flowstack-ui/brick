import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ListEvidence } from "./ListEvidence.js";
import { listExamples, listParts } from "./documentation.js";
import { ListBasic } from "./examples/ListBasic.js";
import source from "./examples/ListBasic.tsx?raw";
export { listScenarios } from "./ListEvidence.js";
export function ListPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    new URLSearchParams(window.location.search).get("qualification") === "1"
  )
    return <ListEvidence />;
  return (
    <VStack gap={12} data-component-page="list">
      <ExamplePreview label="Basic list" source={source}>
        <ListBasic />
      </ExamplePreview>
      <OwnerDocumentation
        name="List"
        usageDescription="Use Root and Item for native list semantics. Add Leading and Content only when the content needs structured layout."
        usage={
          "<List.Root>\n  <List.Item>First item</List.Item>\n  <List.Item>Second item</List.Item>\n</List.Root>"
        }
        examples={listExamples}
        parts={listParts}
      />
    </VStack>
  );
}
