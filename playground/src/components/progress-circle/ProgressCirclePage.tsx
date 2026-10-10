import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ProgressCircleEvidence } from "./ProgressCircleEvidence.js";
import { ProgressCircleBasic } from "./examples/ProgressCircleBasic.js";
import source from "./examples/ProgressCircleBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { progressCircleScenarios } from "./ProgressCircleEvidence.js";
export function ProgressCirclePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <ProgressCircleEvidence />;
  return <VStack gap={12} data-component-page="progress-circle">
    <ExamplePreview label="ProgressCircle basic" source={source}><ProgressCircleBasic /></ExamplePreview>
    <OwnerDocumentation name="ProgressCircle" usage={'<ProgressCircle.Root value={60} aria-label="Export">\n  <ProgressCircle.Circle>\n    <ProgressCircle.Track />\n    <ProgressCircle.Indicator />\n  </ProgressCircle.Circle>\n</ProgressCircle.Root>'} usageDescription="Communicate measurable or unknown task completion with a circular indicator." examples={examples} parts={parts} />
  </VStack>;
}
