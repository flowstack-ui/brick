import { Code, For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { frameSection } from "./sections.js";
import { frameProps } from "./props.js";
import { FrameInline } from "./examples/FrameInline.js";
import inlineSource from "./examples/FrameInline.tsx?raw";
import { FrameBlock } from "./examples/FrameBlock.js";
import blockSource from "./examples/FrameBlock.tsx?raw";
import { FrameResponsive } from "./examples/FrameResponsive.js";
import responsiveSource from "./examples/FrameResponsive.tsx?raw";
import { FrameComposition } from "./examples/FrameComposition.js";
import compositionSource from "./examples/FrameComposition.tsx?raw";
import { FrameScroll } from "./examples/FrameScroll.js";
import scrollSource from "./examples/FrameScroll.tsx?raw";
const examples = [
  {
    id: "inline-constraints",
    Demo: FrameInline,
    source: inlineSource,
    description:
      "Constrain a local width or readable measure. Percentages refer to the containing block, not the viewport.",
  },
  {
    id: "block-constraints",
    Demo: FrameBlock,
    source: blockSource,
    description:
      "Fixed block sizes stay fixed; minimum block sizes leave room for content to grow. Frame does not clip overflow.",
  },
  {
    id: "responsive",
    Demo: FrameResponsive,
    source: responsiveSource,
    description:
      "Sparse responsive values preserve the unconstrained baseline until their first breakpoint.",
  },
  {
    id: "composition",
    Demo: FrameComposition,
    source: compositionSource,
    description:
      "Only authored dimensions change. The composed Button keeps its own height, padding and minimum target.",
  },
  {
    id: "bounded-scrolling",
    Demo: FrameScroll,
    source: scrollSource,
    description:
      "A definite block size bounds the scroll owner. A maximum alone does not establish a descendant percentage height.",
  },
] as const;
export function FrameDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...frameSection("usage")}
        description={
          <>
            Use <Code>Frame</Code> for local logical size constraints. It adds
            no paint, spacing or scrolling.
          </>
        }
      >
        <ExampleSource
          label="Frame import"
          source={'import { Frame } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Frame usage"
          source={'<Frame maxInlineSize="24rem">Content</Frame>'}
        />
      </DocsSection>
      <DocsSection {...frameSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...frameSection(id)}
                description={description}
              >
                <ExamplePreview label={frameSection(id).title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...frameSection("guide")}>
        <DocsSection
          {...frameSection("sizing-ownership")}
          description="Use Container for page measure and gutters, Stack/Grid for arrangement, Surface for paint, and ScrollArea for scrolling. A normal block already fills its available inline space; do not add 100% unless the containing layout requires it. Use a real wrapper when it establishes a percentage containing block, or asChild when the existing host should own the constraint."
        >
          {null}
        </DocsSection>
      </DocsSection>
      <DocsSection
        {...frameSection("props")}
        description="These props belong to Frame. Native attributes, ref, className, style and slot are also supported."
      >
        <PropsTable label="Frame props" rows={frameProps} />
      </DocsSection>
    </VStack>
  );
}
