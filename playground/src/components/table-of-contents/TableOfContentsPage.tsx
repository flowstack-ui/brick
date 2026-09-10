import { For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { TableOfContentsExample } from "./examples/TableOfContentsExample.js";
import source from "./examples/TableOfContentsExample.tsx?raw";
import { TableOfContentsNative } from "./examples/TableOfContentsNative.js";
import nativeSource from "./examples/TableOfContentsNative.tsx?raw";
import { TableOfContentsEmpty } from "./examples/TableOfContentsEmpty.js";
import emptySource from "./examples/TableOfContentsEmpty.tsx?raw";
import { PropsTable } from "../../shared/PropsTable.js";
import { tableOfContentsProps } from "./props.js";

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
export function TableOfContentsPage() {
  return (
    <VStack gap="16" data-component-page="table-of-contents">
      <For each={tableOfContentsScenarios}>
        {(scenario, index) => (
          <Scenario key={scenario.id} {...scenario} hideHeading>
            <DocsSection
              id={scenario.id.split(".")[1]}
              title={scenario.title}
              description={scenario.description}
            >
              <ExamplePreview
                label={scenario.title}
                source={
                  index === 9
                    ? nativeSource
                    : index === 10
                      ? emptySource
                      : source
                }
              >
                {index === 9 ? (
                  <TableOfContentsNative />
                ) : index === 10 ? (
                  <TableOfContentsEmpty />
                ) : index === 2 ? (
                  <VStack gap="8">
                    <TableOfContentsExample />
                    <TableOfContentsExample size="md" />
                  </VStack>
                ) : index === 3 ? (
                  <VStack gap="8">
                    <For each={["plain", "line"] as const}>
                      {(variant) => (
                        <For
                          key={variant}
                          each={["neutral", "accent"] as const}
                        >
                          {(tone) => (
                            <TableOfContentsExample
                              key={tone}
                              variant={variant}
                              tone={tone}
                            />
                          )}
                        </For>
                      )}
                    </For>
                  </VStack>
                ) : (
                  <TableOfContentsExample
                    nested={index === 1}
                    variant={index === 4 || index === 8 ? "line" : undefined}
                    indicator={index === 4 || index === 8}
                    controlled={index === 5}
                    disclosure={index === 6}
                    dynamic={index === 7}
                    rtl={index === 8}
                  />
                )}
              </ExamplePreview>
            </DocsSection>
          </Scenario>
        )}
      </For>
      <DocsSection
        id="props"
        title="Props"
        description="Root options; RootProvider shares the same recipes around an existing controller. Nav's autoScroll defaults true and its getScrollElement names the independently scrolling rail."
      >
        <PropsTable
          label="TableOfContents.Root props"
          rows={tableOfContentsProps}
        />
      </DocsSection>
    </VStack>
  );
}
