import { VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { OwnerDocumentation } from "../../shared/OwnerDocumentation.js";
import { FeedEvidence } from "./FeedEvidence.js";
import { Basic, basicSource, examples, parts } from "./documentation.js";
export { feedScenarios } from "./FeedEvidence.js";
export function FeedPage(): React.ReactElement {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <FeedEvidence />;
  return <VStack gap={12} data-component-page="feed">
    <ExamplePreview label="Feed basic" source={basicSource}><Basic /></ExamplePreview>
    <OwnerDocumentation name="Feed" usageDescription="Present a changing stream of readable articles with article-by-article keyboard navigation. Use List for static rows or Timeline for a chronological visual." usage={'<Feed.Root aria-label="Activity" setSize={1}>\n  <Feed.Item aria-label="New comment" index={0}>…</Feed.Item>\n</Feed.Root>'} examples={examples} parts={parts}/>
  </VStack>;
}
