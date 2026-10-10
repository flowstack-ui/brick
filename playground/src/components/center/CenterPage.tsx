import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { CenterBasic } from "./examples/CenterBasic.js";
import source from "./examples/CenterBasic.tsx?raw";
import { CenterDocumentation } from "./CenterDocumentation.js";
import { CenterEvidence, centerScenarios } from "./CenterEvidence.js";
export { centerScenarios } from "./CenterEvidence.js";

export function CenterPage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <CenterEvidence />;
  return (
    <VStack data-component-page="center" gap="6">
      <Scenario {...centerScenarios[0]} hideHeading>
        <ExamplePreview label="Center" source={source}>
          <CenterBasic />
        </ExamplePreview>
      </Scenario>
      <CenterDocumentation />
    </VStack>
  );
}
