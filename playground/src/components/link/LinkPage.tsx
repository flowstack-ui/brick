import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { LinkEvidence } from "./LinkEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { linkScenarios } from "./LinkEvidence.js";
export function LinkPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <LinkEvidence />;
  return <VStack gap={12} data-component-page="link">
    <ExamplePreview label="Link basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Link" usage={basicSource} examples={examples} parts={parts} usageDescription="Keep native navigation semantics. Inherit surrounding typography for prose; choose an explicit size for independent links." />
  </VStack>;
}
