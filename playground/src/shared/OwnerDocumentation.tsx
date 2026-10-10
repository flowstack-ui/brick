import { For, VStack } from "@flowstack-ui/brick";
import type { ComponentType, ReactNode } from "react";
import { DocsSection } from "./DocsSection.js";
import { ExamplePreview } from "./ExamplePreview.js";
import { ExampleSource } from "./ExampleSource.js";
import { PropsTable, type DocsPropDefinition } from "./PropsTable.js";
import type { DocsSectionMetadata } from "./DocsTableOfContents.js";
export interface OwnerExample {
  id: string;
  title: string;
  description: string;
  Demo: ComponentType;
  source: string;
}
export interface OwnerPart {
  id: string;
  title: string;
  description: string;
  rows: readonly DocsPropDefinition<Record<string, unknown>>[];
}
export function ownerSections(
  examples: readonly OwnerExample[],
  parts: readonly OwnerPart[],
  withGuide = false,
): DocsSectionMetadata[] {
  return [
    { id: "usage", title: "Usage", level: 2 },
    { id: "examples", title: "Examples", level: 2 },
    ...examples.map(({ id, title }) => ({ id, title, level: 3 as const })),
    ...(withGuide ? [{ id: "guide", title: "Guide", level: 2 as const }] : []),
    { id: "props", title: "Props", level: 2 },
    ...parts.map(({ id, title }) => ({ id, title, level: 3 as const })),
  ];
}
export function OwnerDocumentation({
  name,
  usage,
  examples,
  parts,
  guide,
  usageDescription = `Compose ${name} with native semantics and independently named controls.`,
}: {
  name: string;
  usage: string;
  examples: readonly OwnerExample[];
  parts: readonly OwnerPart[];
  guide?: ReactNode;
  usageDescription?: string;
}) {
  return (
    <VStack gap={12}>
      <DocsSection
        id="usage"
        title="Usage"
        level={2}
        description={usageDescription}
      >
        <ExampleSource
          label={`${name} import`}
          source={`import { ${name} } from "@flowstack-ui/brick";`}
        />
        <ExampleSource label={`${name} usage`} source={usage} />
      </DocsSection>
      <DocsSection id="examples" title="Examples" level={2}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, title, description, Demo, source }) => (
              <DocsSection
                key={id}
                id={id}
                title={title}
                level={3}
                description={description}
              >
                <ExamplePreview label={title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      {guide ? (
        <DocsSection id="guide" title="Guide" level={2}>
          {guide}
        </DocsSection>
      ) : null}
      <DocsSection id="props" title="Props" level={2}>
        <VStack gap={12}>
          <For each={parts}>
            {(part) => (
              <DocsSection
                key={part.id}
                id={part.id}
                title={part.title}
                level={3}
                description={part.description}
              >
                <PropsTable
                  label={`${name}.${part.title} props`}
                  rows={part.rows}
                />
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
    </VStack>
  );
}
