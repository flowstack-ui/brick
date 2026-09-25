import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { FloatingPanelEvidence } from "./FloatingPanelEvidence.js";
import { Basic, basicSource, examples, parts, usage } from "./documentation.js";
export { floatingPanelScenarios } from "./FloatingPanelEvidence.js";
export function FloatingPanelPage() {
const preview = usePreviewContext();
if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <FloatingPanelEvidence />;
return (<VStack gap={12} data-component-page="floating-panel">
<ExamplePreview label="Floating Panel basic" source={basicSource}><Basic /></ExamplePreview>
<OwnerDocumentation name="FloatingPanel" usage={usage} examples={examples} parts={parts} usageDescription="Compose a named nonmodal tool. Add numeric geometry controls, as shown below, when users need a click/tap alternative to dragging." />
</VStack>);
}
