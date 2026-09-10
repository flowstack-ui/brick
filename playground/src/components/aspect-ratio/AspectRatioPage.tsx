import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario } from "../../shared/Scenario.js";
import { AspectRatioBasic } from "./examples/AspectRatioBasic.js";
import basicSource from "./examples/AspectRatioBasic.tsx?raw";
import { AspectRatioDocumentation } from "./AspectRatioDocumentation.js";
import { AspectRatioEvidence, aspectRatioScenarios } from "./AspectRatioEvidence.js";

export { aspectRatioScenarios } from "./AspectRatioEvidence.js";

export function AspectRatioPage() {
  const preview = usePreviewContext();
  const qualification = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1";
  if (preview || qualification) return <AspectRatioEvidence />;
  return <VStack data-component-page="aspect-ratio" gap="6">
    <Scenario {...aspectRatioScenarios[0]} hideHeading>
      <ExamplePreview label="Aspect Ratio" source={basicSource}><AspectRatioBasic /></ExamplePreview>
    </Scenario>
    <AspectRatioDocumentation />
  </VStack>;
}
