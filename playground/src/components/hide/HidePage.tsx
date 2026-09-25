import { Hide, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { hideExamples, hideParts } from "./documentation.js";
import { HideBasic } from "./examples/HideBasic.js";
import source from "./examples/HideBasic.tsx?raw";
import { createVisibilityScenarios, VisibilityEvidencePage } from "../_visibility/VisibilityEvidencePage.js";
export const hideScenarios = createVisibilityScenarios("hide");
export function HidePage() {
  const preview = usePreviewContext();
  if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") return <VisibilityEvidencePage component={Hide} id="hide" scenarios={hideScenarios} />;
  return <VStack gap={12} data-component-page="hide">
    <ExamplePreview label="Hide basic" source={source}><HideBasic /></ExamplePreview>
    <OwnerDocumentation name="Hide" usageDescription="Hide content from a viewport breakpoint while keeping it mounted." usage={'<Hide from="md">\n  <Text>Compact content</Text>\n</Hide>'} examples={hideExamples} parts={hideParts} />
  </VStack>;
}
