import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ProgressEvidence } from "./ProgressEvidence.js";
import { ProgressBasic } from "./examples/ProgressBasic.js";
import source from "./examples/ProgressBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { progressScenarios } from "./ProgressEvidence.js";
export function ProgressPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <ProgressEvidence />;
  return <VStack gap={12} data-component-page="progress">
    <ExamplePreview label="Progress basic" source={source}><ProgressBasic /></ExamplePreview>
    <OwnerDocumentation name="Progress" usage={'<Progress.Root value={60} aria-label="Upload">\n  <Progress.Track>\n    <Progress.Indicator />\n  </Progress.Track>\n</Progress.Root>'} usageDescription="Pass a measurable value, or null when progress is unknown. Root owns the accessible task value." examples={examples} parts={parts} />
  </VStack>;
}
