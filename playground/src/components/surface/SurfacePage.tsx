import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { SurfaceBasic } from "./examples/SurfaceBasic.js";
import source from "./examples/SurfaceBasic.tsx?raw";
import { SurfaceDocumentation } from "./SurfaceDocumentation.js";
import { SurfaceEvidence, surfaceScenarios } from "./SurfaceEvidence.js";
export { surfaceScenarios } from "./SurfaceEvidence.js";
export function SurfacePage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <SurfaceEvidence />;
  return (
    <VStack data-component-page="surface" gap="6">
      <Scenario {...surfaceScenarios[0]} hideHeading>
        <ExamplePreview label="Surface" source={source}>
          <SurfaceBasic />
        </ExamplePreview>
      </Scenario>
      <SurfaceDocumentation />
    </VStack>
  );
}
