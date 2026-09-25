import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { DataListEvidence } from "./DataListEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { dataListScenarios } from "./DataListEvidence.js";
export function DataListPage(): React.ReactElement {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <DataListEvidence />;
  return <VStack gap={12} data-component-page="data-list">
    <ExamplePreview label="Data List basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Data List" usageDescription="Present read-only facts with native labels and values. Use Field for editable values and Table for columnar comparisons." usage={'<DataList.Root>\n  <DataList.Item>\n    <DataList.Label>Name</DataList.Label>\n    <DataList.Value>Jordan Lee</DataList.Value>\n  </DataList.Item>\n</DataList.Root>'} examples={examples} parts={parts}/>
  </VStack>;
}
