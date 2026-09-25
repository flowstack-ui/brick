import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { SelectEvidence } from "./SelectEvidence.js";
import { examples, parts, SelectBasic, basicSource } from "./documentation.js";
export { selectScenarios } from "./SelectEvidence.js";
export function SelectPage() {
  const preview = usePreviewContext();
  const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <SelectEvidence />;
  return <VStack gap={12} data-component-page="select">
    <ExamplePreview label="Select basic" source={basicSource}><SelectBasic /></ExamplePreview>
    <OwnerDocumentation name="Select" usage={basicSource} usageDescription="Choose predefined values. Keep clear actions beside the trigger, never nested inside it. For editable filtering or creation, use Combobox." examples={examples} parts={parts} />
  </VStack>;
}
