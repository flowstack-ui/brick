import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { SkipLinkEvidence } from "./SkipLinkEvidence.js";
import { Basic, basicSource, examples, rootRows, targetRows } from "./documentation.js";
export { skipLinkScenarios, SkipLinkFixturePage } from "./SkipLinkEvidence.js";

export function SkipLinkPage() {
  const preview = usePreviewContext();
  if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <SkipLinkEvidence />;
  return <VStack gap={12} data-component-page="skip-link">
    <ExamplePreview label="SkipLink basic" source={basicSource}><Basic /></ExamplePreview>
    <DocsSection id="usage" title="Usage" level={2} description="Place the link before repeated navigation and its destination at the beginning of main content.">
      <ExampleSource label="SkipLink import" source={'import { SkipLink } from "@flowstack-ui/brick";'} />
      <ExampleSource label="SkipLink usage" source={'<SkipLink.Root />\n<nav aria-label="Primary">Navigation</nav>\n<main>\n  <SkipLink.Target />\n  Content\n</main>'} />
    </DocsSection>
    <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}>
      {examples.map(({ id, title, description, Demo, source }) => <DocsSection key={id} id={id} title={title} level={3} description={description}><ExamplePreview label={title} source={source}><Demo /></ExamplePreview></DocsSection>)}
    </VStack></DocsSection>
    <DocsSection id="guide" title="Guide" level={2}>
      <Paragraph tone="secondary">Target renders a div, not a landmark. Place it inside your main, or use asChild on that main. Keep one main landmark and unique matching IDs. The default focuses without changing the URL; native mode follows the fragment. Test the first Tab, Enter, and next Tab on your complete page.</Paragraph>
    </DocsSection>
    <DocsSection id="props" title="Props" level={2}><VStack gap={10}>
      <DocsSection id="props-root" title="Root" level={3} description="The native anchor that bypasses repeated navigation."><PropsTable label="SkipLink.Root props" rows={rootRows} /></DocsSection>
      <DocsSection id="props-target" title="Target" level={3} description="The focusable destination; the application owns its surrounding landmark."><PropsTable label="SkipLink.Target props" rows={targetRows} /></DocsSection>
    </VStack></DocsSection>
  </VStack>;
}
