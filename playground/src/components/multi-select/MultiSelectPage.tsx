import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { MultiSelectEvidence } from "./MultiSelectEvidence.js";
import { examples, parts, MultiSelectBasic, basicSource } from "./documentation.js";
export { multiSelectScenarios } from "./MultiSelectEvidence.js";
export function MultiSelectPage() {
  const preview = usePreviewContext();
  const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <MultiSelectEvidence />;
  return <VStack gap={12} data-component-page="multi-select">
    <ExamplePreview label="MultiSelect basic" source={basicSource}><MultiSelectBasic /></ExamplePreview>
    <OwnerDocumentation name="MultiSelect" usage={basicSource} usageDescription="Choose predefined values. Keep clear actions beside the trigger, never nested inside it. For editable filtering or creation, use Combobox." examples={examples} parts={parts} />
  </VStack>;
}
