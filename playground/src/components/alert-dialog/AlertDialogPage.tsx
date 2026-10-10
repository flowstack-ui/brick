import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { AlertDialogEvidence } from "./AlertDialogEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { alertDialogScenarios } from "./AlertDialogEvidence.js";
export function AlertDialogPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <AlertDialogEvidence />;
  return <VStack gap={12} data-component-page="alert-dialog">
    <ExamplePreview label="Alert Dialog basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="AlertDialog" usage={usage} examples={examples} parts={parts}
      usageDescription="Keep Overlay beside Positioner. Use a visible Title, an explicit description and safe Cancel before Action. Outside clicks never dismiss the decision." />
  </VStack>;
}
