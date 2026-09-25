import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { AlertEvidence } from "./AlertEvidence.js";
import { AlertBasic } from "./examples/AlertBasic.js";
import source from "./examples/AlertBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { alertScenarios } from "./AlertEvidence.js";
export function AlertPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <AlertEvidence />;
  return (
    <VStack gap={12} data-component-page="alert">
      <ExamplePreview label="Alert basic" source={source}><AlertBasic /></ExamplePreview>
      <OwnerDocumentation name="Alert" usage={'<Alert.Root>\n  <Alert.Indicator />\n  <Alert.Content>\n    <Alert.Title>Notice</Alert.Title>\n    <Alert.Description>Your message here.</Alert.Description>\n  </Alert.Content>\n</Alert.Root>'} usageDescription="Present persistent feedback. Select urgency explicitly; status chooses the default artwork and palette." examples={examples} parts={parts} />
    </VStack>
  );
}
