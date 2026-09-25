import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { ContainerBasic } from "./examples/ContainerBasic.js";
import source from "./examples/ContainerBasic.tsx?raw";
import { ContainerDocumentation } from "./ContainerDocumentation.js";
import { ContainerEvidence, containerScenarios } from "./ContainerEvidence.js";
export { containerScenarios } from "./ContainerEvidence.js";
export function ContainerPage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <ContainerEvidence />;
  return (
    <VStack data-component-page="container" gap="6">
      <Scenario {...containerScenarios[0]} hideHeading>
        <ExamplePreview label="Container" source={source}>
          <ContainerBasic />
        </ExamplePreview>
      </Scenario>
      <ContainerDocumentation />
    </VStack>
  );
}
