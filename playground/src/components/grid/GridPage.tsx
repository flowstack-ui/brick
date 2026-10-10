import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { GridBasic } from "./examples/GridBasic.js";
import source from "./examples/GridBasic.tsx?raw";
import { GridDocumentation } from "./GridDocumentation.js";
import { GridEvidence, gridScenarios } from "./GridEvidence.js";
export { gridScenarios } from "./GridEvidence.js";
export function GridPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <GridEvidence />;
  return (
    <VStack data-component-page="grid" gap={6}>
      <Scenario {...gridScenarios[0]} hideHeading>
        <ExamplePreview label="Grid" source={source}>
          <GridBasic />
        </ExamplePreview>
      </Scenario>
      <GridDocumentation />
    </VStack>
  );
}
