import { Code, For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { zStackSection } from "./sections.js";
import { zStackRootProps, zStackItemProps } from "./props.js";
import { ZStackPlacement } from "./examples/ZStackPlacement.js";
import placementSource from "./examples/ZStackPlacement.tsx?raw";
import { ZStackItems } from "./examples/ZStackItems.js";
import itemsSource from "./examples/ZStackItems.tsx?raw";
import { ZStackResponsive } from "./examples/ZStackResponsive.js";
import responsiveSource from "./examples/ZStackResponsive.tsx?raw";
import { ZStackNatural } from "./examples/ZStackNatural.js";
import naturalSource from "./examples/ZStackNatural.tsx?raw";
import { ZStackLayers } from "./examples/ZStackLayers.js";
import layersSource from "./examples/ZStackLayers.tsx?raw";
import { ZStackComposition } from "./examples/ZStackComposition.js";
import compositionSource from "./examples/ZStackComposition.tsx?raw";
const examples = [
  {
    id: "placement",
    Demo: ZStackPlacement,
    source: placementSource,
    description:
      "Root aligns all layers in a shared cell. These compact specimens compare the nine logical positions.",
  },
  {
    id: "items",
    Demo: ZStackItems,
    source: itemsSource,
    description:
      "Use Item only when a layer needs its own placement. Ordinary children already overlap.",
  },
  {
    id: "responsive",
    Demo: ZStackResponsive,
    source: responsiveSource,
    description:
      "The same layer moves without duplicating content or changing keyboard order. Spacing also follows the standard breakpoints.",
  },
  {
    id: "natural-sizing",
    Demo: ZStackNatural,
    source: naturalSource,
    description:
      "Every layer contributes to natural size. Unlike Float, the taller child makes room in the surrounding document.",
  },
  {
    id: "layers",
    Demo: ZStackLayers,
    source: layersSource,
    description:
      "Named layers coordinate a small local depth relationship. Contained isolation supports ordinary clickable actions.",
  },
  {
    id: "composition",
    Demo: ZStackComposition,
    source: compositionSource,
    description:
      "Root can share Surface’s host; Item can share a Button’s host. Constraints belong to Frame and paint stays with Surface.",
  },
] as const;
export function ZStackDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...zStackSection("usage")}
        description={
          <>
            Use <Code>ZStack.Root</Code> for overlapping, size-contributing
            children. Add <Code>ZStack.Item</Code> only for per-layer placement,
            spacing or depth.
          </>
        }
      >
        <ExampleSource
          label="ZStack import"
          source={'import { ZStack } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="ZStack usage"
          source={
            "<ZStack.Root>\n  {/* Layers in meaningful DOM order */}\n</ZStack.Root>"
          }
        />
      </DocsSection>
      <DocsSection {...zStackSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...zStackSection(id)}
                description={description}
              >
                <ExamplePreview label={zStackSection(id).title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...zStackSection("guide")}>
        <DocsSection
          {...zStackSection("overlap-ownership")}
          description="Use Float for out-of-flow edge attachment, Center for in-flow centering, and Surface media anatomy for ordinary media-backed cards. ZStack keeps layers in one grid cell: equal-depth layers paint in DOM order, while named layers set local depth. Keep reading and focus order meaningful and decorative layers clear of controls. The default contained isolation is normally correct; use open only for deliberate ancestor stacking participation."
        >
          {null}
        </DocsSection>
      </DocsSection>
      <DocsSection {...zStackSection("props")}>
        <DocsSection
          {...zStackSection("props-root")}
          description="Root owns the shared grid and isolation. Native attributes, ref, className, style and slot are also supported."
        >
          <PropsTable label="ZStack.Root props" rows={zStackRootProps} />
        </DocsSection>
        <DocsSection
          {...zStackSection("props-item")}
          description="Item owns one layer’s alignment, edge spacing and depth. Native attributes and composition props stay on that layer."
        >
          <PropsTable label="ZStack.Item props" rows={zStackItemProps} />
        </DocsSection>
      </DocsSection>
    </VStack>
  );
}
