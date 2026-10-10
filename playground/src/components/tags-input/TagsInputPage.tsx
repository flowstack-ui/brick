import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { TagsInputEvidence } from "./TagsInputEvidence.js";
import { TagsInputBasic } from "./examples/TagsInputBasic.js";
import basicSource from "./examples/TagsInputBasic.tsx?raw";
import { examples, parts } from "./documentation.js";
export { tagsInputScenarios } from "./TagsInputEvidence.js";
export function TagsInputPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <TagsInputEvidence />;
  return <VStack gap={12} data-component-page="tags-input">
    <ExamplePreview label="Tags Input basic" source={basicSource}><TagsInputBasic /></ExamplePreview>
    <OwnerDocumentation name="TagsInput" examples={examples} parts={parts}
      usageDescription="Create a collection of short values. Use MultiSelect when users must choose from predefined options."
      usage={'<TagsInput.Root>\n  <TagsInput.Label>Topics</TagsInput.Label>\n  <TagsInput.Control>\n    <TagsInput.Items />\n    <TagsInput.Input />\n  </TagsInput.Control>\n  <TagsInput.HiddenInput />\n</TagsInput.Root>'} />
  </VStack>;
}
