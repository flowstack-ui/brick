import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { FrameBasic } from "./examples/FrameBasic.js";
import source from "./examples/FrameBasic.tsx?raw";
import { FrameDocumentation } from "./FrameDocumentation.js";
import { FrameEvidence, frameScenarios } from "./FrameEvidence.js";
export { frameScenarios } from "./FrameEvidence.js";
export function FramePage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <FrameEvidence />;
  return (
    <VStack data-component-page="frame" gap="6">
      <Scenario {...frameScenarios[0]} hideHeading>
        <ExamplePreview label="Frame" source={source}>
          <FrameBasic />
        </ExamplePreview>
      </Scenario>
      <FrameDocumentation />
    </VStack>
  );
}
