import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ReorderableListEvidence } from "./ReorderableListEvidence.js";
import { ReorderableListBasic } from "./examples/ReorderableListBasic.js";
import basicSource from "./examples/ReorderableListBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { reorderableListScenarios } from "./ReorderableListEvidence.js";
export function ReorderableListPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <ReorderableListEvidence />;
  return <VStack gap={12} data-component-page="reorderable-list">
    <ExamplePreview label="Reorderable List basic" source={basicSource}><ReorderableListBasic /></ExamplePreview>
    <OwnerDocumentation name="ReorderableList" usage={'<ReorderableList.Root items={items} onItemsChange={setItems} getItemLabel={getItemLabel}>\n  {/* Keyed Items with labelled Handle and visible movement controls. */}\n  <ReorderableList.Preview />\n</ReorderableList.Root>'}
      usageDescription="Reorder one controlled list using a handle, keyboard, or visible movement buttons. Keep stable identities; save the resulting order in your application."
      examples={examples} parts={parts} />
  </VStack>;
}
