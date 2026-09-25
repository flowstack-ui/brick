import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { StackBasic } from "./examples/StackBasic.js";
import source from "./examples/StackBasic.tsx?raw";
import { StackDocumentation } from "./StackDocumentation.js";
import { StackEvidence, stackScenarios } from "./StackEvidence.js";
export { stackScenarios } from "./StackEvidence.js";
export function StackPage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <StackEvidence />;
  return (
    <VStack data-component-page="stack" gap={6}>
      <Scenario {...stackScenarios[0]} hideHeading>
        <ExamplePreview label="Stack" source={source}>
          <StackBasic />
        </ExamplePreview>
      </Scenario>
      <StackDocumentation />
    </VStack>
  );
}
