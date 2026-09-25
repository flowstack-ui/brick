import { Code, For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { containerSection } from "./sections.js";
import { containerProps } from "./props.js";
import { ContainerMeasures } from "./examples/ContainerMeasures.js";
import { ContainerFluid } from "./examples/ContainerFluid.js";
import { ContainerGutters } from "./examples/ContainerGutters.js";
import { ContainerCentered } from "./examples/ContainerCentered.js";
import { ContainerAlignment } from "./examples/ContainerAlignment.js";
import measuresSource from "./examples/ContainerMeasures.tsx?raw";
import fluidSource from "./examples/ContainerFluid.tsx?raw";
import guttersSource from "./examples/ContainerGutters.tsx?raw";
import centeredSource from "./examples/ContainerCentered.tsx?raw";
import alignmentSource from "./examples/ContainerAlignment.tsx?raw";
import { ContainerAsChild } from "./examples/ContainerAsChild.js";
import asChildSource from "./examples/ContainerAsChild.tsx?raw";

const examples = [
  {
    id: "measures",
    Demo: ContainerMeasures,
    source: measuresSource,
    description: (
      <>
        Use <Code>measure</Code> to select a maximum. These are real page
        widths: several look identical inside this narrower docs column because
        they cannot exceed their parent.
      </>
    ),
  },
  {
    id: "fluid",
    Demo: ContainerFluid,
    source: fluidSource,
    description: (
      <>
        Use <Code>measure="full"</Code> to remove the maximum. The container
        fills its parent, not necessarily the viewport, and keeps its gutters.
      </>
    ),
  },
  {
    id: "gutters",
    Demo: ContainerGutters,
    source: guttersSource,
    description: (
      <>
        Use <Code>gutter</Code> for logical side padding. The nonzero recipes
        scale fluidly with the viewport. The outlined parent marks the available
        width.
      </>
    ),
  },
  {
    id: "centered-content",
    Demo: ContainerCentered,
    source: centeredSource,
    description: (
      <>
        Container centers the region. Compose <Code>VStack align="center"</Code>{" "}
        to center its children; text alignment is a separate typography choice.
      </>
    ),
  },
  {
    id: "shared-alignment",
    Demo: ContainerAlignment,
    source: alignmentSource,
    description: (
      <>
        Give separate regions matching <Code>measure</Code> and{" "}
        <Code>gutter</Code> recipes to align their content. Surface owns the
        background and Section owns vertical spacing.
      </>
    ),
  },
  {
    id: "as-child",
    Demo: ContainerAsChild,
    source: asChildSource,
    description: (
      <>
        Use <Code>asChild</Code> to give one existing host Container’s width and
        gutters. The child forwards props and ref; avoid competing width or
        padding settings.
      </>
    ),
  },
] as const;

export function ContainerDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...containerSection("usage")}
        description={
          <>
            The default <Code>measure="wide"</Code> caps the border box at 72rem
            (1152px at a 16px root). The default <Code>gutter="md"</Code> scales
            from 1rem to 2rem.
          </>
        }
      >
        <ExampleSource
          label="Container import"
          source={'import { Container } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Container usage"
          source={"<Container>\n  {/* Page content */}\n</Container>"}
        />
      </DocsSection>
      <DocsSection {...containerSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...containerSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={containerSection(id).title}
                  source={source}
                >
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...containerSection("guide")}>
        <DocsSection
          {...containerSection("composition")}
          description={
            <>
              Container owns a page region’s maximum width and logical gutters,
              which are included inside that width. Use Frame for local size
              constraints, Stack or Grid for arrangement, and Surface for paint.
              Nest Containers only for a deliberately narrower inner region; use{" "}
              <Code>gutter="none"</Code> when the outer container already
              supplies the required gutters. Exceptional page policies can use
              the documented component tokens; ordinary examples should use the
              named recipes.
            </>
          }
        >
          {null}
        </DocsSection>
      </DocsSection>
      <DocsSection
        {...containerSection("props")}
        description="These props belong to Container itself. Native attributes, refs, className, style and slot are also supported. Paint, radius and child alignment belong to composed components."
      >
        <PropsTable label="Container props" rows={containerProps} />
      </DocsSection>
    </VStack>
  );
}
