import { For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import fixtureSource from "./examples/TableOfContentsExample.tsx?raw";
import { tableOfContentsParts } from "./props.js";
import { TableOfContentsBasic } from "./examples/TableOfContentsBasic.js";
import BasicSource from "./examples/TableOfContentsBasic.tsx?raw";
import { TableOfContentsNested } from "./examples/TableOfContentsNested.js";
import NestedSource from "./examples/TableOfContentsNested.tsx?raw";
import { TableOfContentsSizes } from "./examples/TableOfContentsSizes.js";
import SizesSource from "./examples/TableOfContentsSizes.tsx?raw";
import { TableOfContentsVariants } from "./examples/TableOfContentsVariants.js";
import VariantsSource from "./examples/TableOfContentsVariants.tsx?raw";
import { TableOfContentsIndicator } from "./examples/TableOfContentsIndicator.js";
import IndicatorSource from "./examples/TableOfContentsIndicator.tsx?raw";
import { TableOfContentsControlled } from "./examples/TableOfContentsControlled.js";
import ControlledSource from "./examples/TableOfContentsControlled.tsx?raw";
import { TableOfContentsDisclosure } from "./examples/TableOfContentsDisclosure.js";
import DisclosureSource from "./examples/TableOfContentsDisclosure.tsx?raw";
import { TableOfContentsDynamic } from "./examples/TableOfContentsDynamic.js";
import DynamicSource from "./examples/TableOfContentsDynamic.tsx?raw";
import { TableOfContentsRtl } from "./examples/TableOfContentsRtl.js";
import RtlSource from "./examples/TableOfContentsRtl.tsx?raw";
import { TableOfContentsNative } from "./examples/TableOfContentsNative.js";
import NativeSource from "./examples/TableOfContentsNative.tsx?raw";
import { TableOfContentsEmpty } from "./examples/TableOfContentsEmpty.js";
import EmptySource from "./examples/TableOfContentsEmpty.tsx?raw";
export const tableOfContentsScenarios = [
  {
    id: "table-of-contents.basic",
    number: 1,
    title: "Usage",
    description: "Native section links with one current reading location.",
  },
  {
    id: "table-of-contents.nested",
    number: 2,
    title: "Nested headings",
    description:
      "Nested lists preserve document hierarchy without adding a tree keyboard model.",
  },
  {
    id: "table-of-contents.sizes",
    number: 3,
    title: "Sizes",
    description: "Small and medium coordinate text and row geometry.",
  },
  {
    id: "table-of-contents.variants",
    number: 4,
    title: "Variants and tones",
    description:
      "Plain and line navigation with neutral or accent current state.",
  },
  {
    id: "table-of-contents.indicator",
    number: 5,
    title: "Indicator",
    description:
      "An optional measured marker follows the active row, including wrapped labels.",
  },
  {
    id: "table-of-contents.controlled",
    number: 6,
    title: "Controlled state",
    description:
      "Share one controller through RootProvider and display its accepted current location.",
  },
  {
    id: "table-of-contents.disclosure",
    number: 7,
    title: "Collapsible contents",
    description:
      "Compose a disclosure when the surrounding page calls for compact navigation.",
  },
  {
    id: "table-of-contents.dynamic",
    number: 8,
    title: "Dynamic sections",
    description:
      "Targets can disappear and return without rebuilding navigation or adding observers.",
  },
  {
    id: "table-of-contents.rtl",
    number: 9,
    title: "Right-to-left",
    description:
      "Labels remain authored content; indentation and indicator placement follow direction.",
  },
  {
    id: "table-of-contents.native",
    number: 10,
    title: "Native fragments",
    description:
      "These links navigate the surrounding document using browser fragment and history behavior.",
  },
  {
    id: "table-of-contents.empty",
    number: 11,
    title: "Empty contents",
    description:
      "Author the empty-state copy outside the list rather than inserting invalid list children.",
  },
] as const satisfies readonly ScenarioDefinition[];
const demos = [
  { Demo: TableOfContentsBasic, source: BasicSource },
  { Demo: TableOfContentsNested, source: NestedSource },
  { Demo: TableOfContentsSizes, source: SizesSource },
  { Demo: TableOfContentsVariants, source: VariantsSource },
  { Demo: TableOfContentsIndicator, source: IndicatorSource },
  { Demo: TableOfContentsControlled, source: ControlledSource },
  { Demo: TableOfContentsDisclosure, source: DisclosureSource },
  { Demo: TableOfContentsDynamic, source: DynamicSource },
  { Demo: TableOfContentsRtl, source: RtlSource },
  { Demo: TableOfContentsNative, source: NativeSource },
  { Demo: TableOfContentsEmpty, source: EmptySource },
];
export const tableOfContentsSections = [
  ...tableOfContentsScenarios.map((s) => ({
    id: s.id.split(".")[1],
    title: s.title,
    level: 2 as const,
  })),
  { id: "fixture", title: "Shared article fixture", level: 2 as const },
  { id: "props", title: "Props", level: 2 as const },
  ...tableOfContentsParts.map((p) => ({
    id: p.id,
    title: p.title,
    level: 3 as const,
  })),
];
export function TableOfContentsPage() {
  return (
    <VStack gap="16" data-component-page="table-of-contents">
      <For each={tableOfContentsScenarios}>
        {(scenario, index) => {
          const { Demo, source } = demos[index];
          return (
            <Scenario key={scenario.id} {...scenario} hideHeading>
              <DocsSection
                id={scenario.id.split(".")[1]}
                title={scenario.title}
                description={scenario.description}
              >
                <ExamplePreview label={scenario.title} source={source}>
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            </Scenario>
          );
        }}
      </For>
      <DocsSection id="fixture" title="Shared article fixture" description="The examples above import this shared article and navigation composition. Copy it alongside the selected example.">
        <ExampleSource label="Shared article fixture" source={fixtureSource} />
      </DocsSection>
      <DocsSection id="props" title="Props">
        <For each={tableOfContentsParts}>
          {(part) => (
            <DocsSection
              key={part.id}
              id={part.id}
              title={part.title}
              description={part.description}
              level={3}
            >
              <PropsTable
                label={`TableOfContents.${part.title} props`}
                rows={part.rows}
              />
            </DocsSection>
          )}
        </For>
      </DocsSection>
    </VStack>
  );
}
