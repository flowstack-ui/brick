import { Toaster, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ToastEvidence } from "./ToastEvidence.js";
import { ToastBasic } from "./examples/ToastBasic.js";
import basicSource from "./examples/ToastBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { toastScenarios } from "./ToastEvidence.js";
export function ToastPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <ToastEvidence />;
  return (
    <VStack gap={12} data-component-page="toast">
      <ExamplePreview label="Toast basic" source={basicSource}><ToastBasic /></ExamplePreview>
      <OwnerDocumentation name="Toaster, toast" usage={'<Toaster />\n<Button onClick={() => toast("Saved")}>Save</Button>'} usageDescription="Mount one Toaster for the default toast helper. Keep essential feedback in persistent content; notifications do not move focus." examples={examples} parts={parts} />
      <Toaster />
    </VStack>
  );
}
