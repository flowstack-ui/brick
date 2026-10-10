import { For, Paragraph, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { dividerSection } from "./sections.js";
import { dividerProps } from "./props.js";
import { DividerVariants } from "./examples/DividerVariants.js";
import DividerVariantsSource from "./examples/DividerVariants.tsx?raw";
import { DividerThickness } from "./examples/DividerThickness.js";
import DividerThicknessSource from "./examples/DividerThickness.tsx?raw";
import { DividerVertical } from "./examples/DividerVertical.js";
import DividerVerticalSource from "./examples/DividerVertical.tsx?raw";
import { DividerResponsive } from "./examples/DividerResponsive.js";
import DividerResponsiveSource from "./examples/DividerResponsive.tsx?raw";
import { DividerLabels } from "./examples/DividerLabels.js";
import DividerLabelsSource from "./examples/DividerLabels.tsx?raw";
import { DividerInset } from "./examples/DividerInset.js";
import DividerInsetSource from "./examples/DividerInset.tsx?raw";
const examples = [
  {
    id: "variants",
    Demo: DividerVariants,
    source: DividerVariantsSource,
    description: "Compare the three border styles.",
  },
  {
    id: "thickness",
    Demo: DividerThickness,
    source: DividerThicknessSource,
    description:
      "Choose a line weight without changing the surrounding content.",
  },
  {
    id: "vertical",
    Demo: DividerVertical,
    source: DividerVerticalSource,
    description: "Stretch a vertical divider between items in a row.",
  },
  {
    id: "responsive",
    Demo: DividerResponsive,
    source: DividerResponsiveSource,
    description:
      "Match a decorative divider to the parent’s responsive direction.",
  },
  {
    id: "labels",
    Demo: DividerLabels,
    source: DividerLabelsSource,
    description: "Separate content with a horizontal label.",
  },
  {
    id: "inset",
    Demo: DividerInset,
    source: DividerInsetSource,
    description: "Inset the line from its logical start or both ends.",
  },
];
export function DividerDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...dividerSection("usage")}
        description="Divider separates related content visually. Use decorative=false for a semantic thematic break."
      >
        <ExampleSource
          label="Divider import"
          source={'import { Divider } from "@flowstack-ui/brick";'}
        />
        <ExampleSource label="Divider usage" source={"<Divider />"} />
      </DocsSection>
      <DocsSection {...dividerSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...dividerSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={dividerSection(id).title}
                  source={source}
                >
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection {...dividerSection("guide")}>
        <Paragraph tone="secondary">
          Responsive orientation is decorative so assistive technology never
          receives an outdated axis. Semantic separators use scalar orientation.
          Labels remain horizontal; use Stack to compose other layouts.
        </Paragraph>
      </DocsSection>
      <DocsSection
        {...dividerSection("props")}
        description="Public component props and composition options."
      >
        <PropsTable label="Divider props" rows={dividerProps} />
      </DocsSection>
    </VStack>
  );
}
