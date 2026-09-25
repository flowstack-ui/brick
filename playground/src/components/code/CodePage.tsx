import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CodeEvidence } from "./CodeEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { codeScenarios } from "./CodeEvidence.js";
export function CodePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <CodeEvidence />;
  return <VStack gap={12} data-component-page="code">
    <ExamplePreview label="Code basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Code" usage={basicSource} examples={examples} parts={parts} />
  </VStack>;
}
