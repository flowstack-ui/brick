import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { gridSection } from "./sections.js";
import { gridRootProps, gridItemProps } from "./props.js";
import { GridImplicit } from "./examples/GridImplicit.js";
import ImplicitSource from "./examples/GridImplicit.tsx?raw";
import { GridSubgrid } from "./examples/GridSubgrid.js";
import SubgridSource from "./examples/GridSubgrid.tsx?raw";
import { GridSpans } from "./examples/GridSpans.js";
import SpansSource from "./examples/GridSpans.tsx?raw";
import { GridTemplates } from "./examples/GridTemplates.js";
import TemplatesSource from "./examples/GridTemplates.tsx?raw";
import { GridAreas } from "./examples/GridAreas.js";
import AreasSource from "./examples/GridAreas.tsx?raw";
import { GridFlow } from "./examples/GridFlow.js";
import FlowSource from "./examples/GridFlow.tsx?raw";
import { GridIntrinsic } from "./examples/GridIntrinsic.js";
import IntrinsicSource from "./examples/GridIntrinsic.tsx?raw";
import { GridResponsive } from "./examples/GridResponsive.js";
import ResponsiveSource from "./examples/GridResponsive.tsx?raw";
import { GridAlignment } from "./examples/GridAlignment.js";
import AlignmentSource from "./examples/GridAlignment.tsx?raw";
import { GridInline } from "./examples/GridInline.js";
import InlineSource from "./examples/GridInline.tsx?raw";
const examples = [
  {
    id: "spans",
    Demo: GridSpans,
    source: SpansSource,
    description:
      "Items can span columns and rows without adding interactive grid semantics.",
  },
  {
    id: "templates",
    Demo: GridTemplates,
    source: TemplatesSource,
    description:
      "Use native track definitions for unequal columns and named lines.",
  },
  {
    id: "areas",
    Demo: GridAreas,
    source: AreasSource,
    description:
      "Change the arrangement with CSS areas while keeping the same source order.",
  },
  {
    id: "flow",
    Demo: GridFlow,
    source: FlowSource,
    description:
      "Dense flow fills earlier gaps; keep source order meaningful for reading and keyboard navigation.",
  },
  {
    id: "intrinsic",
    Demo: GridIntrinsic,
    source: IntrinsicSource,
    description:
      "Let the available container width determine the number of columns.",
  },
  {
    id: "responsive",
    Demo: GridResponsive,
    source: ResponsiveSource,
    description:
      "Breakpoints change placement, spans and gaps without replacing content.",
  },
  {
    id: "alignment",
    Demo: GridAlignment,
    source: AlignmentSource,
    description:
      "Item alignment acts inside cells; content distribution places the tracks inside the container.",
  },
  {
    id: "inline",
    Demo: GridInline,
    source: InlineSource,
    description:
      "Inline grid fits its tracks; asChild lets an existing Surface own the same host.",
  },
];
examples.push(
  {
    id: "implicit",
    Demo: GridImplicit,
    source: ImplicitSource,
    description:
      "Column auto-flow creates implicit columns sized by autoColumns.",
  },
  {
    id: "subgrid",
    Demo: GridSubgrid,
    source: SubgridSource,
    description:
      "A nested grid can share its parent tracks using native CSS subgrid.",
  },
);
export function GridDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...gridSection("usage")}
        description="Grid.Root owns tracks. Add Grid.Item only when a child needs placement or self-alignment."
      >
        <ExampleSource
          label="Grid import"
          source={'import { Grid } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Grid usage"
          source={
            "<Grid.Root columns={3} gap={4}>\n  <Grid.Item columnSpan={2}>Featured</Grid.Item>\n  <div>Other content</div>\n</Grid.Root>"
          }
        />
      </DocsSection>
      <DocsSection {...gridSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...gridSection(id)}
                description={description}
              >
                <ExamplePreview label={gridSection(id).title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...gridSection("guide")}>
        <Paragraph tone="secondary">
          Choose columns for equal tracks, minItemSize for intrinsic fitting, or
          templateColumns for native CSS tracks. Do not combine these modes.
          Native subgrid can be used in templateColumns or templateRows when the
          parent establishes the tracks. Grid is layout, not an ARIA grid.
        </Paragraph>
        <Paragraph tone="secondary">
          Dense flow and explicit placement change visual position, not DOM or
          focus order. Keep those orders understandable. Compose Frame for
          dimensions and Surface for paint.
        </Paragraph>
      </DocsSection>
      <DocsSection {...gridSection("props")}>
        <DocsSection
          {...gridSection("grid-root-props")}
          description="The container that defines tracks, gaps and layout."
        >
          <PropsTable label="Grid.Root props" rows={gridRootProps} />
        </DocsSection>
        <DocsSection
          {...gridSection("grid-item-props")}
          description="An optional child that owns placement and self-alignment."
        >
          <PropsTable label="Grid.Item props" rows={gridItemProps} />
        </DocsSection>
      </DocsSection>
    </VStack>
  );
}
