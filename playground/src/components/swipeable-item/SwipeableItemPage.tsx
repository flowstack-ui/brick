import { Paragraph, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { SwipeableItemEvidence } from "./SwipeableItemEvidence.js";
import {
  Basic,
  basicSource,
  examples,
  rootRows,
  contentRows,
  actionsRows,
  providerRows,
  parts,
} from "./documentation.js";
export { swipeableItemScenarios } from "./SwipeableItemEvidence.js";

export function SwipeableItemPage() {
  const preview = usePreviewContext();
  if (
    preview ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("qualification") === "1")
  )
    return <SwipeableItemEvidence />;
  return (
    <VStack gap={12} data-component-page="swipeable-item">
      <ExamplePreview label="Swipeable Item basic" source={basicSource}>
        <Basic />
      </ExamplePreview>
      <DocsSection
        id="usage"
        title="Usage"
        level={2}
        description="Reveal contextual actions with a horizontal swipe, while keeping a visible non-drag alternative."
      >
        <ExampleSource
          label="Swipeable Item import"
          source={'import { SwipeableItem } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Swipeable Item anatomy"
          source={
            '<SwipeableItem.Root>\n  <SwipeableItem.Content />\n  <SwipeableItem.Actions side="end" aria-label="Message actions" />\n</SwipeableItem.Root>'
          }
        />
      </DocsSection>
      <DocsSection id="examples" title="Examples" level={2}>
        <VStack gap={16}>
          {examples.map(({ id, title, description, Demo, source }) => (
            <DocsSection
              key={id}
              id={id}
              title={title}
              description={description}
              level={3}
            >
              <ExamplePreview label={title} source={source}>
                <Demo />
              </ExamplePreview>
            </DocsSection>
          ))}
        </VStack>
      </DocsSection>
      <DocsSection id="guide" title="Guide" level={2}>
        <Paragraph tone="secondary">
          Swiping is an enhancement, never the only route to an action. Full
          swipe is off by default; enable logical sides explicitly and keep
          confirmation, undo and async work in your application. Content
          supports Arrow reveal and Escape; nested controls retain their keys.
        </Paragraph>
      </DocsSection>
      <DocsSection id="props" title="Props" level={2}>
        <VStack gap={10}>
          <DocsSection {...parts[0]}>
            <PropsTable label="SwipeableItem.Root props" rows={rootRows} />
          </DocsSection>
          <DocsSection {...parts[1]}>
            <PropsTable
              label="SwipeableItem.RootProvider props"
              rows={providerRows}
            />
          </DocsSection>
          <DocsSection {...parts[2]}>
            <PropsTable
              label="SwipeableItem.Content props"
              rows={contentRows}
            />
          </DocsSection>
          <DocsSection {...parts[3]}>
            <PropsTable
              label="SwipeableItem.Actions props"
              rows={actionsRows}
            />
          </DocsSection>
        </VStack>
      </DocsSection>
    </VStack>
  );
}
