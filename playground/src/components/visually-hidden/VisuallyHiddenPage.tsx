import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { VisuallyHiddenEvidence } from "./VisuallyHiddenEvidence.js";
import { Basic, basicSource, examples, rows } from "./documentation.js";
export { visuallyHiddenScenarios } from "./VisuallyHiddenEvidence.js";
export function VisuallyHiddenPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <VisuallyHiddenEvidence />;
  return <VStack gap={12} data-component-page="visually-hidden">
    <ExamplePreview label="VisuallyHidden basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Hide supporting text visually while keeping it available to assistive technology.">
      <ExampleSource label="VisuallyHidden import" source={'import { VisuallyHidden } from "@flowstack-ui/brick";'} />
      <ExampleSource label="VisuallyHidden usage" source={'<VisuallyHidden.Root>Notifications</VisuallyHidden.Root>'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}>
      {examples.map(({ id, title, description, Demo, source }) => <DocsSection key={id} id={id} title={title} description={description} level={3}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>)}
    </VStack></DocsSection>
    <DocsSection id="guide" title="Guide" level={2}>
      <Paragraph tone="secondary">Keep controls and essential instructions visible. Hide only supporting text, not focusable inputs or buttons. Use SkipLink for visible-on-focus navigation and form components’ HiddenInput parts for their native input behavior.</Paragraph>
    </DocsSection>
    <DocsSection id="props" title="Props" level={2} description="These props belong to VisuallyHidden.Root. Native span attributes and refs are forwarded.">
      <PropsTable label="VisuallyHidden.Root props" rows={rows} />
    </DocsSection>
  </VStack>;
}
