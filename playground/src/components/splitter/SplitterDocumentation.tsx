import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { splitterSection } from "./sections.js";
import { splitterRootProps, splitterPanelProps, splitterTriggerProps, splitterProviderProps } from "./props.js";
import { SplitterControlled } from "./examples/SplitterControlled.js";
import ControlledSource from "./examples/SplitterControlled.tsx?raw";
import { SplitterVertical } from "./examples/SplitterVertical.js";
import VerticalSource from "./examples/SplitterVertical.tsx?raw";
import { SplitterMultiple } from "./examples/SplitterMultiple.js";
import MultipleSource from "./examples/SplitterMultiple.tsx?raw";
import { SplitterCollapsible } from "./examples/SplitterCollapsible.js";
import CollapsibleSource from "./examples/SplitterCollapsible.tsx?raw";
import { SplitterPixels } from "./examples/SplitterPixels.js";
import PixelsSource from "./examples/SplitterPixels.tsx?raw";
import { SplitterNested } from "./examples/SplitterNested.js";
import NestedSource from "./examples/SplitterNested.tsx?raw";
import { SplitterDisabled } from "./examples/SplitterDisabled.js";
import DisabledSource from "./examples/SplitterDisabled.tsx?raw";
import { SplitterSeparator } from "./examples/SplitterSeparator.js";
import SeparatorSource from "./examples/SplitterSeparator.tsx?raw";
import { SplitterReset } from "./examples/SplitterReset.js";
import ResetSource from "./examples/SplitterReset.tsx?raw";
import { SplitterEvents } from "./examples/SplitterEvents.js";
import EventsSource from "./examples/SplitterEvents.tsx?raw";
import { SplitterStore } from "./examples/SplitterStore.js";
import StoreSource from "./examples/SplitterStore.tsx?raw";
import { SplitterUnits } from "./examples/SplitterUnits.js";
import UnitsSource from "./examples/SplitterUnits.tsx?raw";
import { SplitterDynamic } from "./examples/SplitterDynamic.js";
import DynamicSource from "./examples/SplitterDynamic.tsx?raw";
import { SplitterIntersection } from "./examples/SplitterIntersection.js";
import IntersectionSource from "./examples/SplitterIntersection.tsx?raw";
import { SplitterResponsive } from "./examples/SplitterResponsive.js";
import ResponsiveSource from "./examples/SplitterResponsive.tsx?raw";
import { SplitterStorage } from "./examples/SplitterStorage.js";
import StorageSource from "./examples/SplitterStorage.tsx?raw";
const examples = [{id:"controlled", Demo:SplitterControlled, source:ControlledSource, description:"Use keyed sizes and onResize to own the state outside Root. Preset buttons provide non-drag alternatives."},
{id:"vertical", Demo:SplitterVertical, source:VerticalSource, description:"Use a definite Frame height for vertically stacked panels."},
{id:"multiple", Demo:SplitterMultiple, source:MultipleSource, description:"Declare panel descriptors and render panels and boundaries in the same order."},
{id:"collapsible", Demo:SplitterCollapsible, source:CollapsibleSource, description:"A collapses to 5%, restores to its previous width, and stays between 20% and 60% when expanded."},
{id:"pixels", Demo:SplitterPixels, source:PixelsSource, description:"Percentages scale with the root. preserve-pixels keeps A’s measured width when the root resizes; a proportional sibling absorbs the difference."},
{id:"nested", Demo:SplitterNested, source:NestedSource, description:"Each nested Root owns its own orientation, sizing and keyboard boundary."},
{id:"disabled", Demo:SplitterDisabled, source:DisabledSource, description:"Disable one boundary with ResizeTrigger.disabled, or all resizing with Root.disabled."},
{id:"separator", Demo:SplitterSeparator, source:SeparatorSource, description:"Explicit decorative children replace the default separator and indicator. The pointer target and keyboard behavior remain intact."},
{id:"reset", Demo:SplitterReset, source:ResetSource, description:"Context provides resetSizes. Keep a visible reset button as an alternative to double clicking."},
{id:"events", Demo:SplitterEvents, source:EventsSource, description:"Use arrow keys, Shift for larger steps, and Home/End for bounds. keyboardStep is measured in pixels. Escape cancels a drag."}];
examples.push({id:"store", Demo:SplitterStore, source:StoreSource, description:"Use one public store outside RootProvider for state and commands."},{id:"units", Demo:SplitterUnits, source:UnitsSource, description:"Use rem, em, vw or vh for measured sizes. Percent defaults remain the stable SSR choice."},{id:"dynamic", Demo:SplitterDynamic, source:DynamicSource, description:"Applications update descriptors and sizes together. Removing the last boundary leaves one full-width panel."},{id:"intersection", Demo:SplitterIntersection, source:IntersectionSource, description:"A shared registry coordinates perpendicular handles where they meet. Escape rolls both axes back."},{id:"responsive", Demo:SplitterResponsive, source:ResponsiveSource, description:"Application media policy changes the scalar orientation after hydration; the initial render remains deterministic."},{id:"storage", Demo:SplitterStorage, source:StorageSource, description:"Validate restored values and save completed, non-cancelled changes. Storage is application-owned."});
export function SplitterDocumentation() {
 return (
 <VStack gap={8} startSpacing={8}>
 <DocsSection {...splitterSection("usage")} description="Compose adjacent resizable panels with a named boundary. Frame owns dimensions; Surface owns optional panel paint.">
 <ExampleSource label="Splitter import" source={'import { Splitter } from "@flowstack-ui/brick";'}/>
 <ExampleSource label="Splitter usage" source={'<Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>\n  <Splitter.Panel panelId="a">A</Splitter.Panel>\n  <Splitter.ResizeTrigger before="a" after="b" aria-label="A panel size" />\n  <Splitter.Panel panelId="b">B</Splitter.Panel>\n</Splitter.Root>'}/>
 </DocsSection>
 <DocsSection {...splitterSection("shortcuts")} description="An empty ResizeTrigger includes the decorative separator and indicator automatically.">
 <ExampleSource label="Explicit splitter handle" source={'<Splitter.ResizeTrigger before="a" after="b" aria-label="A panel size">\n  <Splitter.ResizeTriggerSeparator />\n  <Splitter.ResizeTriggerIndicator />\n</Splitter.ResizeTrigger>'}/>
 </DocsSection>
 <DocsSection {...splitterSection("examples")}><VStack gap={16}>
 <For each={examples}>{({id,Demo,source,description}) => <DocsSection key={id} {...splitterSection(id)} description={description}><ExamplePreview label={splitterSection(id).title} source={source}><Demo/></ExamplePreview></DocsSection>}</For>
 </VStack></DocsSection>
 <DocsSection {...splitterSection("guide")}>
 <Paragraph tone="secondary">Name every resize boundary. Keep controls outside the separator and offer preset, collapse or reset buttons when resizing is essential. Keyboard arrows follow physical movement, including RTL. Fully collapsed content stays mounted but is unavailable to focus and assistive technology.</Paragraph>
 <Paragraph tone="secondary">Percent defaults keep server rendering stable. Pixel sizes reconcile after measurement. Percentage, px, em, rem, vw and vh sizes are supported; arbitrary CSS calculations are not. If constraints cannot fit, the component preserves them and exposes insufficient space rather than silently shrinking content.</Paragraph>
 <Paragraph tone="secondary">Applications own persistence and responsive orientation. Save completed changes from onResizeEnd only when cancelled is false; validate restored values. Root accepts scalar orientation, not responsive objects. Context and useSplitterContext expose the public commands. useSplitter owns an external store consumed by one RootProvider.</Paragraph>
 <Paragraph tone="secondary">When changing the panel collection, update descriptors, rendered panels and adjacent boundaries together. Do not hide an individual panel with CSS while leaving its descriptor active. One remaining panel is valid. Applications choose the size redistribution policy; getItems generates matching panel and boundary descriptors.</Paragraph>
 </DocsSection>
 <DocsSection {...splitterSection("props")}>
 <DocsSection {...splitterSection("splitter-root-props")} description="State and geometry for the panel group."><PropsTable label="Splitter.Root props" rows={splitterRootProps}/></DocsSection>
 <DocsSection {...splitterSection("splitter-provider-props")} description="Render an externally owned store."><PropsTable label="Splitter.RootProvider props" rows={splitterProviderProps}/></DocsSection>
 <DocsSection {...splitterSection("splitter-panel-props")} description="A region registered by its stable panel ID."><PropsTable label="Splitter.Panel props" rows={splitterPanelProps}/></DocsSection>
 <DocsSection {...splitterSection("splitter-trigger-props")} description="A focusable separator between adjacent panels. Supply aria-label or aria-labelledby."><PropsTable label="Splitter.ResizeTrigger props" rows={splitterTriggerProps}/></DocsSection>
 <Paragraph tone="secondary">Context takes a render function. ResizeTriggerSeparator and ResizeTriggerIndicator are decorative spans with native span props and refs; they do not introduce additional sizing or behavior props.</Paragraph>
 </DocsSection>
 </VStack>);
}
