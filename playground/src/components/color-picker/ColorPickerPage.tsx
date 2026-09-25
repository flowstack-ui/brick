import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ColorPickerEvidence } from "./ColorPickerEvidence.js";
import { examples, parts, ColorPickerBasic, basicSource } from "./documentation.js";
export { colorPickerScenarios } from "./ColorPickerEvidence.js";
export function ColorPickerPage() {
 const preview = usePreviewContext();
 const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
 if (preview || qualification) return <ColorPickerEvidence />;
 return <VStack gap={12} data-component-page="color-picker">
   <ExamplePreview label="ColorPicker basic" source={basicSource}><ColorPickerBasic /></ExamplePreview>
   <OwnerDocumentation name="ColorPicker" usageDescription="Compose an input and trigger with a popup editor. Area and Sliders provide the default editing controls; keep each input and trigger accessibly named." usage={basicSource} examples={examples} parts={parts} />
 </VStack>;
}
