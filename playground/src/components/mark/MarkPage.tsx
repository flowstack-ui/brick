import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { MarkEvidence } from "./MarkEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { markScenarios } from "./MarkEvidence.js";
export function MarkPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <MarkEvidence />;
  return <VStack gap={12} data-component-page="mark">
    <ExamplePreview label="Mark basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Use Mark for contextually relevant passages, not generic decoration or stress emphasis.">
      <ExampleSource label="Mark import" source={'import { Mark } from "@flowstack-ui/brick";'} />
      <ExampleSource label="Mark usage" source={'<Mark>Relevant passage</Mark>'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}><For each={examples}>{({id,title,description,Demo,source}) => <DocsSection key={id} id={id} title={title} description={description} level={3}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>}</For></VStack></DocsSection>
    <DocsSection id="props" title="Props" level={2} description="These props belong to Mark. Native HTML attributes are also forwarded."><PropsTable label="Mark props" rows={rows} /></DocsSection>
  </VStack>;
}
