import { For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { sidebarSection } from "./sections.js";
import {
  sidebarRootProps,
  sidebarPanelProps,
  sidebarMainProps,
  sidebarTriggerProps,
  sidebarHeaderProps,
  sidebarContentProps,
  sidebarFooterProps,
} from "./props.js";
import { SidebarStates } from "./examples/SidebarStates.js";
import statesSource from "./examples/SidebarStates.tsx?raw";
import { SidebarRail } from "./examples/SidebarRail.js";
import railSource from "./examples/SidebarRail.tsx?raw";
import { SidebarSizes } from "./examples/SidebarSizes.js";
import sizesSource from "./examples/SidebarSizes.tsx?raw";
import { SidebarFloating } from "./examples/SidebarFloating.js";
import floatingSource from "./examples/SidebarFloating.tsx?raw";
import { SidebarBorders } from "./examples/SidebarBorders.js";
import bordersSource from "./examples/SidebarBorders.tsx?raw";
import { SidebarInsets } from "./examples/SidebarInsets.js";
import insetsSource from "./examples/SidebarInsets.tsx?raw";
import { SidebarSides } from "./examples/SidebarSides.js";
import sidesSource from "./examples/SidebarSides.tsx?raw";
import { SidebarScrolling } from "./examples/SidebarScrolling.js";
import scrollingSource from "./examples/SidebarScrolling.tsx?raw";
import { SidebarControlled } from "./examples/SidebarControlled.js";
import controlledSource from "./examples/SidebarControlled.tsx?raw";
import { SidebarSticky } from "./examples/SidebarSticky.js";
import stickySource from "./examples/SidebarSticky.tsx?raw";
import { SidebarMobile } from "./examples/SidebarMobile.js";
import mobileSource from "./examples/SidebarMobile.tsx?raw";
const examples = [
  {
    id: "states",
    Demo: SidebarStates,
    source: statesSource,
    description:
      "Expanded shows icons and labels, rail keeps compact navigation, and offcanvas hides it. Each example reports its current state; the trigger stays in Main.",
  },
  {
    id: "rail",
    Demo: SidebarRail,
    source: railSource,
    description:
      "Read existing state with useSidebarContext and retain accessible names for compact controls.",
  },
  {
    id: "sizes",
    Demo: SidebarSizes,
    source: sizesSource,
    description:
      "sm, md and lg select panel widths, not breakpoints. Main keeps the remaining space.",
  },
  {
    id: "floating",
    Demo: SidebarFloating,
    source: floatingSource,
    description:
      "Hiding a floating panel removes the inter-column gap while keeping the shell inset.",
  },
  {
    id: "borders",
    Demo: SidebarBorders,
    source: bordersSource,
    description:
      "bordered=false removes panel, header and footer borders independently of panel paint and floating elevation.",
  },
  {
    id: "insets",
    Demo: SidebarInsets,
    source: insetsSource,
    description:
      "Set inset=none only when another component owns region padding.",
  },
  {
    id: "sides",
    Demo: SidebarSides,
    source: sidesSource,
    description: "Side is physical left or right. Verify both LTR and RTL.",
  },
  {
    id: "scrolling",
    Demo: SidebarScrolling,
    source: scrollingSource,
    description:
      "Content is flexible, not a scroll owner. Bound a ScrollArea for long navigation.",
  },
  {
    id: "controlled",
    Demo: SidebarControlled,
    source: controlledSource,
    description:
      "Control state explicitly when the application owns it. Disabled prevents trigger changes.",
  },
  {
    id: "sticky",
    Demo: SidebarSticky,
    source: stickySource,
    description:
      "Sticky follows the nearest scrollport. This bounded example deliberately sets the public available-height variable; application headers may require a sticky offset.",
  },
  {
    id: "mobile",
    Demo: SidebarMobile,
    source: mobileSource,
    description:
      "At an application breakpoint, replace the persistent layout with a Drawer. This example exposes that separate modal composition at every width for testing.",
  },
] as const;
export function SidebarDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...sidebarSection("usage")}
        description="Sidebar coordinates a persistent panel with main content. Use Drawer for a mobile modal rather than changing Sidebar semantics."
      >
        <ExampleSource
          label="Sidebar import"
          source={'import { Sidebar } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Sidebar usage"
          source={
            "<Sidebar.Root>\\n  <Sidebar.Panel>Navigation</Sidebar.Panel>\\n  <Sidebar.Main>Content</Sidebar.Main>\\n</Sidebar.Root>"
          }
        />
      </DocsSection>
      <DocsSection {...sidebarSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...sidebarSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={sidebarSection(id).title}
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
        {...sidebarSection("props")}
        description="Component-owned props. Layout, typography and behavior from other components remain composition."
      >
        <DocsSection
          {...sidebarSection("props-root")}
          description="Root owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Sidebar.Root props" rows={sidebarRootProps} />
        </DocsSection>
        <DocsSection
          {...sidebarSection("props-panel")}
          description="Panel owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Sidebar.Panel props" rows={sidebarPanelProps} />
        </DocsSection>
        <DocsSection
          {...sidebarSection("props-main")}
          description="Main owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Sidebar.Main props" rows={sidebarMainProps} />
        </DocsSection>
        <DocsSection
          {...sidebarSection("props-trigger")}
          description="Trigger owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable
            label="Sidebar.Trigger props"
            rows={sidebarTriggerProps}
          />
        </DocsSection>
        <DocsSection
          {...sidebarSection("props-header")}
          description="Header owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Sidebar.Header props" rows={sidebarHeaderProps} />
        </DocsSection>
        <DocsSection
          {...sidebarSection("props-content")}
          description="Content owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable
            label="Sidebar.Content props"
            rows={sidebarContentProps}
          />
        </DocsSection>
        <DocsSection
          {...sidebarSection("props-footer")}
          description="Footer owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Sidebar.Footer props" rows={sidebarFooterProps} />
        </DocsSection>
      </DocsSection>
    </VStack>
  );
}
