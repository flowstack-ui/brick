import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { StatEvidence } from "./StatEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { statScenarios } from "./StatEvidence.js";
export function StatPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <StatEvidence />;
  return <VStack gap={12} data-component-page="stat">
    <ExamplePreview label="Stat basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Stat" usage={basicSource} examples={examples} parts={parts} usageDescription="Present a read-only metric with native label/value semantics. Compose formatters, badges and progress as needed." />
  </VStack>;
}
