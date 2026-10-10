import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { SectionBasic } from "./examples/SectionBasic.js";
import source from "./examples/SectionBasic.tsx?raw";
import { SectionDocumentation } from "./SectionDocumentation.js";
import { SectionEvidence, sectionScenarios } from "./SectionEvidence.js";
export { sectionScenarios } from "./SectionEvidence.js";
export function SectionPage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <SectionEvidence />;
  return (
    <VStack data-component-page="section" gap="6">
      <Scenario {...sectionScenarios[0]} hideHeading>
        <ExamplePreview label="Section" source={source}>
          <SectionBasic />
        </ExamplePreview>
      </Scenario>
      <SectionDocumentation />
    </VStack>
  );
}
