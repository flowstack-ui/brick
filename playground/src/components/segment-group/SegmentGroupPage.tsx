import { useState, type CSSProperties } from "react";
import { Grid2X2, List } from "lucide-react";
import { Frame } from "@flowstack-ui/brick/frame";
import { Grid } from "@flowstack-ui/brick/grid";
import { Icon } from "@flowstack-ui/brick/icon";
import {
  SegmentGroup,
  type SegmentGroupSize,
} from "@flowstack-ui/brick/segment-group";
import { VStack } from "@flowstack-ui/brick/stack";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";

const customStyle = {
  "--brick-segment-group-background": "var(--brick-color-accent-soft)",
  "--brick-segment-group-indicator-border": "var(--brick-color-accent-border)",
  "--brick-segment-group-inset": "0.25rem",
} as CSSProperties;

const sizes: SegmentGroupSize[] = ["sm", "md", "lg"];

function Example({
  dir,
  label = "Project view",
  size,
}: {
  dir?: "ltr" | "rtl";
  label?: string;
  size?: SegmentGroupSize;
}) {
  return (
    <SegmentGroup.Root
      aria-label={label}
      defaultValue="list"
      dir={dir}
      size={size}
    >
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="list">List</SegmentGroup.Item>
      <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
      <SegmentGroup.Item value="board">Board</SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}

export const segmentGroupScenarios = [
  {
    id: "segment-group.overview",
    number: 1,
    title: "Overview",
    description:
      "One compact radio-semantic mode choice with a moving decorative Indicator.",
  },
  {
    id: "segment-group.sizes",
    number: 2,
    title: "Sizes",
    description:
      "Small, medium, and large align with Brick's shared named control geometry.",
  },
  {
    id: "segment-group.layout",
    number: 3,
    title: "Layout",
    description:
      "Controlled, full-width, vertical, and icon-only groups preserve one-value behavior.",
  },
  {
    id: "segment-group.states",
    number: 4,
    title: "States",
    description:
      "Disabled roots, disabled items, and read-only groups remain visibly distinct and unavailable.",
  },
  {
    id: "segment-group.appearance",
    number: 5,
    title: "Appearance",
    description:
      "The same recipe follows adjacent light and dark appearance scopes.",
  },
  {
    id: "segment-group.stress",
    number: 6,
    title: "Responsive and RTL",
    navigationTitle: "Stress",
    description:
      "Long labels, narrow width, direction changes, and alternate media preserve the selection contract.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function SegmentGroupPage() {
  const [view, setView] = useState("list");
  return (
    <VStack
      data-component-page="segment-group"
      data-testid="segment-group-workbench"
    >
      <Scenario {...segmentGroupScenarios[0]}>
        <EvidenceSurface data-testid="segment-group-overview" inset="lg">
          <Example />
        </EvidenceSurface>
      </Scenario>
      <Scenario {...segmentGroupScenarios[1]}>
        <Grid.Root
          columns={{ initial: 1, md: 3 }}
          data-testid="segment-group-sizes"
          gap="4"
        >
          {sizes.map((size) => (
            <Specimen key={size} label={size}>
              <Example label={`${size} project view`} size={size} />
            </Specimen>
          ))}
        </Grid.Root>
      </Scenario>
      <Scenario {...segmentGroupScenarios[2]}>
        <Grid.Root
          columns={{ initial: 1, md: 2 }}
          data-testid="segment-group-layout"
          gap="4"
        >
          <Specimen label="controlled">
            <SegmentGroup.Root
              aria-label="Controlled project view"
              onValueChange={setView}
              value={view}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="list">List</SegmentGroup.Item>
              <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
          <Specimen label="full width">
            <Frame inlineSize="100%">
              <SegmentGroup.Root
                aria-label="Full-width project view"
                defaultValue="list"
                fullWidth
              >
                <SegmentGroup.Indicator />
                <SegmentGroup.Item value="list">List</SegmentGroup.Item>
                <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
              </SegmentGroup.Root>
            </Frame>
          </Specimen>
          <Specimen label="icon only">
            <SegmentGroup.Root
              aria-label="Icon project view"
              defaultValue="list"
              size="sm"
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item aria-label="List view" iconOnly value="list">
                <Icon size="xs">
                  <List />
                </Icon>
              </SegmentGroup.Item>
              <SegmentGroup.Item aria-label="Grid view" iconOnly value="grid">
                <Icon size="xs">
                  <Grid2X2 />
                </Icon>
              </SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
          <Specimen label="vertical">
            <SegmentGroup.Root
              aria-label="Vertical density"
              defaultValue="comfortable"
              orientation="vertical"
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="compact">Compact</SegmentGroup.Item>
              <SegmentGroup.Item value="comfortable">
                Comfortable
              </SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...segmentGroupScenarios[3]}>
        <Grid.Root
          columns={{ initial: 1, md: 3 }}
          data-testid="segment-group-states"
          gap="4"
        >
          <Specimen label="disabled root">
            <SegmentGroup.Root
              aria-label="Disabled project view"
              defaultValue="list"
              disabled
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="list">List</SegmentGroup.Item>
              <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
          <Specimen label="disabled item">
            <SegmentGroup.Root
              aria-label="Partially available project view"
              defaultValue="list"
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="list">List</SegmentGroup.Item>
              <SegmentGroup.Item disabled value="grid">
                Grid unavailable
              </SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
          <Specimen label="read only">
            <SegmentGroup.Root
              aria-label="Read-only project view"
              defaultValue="list"
              readOnly
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="list">List</SegmentGroup.Item>
              <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...segmentGroupScenarios[4]}>
        <VStack gap="5">
          <Grid.Root
            columns={{ initial: 1, md: 2 }}
            data-testid="segment-group-appearance"
            gap="4"
          >
            <Specimen data-brick-appearance="light" label="light">
              <Example label="Light project view" />
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Example label="Dark project view" />
            </Specimen>
          </Grid.Root>
          <CustomizationEvidence
            code={`--brick-segment-group-background: var(--brick-color-accent-soft);\n--brick-segment-group-indicator-border: var(--brick-color-accent-border);\n--brick-segment-group-inset: 0.25rem;`}
            description="Background, selected indicator border, and inset match the live preview."
            title="Segment Group CSS properties"
          >
            <SegmentGroup.Root
              aria-label="Customized view"
              defaultValue="list"
              style={customStyle}
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="list">List</SegmentGroup.Item>
              <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
            </SegmentGroup.Root>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
      <Scenario {...segmentGroupScenarios[5]}>
        <Grid.Root
          columns={{ initial: 1, md: 2 }}
          data-testid="segment-group-stress"
          gap="4"
        >
          <Specimen label="long labels">
            <SegmentGroup.Root
              aria-label="Detailed project view"
              defaultValue="recent"
              fullWidth
            >
              <SegmentGroup.Indicator />
              <SegmentGroup.Item value="recent">
                <SegmentGroup.ItemText>
                  Recently updated projects
                </SegmentGroup.ItemText>
              </SegmentGroup.Item>
              <SegmentGroup.Item value="assigned">
                <SegmentGroup.ItemText>
                  Assigned to my team
                </SegmentGroup.ItemText>
              </SegmentGroup.Item>
            </SegmentGroup.Root>
          </Specimen>
          <Specimen dir="rtl" label="RTL">
            <Example dir="rtl" label="عرض المشروع" />
          </Specimen>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
