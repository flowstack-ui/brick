import { For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { sectionSection } from "./sections.js";
import { sectionProps } from "./props.js";
import { SectionRhythm } from "./examples/SectionRhythm.js";
import rhythmSource from "./examples/SectionRhythm.tsx?raw";
import { SectionResponsive } from "./examples/SectionResponsive.js";
import responsiveSource from "./examples/SectionResponsive.tsx?raw";
import { SectionEdges } from "./examples/SectionEdges.js";
import edgesSource from "./examples/SectionEdges.tsx?raw";
import { SectionComposition } from "./examples/SectionComposition.js";
import compositionSource from "./examples/SectionComposition.tsx?raw";
const examples = [
  {
    id: "rhythm",
    Demo: SectionRhythm,
    source: rhythmSource,
    description: "Choose a named block-spacing recipe.",
  },
  {
    id: "responsive",
    Demo: SectionResponsive,
    source: responsiveSource,
    description:
      "Sparse overrides inherit medium spacing. Edge overrides remain independent.",
  },
  {
    id: "edges",
    Demo: SectionEdges,
    source: edgesSource,
    description: "Change either edge without replacing the other.",
  },
  {
    id: "composition",
    Demo: SectionComposition,
    source: compositionSource,
    description:
      "Surface paints one host; Section supplies block rhythm and Container supplies width and gutters.",
  },
] as const;
export function SectionDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...sectionSection("usage")}
        description="Section owns block spacing for a thematic region. Compose Container for inline measure and Surface for paint."
      >
        <ExampleSource
          label="Section import"
          source={'import { Section } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Section usage"
          source={"<Section>Content</Section>"}
        />
      </DocsSection>
      <DocsSection {...sectionSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...sectionSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={sectionSection(id).title}
                  source={source}
                >
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection
        {...sectionSection("props")}
        description="Component-owned props. Layout, typography and behavior from other components remain composition."
      >
        <PropsTable label="Section props" rows={sectionProps} />
      </DocsSection>
    </VStack>
  );
}
