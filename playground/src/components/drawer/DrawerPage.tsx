import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { DrawerEvidence } from "./DrawerEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { drawerScenarios } from "./DrawerEvidence.js";
export function DrawerPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <DrawerEvidence />;
  return <VStack gap={12} data-component-page="drawer">
    <ExamplePreview label="Drawer basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Drawer" usage={usage} examples={examples} parts={parts} usageDescription="Keep Overlay beside Positioner; place the labeled Content inside Positioner. Atom owns state, focus and dismissal." />
  </VStack>;
}
