import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { NativeSelectEvidence } from "./NativeSelectEvidence.js";
import { examples, parts, NativeSelectBasic, basicSource } from "./documentation.js";
export { nativeSelectScenarios } from "./NativeSelectEvidence.js";
export function NativeSelectPage() {
  const preview = usePreviewContext();
  const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <NativeSelectEvidence />;
  return <VStack gap={12} data-component-page="native-select">
    <ExamplePreview label="NativeSelect basic" source={basicSource}><NativeSelectBasic /></ExamplePreview>
    <OwnerDocumentation name="NativeSelect" usage={basicSource} usageDescription="Use the platform picker for ordinary options. Field remains a native select; Root owns the visual recipe." examples={examples} parts={parts} />
  </VStack>;
}
