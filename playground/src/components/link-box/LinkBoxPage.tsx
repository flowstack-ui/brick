import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { LinkBoxEvidence } from "./LinkBoxEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { linkBoxScenarios } from "./LinkBoxEvidence.js";
export function LinkBoxPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <LinkBoxEvidence />;
  return <VStack gap={12} data-component-page="link-box">
    <ExamplePreview label="LinkBox basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="LinkBox" usage={basicSource} examples={examples} parts={parts} usageDescription="Use one primary Link per Root. Wrap each independent secondary control in Action; never nest it inside the primary anchor." />
  </VStack>;
}
