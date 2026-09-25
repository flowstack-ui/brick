import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { EmEvidence } from "./EmEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { emScenarios } from "./EmEvidence.js";
export function EmPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <EmEvidence />;
  return <VStack gap={12} data-component-page="em">
    <ExamplePreview label="Em basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Use Em for stress emphasis inside meaningful copy. The surrounding typography owns size and color.">
      <ExampleSource label="Em import" source={'import { Em } from "@flowstack-ui/brick";'} />
      <ExampleSource label="Em usage" source={'<Em>before</Em>'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}><For each={examples}>{({id,title,description,Demo,source}) => <DocsSection key={id} id={id} title={title} description={description} level={3}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>}</For></VStack></DocsSection>
    <DocsSection id="props" title="Props" level={2} description="These props belong to Em. Native HTML attributes are also forwarded."><PropsTable label="Em props" rows={rows} /></DocsSection>
  </VStack>;
}
