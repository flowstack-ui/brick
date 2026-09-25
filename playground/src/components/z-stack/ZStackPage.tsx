import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { ZStackBasic } from "./examples/ZStackBasic.js";
import source from "./examples/ZStackBasic.tsx?raw";
import { ZStackDocumentation } from "./ZStackDocumentation.js";
import { ZStackEvidence, zStackScenarios } from "./ZStackEvidence.js";
export { zStackScenarios } from "./ZStackEvidence.js";
export function ZStackPage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <ZStackEvidence />;
  return (
    <VStack data-component-page="z-stack" gap="6">
      <Scenario {...zStackScenarios[0]} hideHeading>
        <ExamplePreview label="ZStack" source={source}>
          <ZStackBasic />
        </ExamplePreview>
      </Scenario>
      <ZStackDocumentation />
    </VStack>
  );
}
