import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { SplitterBasic } from "./examples/SplitterBasic.js";
import source from "./examples/SplitterBasic.tsx?raw";
import { SplitterDocumentation } from "./SplitterDocumentation.js";
import { SplitterEvidence, splitterScenarios } from "./SplitterEvidence.js";
export { splitterScenarios } from "./SplitterEvidence.js";
export function SplitterPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <SplitterEvidence />;
  return (
    <VStack data-component-page="splitter" gap={6}>
      <Scenario {...splitterScenarios[0]} hideHeading>
        <ExamplePreview label="Splitter" source={source}><SplitterBasic /></ExamplePreview>
      </Scenario>
      <SplitterDocumentation />
    </VStack>
  );
}
