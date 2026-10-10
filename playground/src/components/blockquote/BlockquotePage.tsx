import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { BlockquoteEvidence } from "./BlockquoteEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { blockquoteScenarios } from "./BlockquoteEvidence.js";
export function BlockquotePage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <BlockquoteEvidence />;
  return (
    <VStack gap={12} data-component-page="blockquote">
      <ExamplePreview label="Blockquote basic" source={basicSource}><Basic /></ExamplePreview>
      <OwnerDocumentation name="Blockquote" usage={basicSource} examples={examples} parts={parts} usageDescription="Keep the quotation in Content and its attribution in the sibling Caption. The cite attribute supplies a source URL." />
    </VStack>
  );
}
