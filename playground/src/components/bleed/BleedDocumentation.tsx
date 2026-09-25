import { Code, For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { bleedSection } from "./sections.js";
import { bleedProps } from "./props.js";
import { BleedVertical } from "./examples/BleedVertical.js";
import { BleedDirections } from "./examples/BleedDirections.js";
import { BleedResponsive } from "./examples/BleedResponsive.js";
import { BleedOverride } from "./examples/BleedOverride.js";
import { BleedComposition } from "./examples/BleedComposition.js";
import verticalSource from "./examples/BleedVertical.tsx?raw";
import directionsSource from "./examples/BleedDirections.tsx?raw";
import responsiveSource from "./examples/BleedResponsive.tsx?raw";
import overrideSource from "./examples/BleedOverride.tsx?raw";
import compositionSource from "./examples/BleedComposition.tsx?raw";

const examples = [
  { id: "vertical", description: <>Use <Code>block</Code> to extend both vertical edges.</>, Demo: BleedVertical, source: verticalSource },
  { id: "specific-direction", description: "Choose one logical edge. Inline start and end automatically follow the document direction.", Demo: BleedDirections, source: directionsSource },
  { id: "responsive", description: <>Match the parent’s responsive padding. Sparse values such as <Code>{"{ md: 6 }"}</Code> start with zero bleed below that breakpoint.</>, Demo: BleedResponsive, source: responsiveSource },
  { id: "edge-override", description: <>Directional values override their axis. Here <Code>inlineEnd={0}</Code> keeps the end inset while the start reaches the edge.</>, Demo: BleedOverride, source: overrideSource },
  { id: "composition", description: <>Use <Code>asChild</Code> to apply Bleed to an existing component. Surface still owns its background and padding.</>, Demo: BleedComposition, source: compositionSource },
] as const;

export function BleedDocumentation() {
  return <VStack gap={8} startSpacing={8}>
    <DocsSection {...bleedSection("usage")} description={<>Use positive spacing values with <Code>Bleed</Code> to cross an immediate parent’s padding. All edges default to zero.</>}>
      <ExampleSource label="Bleed import" source={'import { Bleed } from "@flowstack-ui/brick";'} />
      <ExampleSource label="Bleed composition" source={'<Surface inset="lg">\n  <Bleed inline="6">\n    {/* content */}\n  </Bleed>\n</Surface>'} />
    </DocsSection>
    <DocsSection {...bleedSection("examples")}>
      <VStack gap={16}>
        <For each={examples}>{({ id, description, Demo, source }) =>
          <DocsSection key={id} {...bleedSection(id)} description={description}>
            <ExamplePreview label={bleedSection(id).title} source={source}><Demo /></ExamplePreview>
          </DocsSection>
        }</For>
      </VStack>
    </DocsSection>
    <DocsSection {...bleedSection("guide")}>
      <DocsSection {...bleedSection("matching-insets")} description={<>Match the parent’s spacing token, not just a similar-looking number. <Code>inline="6"</Code> uses space-6 (32px by default), matching <Code>Surface inset="lg"</Code>. Numeric <Code>{"inline={6}"}</Code> means six base units (24px). Explicit lengths and CSS variables are also supported. Bleed cannot escape an ancestor that clips overflow, and it does not reserve extra space for overlapping content.</>}>
        <ExampleSource label="Matching inset tokens" source={'<Surface inset="lg">\n  <Bleed inline="6">{/* edge content */}</Bleed>\n</Surface>'} />
      </DocsSection>
    </DocsSection>
    <DocsSection {...bleedSection("props")} description={<>These props belong to <Code>Bleed</Code>. Paint, size and radius belong to the composed components. Standard HTML attributes and refs are also supported.</>}>
      <PropsTable label="Bleed props" rows={bleedProps} />
    </DocsSection>
  </VStack>;
}
