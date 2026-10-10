import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import {
  AppearanceEvidence,
  appearanceScenarios,
} from "./AppearanceEvidence.js";
import { AppearanceDocumentation } from "./AppearanceDocumentation.js";
import { AppearanceBasic } from "./examples/AppearanceBasic.js";
import source from "./examples/AppearanceBasic.tsx?raw";
export { appearanceScenarios } from "./AppearanceEvidence.js";
export function AppearancePage() {
  const preview = usePreviewContext();
  const qualification =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <AppearanceEvidence />;
  return (
    <VStack data-component-page="appearance" gap="6">
      <Scenario {...appearanceScenarios[0]} hideHeading>
        <ExamplePreview label="Appearance" source={source}>
          <AppearanceBasic />
        </ExamplePreview>
      </Scenario>
      <AppearanceDocumentation />
    </VStack>
  );
}
