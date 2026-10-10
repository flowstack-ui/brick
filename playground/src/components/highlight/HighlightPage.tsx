import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { HighlightEvidence } from "./HighlightEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { highlightScenarios } from "./HighlightEvidence.js";
export function HighlightPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <HighlightEvidence />;
  return <VStack gap={12} data-component-page="highlight">
    <ExamplePreview label="Highlight basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Highlight literal query matches in plain text. Use Mark for already-authored relevance.">
      <ExampleSource label="Highlight import" source={'import { Highlight } from "@flowstack-ui/brick";'} />
      <ExampleSource label="Highlight usage" source={'<Highlight text=\"Build durable interfaces\" query=\"durable\" />'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}><For each={examples}>{({id,title,description,Demo,source}) => <DocsSection key={id} id={id} title={title} description={description} level={3}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>}</For></VStack></DocsSection>
    <DocsSection id="props" title="Props" level={2} description="These props belong to Highlight. Native HTML attributes are also forwarded."><PropsTable label="Highlight props" rows={rows} /></DocsSection>
  </VStack>;
}
