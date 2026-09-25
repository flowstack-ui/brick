import { Show, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { showExamples, showParts } from "./documentation.js";
import { ShowBasic } from "./examples/ShowBasic.js";
import source from "./examples/ShowBasic.tsx?raw";
import { createVisibilityScenarios, VisibilityEvidencePage } from "../_visibility/VisibilityEvidencePage.js";
export const showScenarios = createVisibilityScenarios("show");
export function ShowPage() {
  const preview = usePreviewContext();
  if (preview || new URLSearchParams(window.location.search).get("qualification") === "1") return <VisibilityEvidencePage component={Show} id="show" scenarios={showScenarios} />;
  return <VStack gap={12} data-component-page="show">
    <ExamplePreview label="Show basic" source={source}><ShowBasic /></ExamplePreview>
    <OwnerDocumentation name="Show" usageDescription="Use when for conditional rendering or from for CSS visibility. The modes cannot be combined." usage={'<Show when={ready} fallback={<Text>Waiting</Text>}>\n  <Text>Ready</Text>\n</Show>'} examples={showExamples} parts={showParts} />
  </VStack>;
}
