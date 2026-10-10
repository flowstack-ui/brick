import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { SpinnerEvidence } from "./SpinnerEvidence.js";
import { SpinnerBasic } from "./examples/SpinnerBasic.js";
import source from "./examples/SpinnerBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { spinnerScenarios } from "./SpinnerEvidence.js";
export function SpinnerPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <SpinnerEvidence />;
  return (
    <VStack gap={12} data-component-page="spinner">
      <ExamplePreview label="Spinner basic" source={source}><SpinnerBasic /></ExamplePreview>
      <OwnerDocumentation name="Spinner" usage={'<Spinner />'} usageDescription="Show indeterminate activity. Keep loading state and announcements on the operation that owns them." examples={examples} parts={parts} />
    </VStack>
  );
}
