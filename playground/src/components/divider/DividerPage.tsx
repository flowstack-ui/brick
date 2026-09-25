import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { DividerBasic } from "./examples/DividerBasic.js";
import source from "./examples/DividerBasic.tsx?raw";
import { DividerDocumentation } from "./DividerDocumentation.js";
import { DividerEvidence, dividerScenarios } from "./DividerEvidence.js";
export { dividerScenarios } from "./DividerEvidence.js";
export function DividerPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <DividerEvidence />;
  return (
    <VStack data-component-page="divider" gap={6}>
      <Scenario {...dividerScenarios[0]} hideHeading>
        <ExamplePreview label="Divider" source={source}>
          <DividerBasic />
        </ExamplePreview>
      </Scenario>
      <DividerDocumentation />
    </VStack>
  );
}
