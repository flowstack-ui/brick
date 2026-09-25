import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { CodeBlockEvidence } from "./CodeBlockEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { codeBlockScenarios } from "./CodeBlockEvidence.js";
export function CodeBlockPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <CodeBlockEvidence />;
  return <VStack gap={12} data-component-page="code-block">
    <ExamplePreview label="CodeBlock basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="CodeBlock" usage={basicSource} examples={examples} parts={parts} />
  </VStack>;
}
