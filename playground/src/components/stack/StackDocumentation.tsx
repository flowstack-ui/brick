import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { stackSection } from "./sections.js";
import { stackProps, stackItemProps } from "./props.js";
import { StackSeparators } from "./examples/StackSeparators.js";
import SeparatorSource from "./examples/StackSeparators.tsx?raw";
import { StackDirection } from "./examples/StackDirection.js";
import DirectionSource from "./examples/StackDirection.tsx?raw";
import { StackGaps } from "./examples/StackGaps.js";
import GapsSource from "./examples/StackGaps.tsx?raw";
import { StackAlign } from "./examples/StackAlign.js";
import AlignSource from "./examples/StackAlign.tsx?raw";
import { StackJustify } from "./examples/StackJustify.js";
import JustifySource from "./examples/StackJustify.tsx?raw";
import { StackWrapping } from "./examples/StackWrapping.js";
import WrappingSource from "./examples/StackWrapping.tsx?raw";
import { StackLines } from "./examples/StackLines.js";
import LinesSource from "./examples/StackLines.tsx?raw";
import { StackRecipes } from "./examples/StackRecipes.js";
import RecipesSource from "./examples/StackRecipes.tsx?raw";
import { StackOrdering } from "./examples/StackOrdering.js";
import OrderingSource from "./examples/StackOrdering.tsx?raw";
import { StackAutoMargins } from "./examples/StackAutoMargins.js";
import AutoMarginsSource from "./examples/StackAutoMargins.tsx?raw";
import { StackSpacer } from "./examples/StackSpacer.js";
import SpacerSource from "./examples/StackSpacer.tsx?raw";
import { StackEdges } from "./examples/StackEdges.js";
import EdgesSource from "./examples/StackEdges.tsx?raw";
import { StackInline } from "./examples/StackInline.js";
import InlineSource from "./examples/StackInline.tsx?raw";
import { StackComposition } from "./examples/StackComposition.js";
import CompositionSource from "./examples/StackComposition.tsx?raw";
const examples = [
  {
    id: "direction",
    Demo: StackDirection,
    source: DirectionSource,
    description:
      "Reverse changes visual placement, not DOM or keyboard order. Use flex-start when you mean the flex axis's start.",
  },
  {
    id: "gaps",
    Demo: StackGaps,
    source: GapsSource,
    description:
      "gap supplies both axes. An explicit rowGap or columnGap overrides that axis independently, including after later gap changes.",
  },
  { id: "separator", Demo: StackSeparators, source: SeparatorSource, description: "Insert an axis-aware line or custom decoration between direct peers. Gap appears on both sides. For and custom component output are opaque; author separators inside those collections. Wrapped lines and CSS-hidden peers are not automatically detected." },
  {
    id: "align",
    Demo: StackAlign,
    source: AlignSource,
    description:
      "Compare unequal text sizes. Alignment belongs to this container and does not inherit into nested stacks.",
  },
  {
    id: "justify",
    Demo: StackJustify,
    source: JustifySource,
    description:
      "Use justify to distribute children within the remaining main-axis space.",
  },
  {
    id: "wrapping",
    Demo: StackWrapping,
    source: WrappingSource,
    description:
      "Wrapping makes additional flex lines. wrap-reverse flips their cross-axis placement; it does not change reading order.",
  },
  {
    id: "lines",
    Demo: StackLines,
    source: LinesSource,
    description:
      "alignContent distributes flex lines within a definite cross-axis size. It has no effect on a nowrap container.",
  },
  {
    id: "recipes",
    Demo: StackRecipes,
    source: RecipesSource,
    description:
      "Use Item flex recipes for common sizing, or grow, shrink and basis for explicit allocation. Numeric basis values are pixel lengths. Wrapper tracks keep child padding from changing intended proportions.",
  },
  {
    id: "ordering",
    Demo: StackOrdering,
    source: OrderingSource,
    description:
      "This decorative marker may move visually before the content. Meaningful content remains in DOM order. Do not use order to scramble form fields or repair tab order with positive tabindex.",
  },
  {
    id: "auto-margins",
    Demo: StackAutoMargins,
    source: AutoMarginsSource,
    description:
      "Logical auto margins consume available space. Reset with zero at another breakpoint when the layout changes.",
  },
  {
    id: "spacer",
    Demo: StackSpacer,
    source: SpacerSource,
    description:
      "An empty, nonfocusable Item can deliberately allocate weighted space between several groups. No separate Spacer engine is needed.",
  },
  {
    id: "edges",
    Demo: StackEdges,
    source: EdgesSource,
    description:
      "startSpacing follows main-start, including reverse. Logical item margins retain their writing-direction meaning.",
  },
  {
    id: "inline",
    Demo: StackInline,
    source: InlineSource,
    description:
      "inline changes display, not semantics. Use a span host inside prose; baseline alignment is distinct from centering children.",
  },
  {
    id: "composition",
    Demo: StackComposition,
    source: CompositionSource,
    description:
      "Root and Item can adopt one host. Surface supplies paint and inset; Item supplies allocation; Stack supplies child arrangement.",
  },
] as const;
export function StackDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...stackSection("usage")}
        description="Stack is Brick’s flexbox layout owner. Stack and VStack default to column/stretch, HStack to row/center; all start with zero gap."
      >
        <ExampleSource
          label="Stack import"
          source={
            'import { Stack, HStack, VStack } from "@flowstack-ui/brick";'
          }
        />
        <ExampleSource
          label="Stack usage"
          source={
            '<Stack direction={{ initial: "column", md: "row" }} gap={4}>\n  {/* One content tree */}\n</Stack>'
          }
        />
      </DocsSection>
      <DocsSection {...stackSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...stackSection(id)}
                description={description}
              >
                <ExamplePreview label={stackSection(id).title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection
        {...stackSection("guide")}
        description="Choose props by the relationship they own."
      >
        <Paragraph tone="secondary">
          Stack arranges children; Item participates in its parent. Frame
          constrains dimensions, Surface paints, and Grid aligns two-dimensional
          tracks. The fixed viewport breakpoints are 30, 48, 64 and 80rem;
          intrinsic wrapping instead responds to available container space.
        </Paragraph>
        <Paragraph tone="secondary">
          Sparse responsive objects use defaults below their first breakpoint.
          Explicit row/column gaps override gap independently. Explicit grow,
          shrink and basis override their recipe channels and persist until
          their own next value.
        </Paragraph>
        <Paragraph tone="secondary">
          Reverse and order change visual placement only. Preserve meaningful
          reading and keyboard sequences. Do not repair a confusing arrangement
          with positive tabindex or duplicate interactive content. Automated
          checks cannot judge every application’s meaning.
        </Paragraph>
        <Paragraph tone="secondary">
          Spacing numbers multiply the base spacing token; basis numbers are
          pixel lengths. Flex ratios share free space, not guaranteed outer
          widths: content, minimum sizes, padding and borders matter. Keep
          wrapper tracks when their outer allocation is intentional.
        </Paragraph>
      </DocsSection>
      <DocsSection
        {...stackSection("props")}
        description="Component-owned props are listed below. Native attributes, refs, className, style and slot also pass through."
      >
        <DocsSection {...stackSection("stack-props")} description="The layout container. These props control direction, spacing and alignment of its children.">
          <PropsTable label="Stack props" rows={stackProps} />
        </DocsSection>
        <DocsSection {...stackSection("stack-item-props")} description="An individual Stack.Item. These props control its sizing, order and alignment within the container.">
          <PropsTable label="Stack.Item props" rows={stackItemProps} />
        </DocsSection>
        <DocsSection {...stackSection("stack-separator-props")} description="A decorative Stack.Separator. Stack determines its axis; no role, focus or independent orientation is added.">
          <PropsTable label="Stack.Separator props" rows={[
            { name: "variant", typeLabel: '"solid" | "dashed" | "dotted"', defaultLabel: '"solid"', description: "Line style using the theme border color." },
            { name: "thickness", typeLabel: '"hairline" | "subtle" | "regular" | "bold" | "strong"', defaultLabel: '"subtle"', description: "Same thickness scale as Divider." },
            { name: "extent", typeLabel: "string", defaultLabel: '"auto"', description: "Cross-axis length. Use a CSS length for a short toolbar line." },
            { name: "align", typeLabel: '"stretch" | "start" | "center" | "end"', defaultLabel: '"stretch"', description: "Cross-axis alignment. Use center with a short extent." },
          ]} />
        </DocsSection>
      </DocsSection>
    </VStack>
  );
}
