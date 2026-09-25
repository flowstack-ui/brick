import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { scrollAreaSection } from "./sections.js";
import { scrollAreaProps, scrollAreaPartProps } from "./props.js";
import { ScrollAreaVirtual } from "./examples/ScrollAreaVirtual.js";
import ScrollAreaVirtualSource from "./examples/ScrollAreaVirtual.tsx?raw";
import { ScrollAreaMenu } from "./examples/ScrollAreaMenu.js";
import ScrollAreaMenuSource from "./examples/ScrollAreaMenu.tsx?raw";
import { ScrollAreaSizes } from "./examples/ScrollAreaSizes.js";
import ScrollAreaSizesSource from "./examples/ScrollAreaSizes.tsx?raw";
import { ScrollAreaHorizontal } from "./examples/ScrollAreaHorizontal.js";
import ScrollAreaHorizontalSource from "./examples/ScrollAreaHorizontal.tsx?raw";
import { ScrollAreaBoth } from "./examples/ScrollAreaBoth.js";
import ScrollAreaBothSource from "./examples/ScrollAreaBoth.tsx?raw";
import { ScrollAreaVisibility } from "./examples/ScrollAreaVisibility.js";
import ScrollAreaVisibilitySource from "./examples/ScrollAreaVisibility.tsx?raw";
import { ScrollAreaGutter } from "./examples/ScrollAreaGutter.js";
import ScrollAreaGutterSource from "./examples/ScrollAreaGutter.tsx?raw";
import { ScrollAreaControllerExample } from "./examples/ScrollAreaController.js";
import ScrollAreaControllerExampleSource from "./examples/ScrollAreaController.tsx?raw";
import { ScrollAreaBottom } from "./examples/ScrollAreaBottom.js";
import ScrollAreaBottomSource from "./examples/ScrollAreaBottom.tsx?raw";
import { ScrollAreaDynamic } from "./examples/ScrollAreaDynamic.js";
import ScrollAreaDynamicSource from "./examples/ScrollAreaDynamic.tsx?raw";
import { ScrollAreaNative } from "./examples/ScrollAreaNative.js";
import ScrollAreaNativeSource from "./examples/ScrollAreaNative.tsx?raw";
import { ScrollAreaCustomization } from "./examples/ScrollAreaCustomization.js";
import ScrollAreaCustomizationSource from "./examples/ScrollAreaCustomization.tsx?raw";
import { ScrollAreaRtl } from "./examples/ScrollAreaRtl.js";
import ScrollAreaRtlSource from "./examples/ScrollAreaRtl.tsx?raw";
const examples = [
  {
    id: "sizes",
    Demo: ScrollAreaSizes,
    source: ScrollAreaSizesSource,
    description:
      "Four custom scrollbar thicknesses; content typography is unchanged.",
  },
  {
    id: "horizontal",
    Demo: ScrollAreaHorizontal,
    source: ScrollAreaHorizontalSource,
    description: "Keep a wide collection inside its bounded viewport.",
  },
  {
    id: "both",
    Demo: ScrollAreaBoth,
    source: ScrollAreaBothSource,
    description:
      "Use one track for each enabled axis and a corner between them.",
  },
  {
    id: "visibility",
    Demo: ScrollAreaVisibility,
    source: ScrollAreaVisibilitySource,
    description:
      "Auto and interaction reveal custom bars while hovering, focusing, scrolling or dragging. Always shows overflowing axes.",
  },
  {
    id: "gutter",
    Demo: ScrollAreaGutter,
    source: ScrollAreaGutterSource,
    description:
      "Reserve space for custom scrollbars, or let them overlay content.",
  },
  {
    id: "controller",
    Demo: ScrollAreaControllerExample,
    source: ScrollAreaControllerExampleSource,
    description:
      "Share edge state, progress and commands with outside controls. User input interrupts animation; reduced motion is respected.",
  },
  {
    id: "customization",
    Demo: ScrollAreaCustomization,
    source: ScrollAreaCustomizationSource,
    description: "Customize documented scrollbar colors with semantic tokens.",
  },
  {
    id: "rtl",
    Demo: ScrollAreaRtl,
    source: ScrollAreaRtlSource,
    description:
      "Physical edge commands and logical progress respect right-to-left content.",
  },
  {
    id: "dynamic",
    Demo: ScrollAreaDynamic,
    source: ScrollAreaDynamicSource,
    description: "Content observation updates overflow and thumb geometry.",
  },
  {
    id: "bottom",
    Demo: ScrollAreaBottom,
    source: ScrollAreaBottomSource,
    description:
      "Application policy follows appended content only while the reader is at the bottom.",
  },
  {
    id: "virtual",
    Demo: ScrollAreaVirtual,
    source: ScrollAreaVirtualSource,
    description:
      "Optional @tanstack/react-virtual integration. Only visible rows are mounted; ScrollArea still owns the single native viewport.",
  },
  {
    id: "menu",
    Demo: ScrollAreaMenu,
    source: ScrollAreaMenuSource,
    description:
      "Menu owns roving focus and dismissal; ScrollArea owns only the bounded viewport.",
  },
  {
    id: "native",
    Demo: ScrollAreaNative,
    source: ScrollAreaNativeSource,
    description:
      "Native is the default. No Content or custom tracks are required.",
  },
];
export function ScrollAreaDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...scrollAreaSection("usage")}
        description="Use Frame to constrain the outer size. Viewport is the only scrolling element; custom tracks mirror native scrolling."
      >
        <ExampleSource
          label="ScrollArea import"
          source={'import { ScrollArea } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="ScrollArea usage"
          source={
            '<ScrollArea.Root scrollbar="custom">\n  <ScrollArea.Viewport>\n    <ScrollArea.Content>{children}</ScrollArea.Content>\n  </ScrollArea.Viewport>\n  <ScrollArea.Scrollbar />\n</ScrollArea.Root>'
          }
        />
      </DocsSection>
      <DocsSection {...scrollAreaSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...scrollAreaSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={scrollAreaSection(id).title}
                  source={source}
                >
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...scrollAreaSection("guide")}>
        <Paragraph tone="secondary">
          Name focusable viewports when they need a region landmark. Native
          keyboard, wheel and touch remain available. Custom mode falls back to
          native scrollbars before its anatomy is ready and in forced colors.
          Size affects custom bars only; ordinary page scrolling should stay
          native. RTL progress is logical, while left/right edge commands are
          physical.
        </Paragraph>
      </DocsSection>
      <DocsSection
        {...scrollAreaSection("props")}
        description="Public component props and composition options."
      >
        <DocsSection {...scrollAreaSection("props-root")}>
          <PropsTable label="Root props" rows={scrollAreaProps} />
        </DocsSection>
        <For each={scrollAreaPartProps}>
          {({ id, title, rows }) => (
            <DocsSection key={id} {...scrollAreaSection(id)}>
              <PropsTable label={title + " props"} rows={rows} />
            </DocsSection>
          )}
        </For>
      </DocsSection>
    </VStack>
  );
}
