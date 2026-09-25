import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { KbdEvidence } from "./KbdEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { kbdScenarios } from "./KbdEvidence.js";
export function KbdPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <KbdEvidence />;
  return <VStack gap={12} data-component-page="kbd">
    <ExamplePreview label="Kbd basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Use Kbd for a key or an authored combination. It displays notation; it does not register shortcuts.">
      <ExampleSource label="Kbd import" source={'import { Kbd } from "@flowstack-ui/brick";'} />
      <ExampleSource label="Kbd usage" source={'<Kbd>F12</Kbd>'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}><For each={examples}>{({id,title,description,Demo,source}) => <DocsSection key={id} id={id} title={title} description={description} level={3}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>}</For></VStack></DocsSection>
    <DocsSection id="props" title="Props" level={2} description="These props belong to Kbd. Native HTML attributes are also forwarded."><PropsTable label="Kbd props" rows={rows} /></DocsSection>
  </VStack>;
}
