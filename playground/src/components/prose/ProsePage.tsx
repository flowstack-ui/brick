import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { ProseEvidence } from "./ProseEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { proseScenarios } from "./ProseEvidence.js";
export function ProsePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <ProseEvidence />;
  return <VStack gap={12} data-component-page="prose">
    <ExamplePreview label="Prose basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Prose" usage={basicSource} usageDescription="Style trusted native content. Prose does not parse, sanitize or edit documents." examples={examples} parts={parts} />
  </VStack>;
}
