import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { BleedBasic } from "./examples/BleedBasic.js";
import basicSource from "./examples/BleedBasic.tsx?raw";
import { BleedDocumentation } from "./BleedDocumentation.js";
import { BleedEvidence, bleedScenarios } from "./BleedEvidence.js";

export { bleedScenarios } from "./BleedEvidence.js";

export function BleedPage() {
  const preview = usePreviewContext();
  const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <BleedEvidence />;
  return <VStack data-component-page="bleed" gap="6">
    <Scenario {...bleedScenarios[0]} hideHeading>
      <ExamplePreview label="Bleed" source={basicSource}><BleedBasic /></ExamplePreview>
    </Scenario>
    <BleedDocumentation />
  </VStack>;
}
