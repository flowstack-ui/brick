import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ColorSwatchEvidence } from "./ColorSwatchEvidence.js";
import { examples, parts, ColorSwatchBasic, basicSource } from "./documentation.js";
export { colorSwatchScenarios } from "./ColorSwatchEvidence.js";
export function ColorSwatchPage() {
 const preview = usePreviewContext();
 const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
 if (preview || qualification) return <ColorSwatchEvidence />;
 return <VStack gap={12} data-component-page="color-swatch">
   <ExamplePreview label="ColorSwatch basic" source={basicSource}><ColorSwatchBasic /></ExamplePreview>
   <OwnerDocumentation name="ColorSwatch" usageDescription="Pass a CSS color to value. Swatches are passive previews: use nearby text or an accessible label to identify the color." usage={basicSource} examples={examples} parts={parts} />
 </VStack>;
}
