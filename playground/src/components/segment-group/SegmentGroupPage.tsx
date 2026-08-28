import { useState } from "react";
import { Grid2X2, List } from "lucide-react";
import { Grid } from "@flowstack-ui/brick/grid";
import { Icon } from "@flowstack-ui/brick/icon";
import { SegmentGroup, type SegmentGroupSize } from "@flowstack-ui/brick/segment-group";
import { VStack } from "@flowstack-ui/brick/stack";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";

const sizes: SegmentGroupSize[] = ["sm", "md", "lg"];

function Example({ label = "Project view", size }: { label?: string; size?: SegmentGroupSize }) {
  return (
    <SegmentGroup.Root aria-label={label} defaultValue="list" size={size}>
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="list">List</SegmentGroup.Item>
      <SegmentGroup.Item value="grid">Grid</SegmentGroup.Item>
      <SegmentGroup.Item value="board">Board</SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}

export const segmentGroupScenarios = [
  { id: "segment-group.overview", number: 1, title: "Overview", description: "One compact radio-semantic mode choice with a moving decorative Indicator." },
  { id: "segment-group.sizes", number: 2, title: "Sizes", description: "Small, medium, and large align with Brick's shared named control geometry." },
  { id: "segment-group.states", number: 3, title: "State and layout", description: "Controlled, disabled, full-width, and vertical groups preserve one-value behavior." },
  { id: "segment-group.appearance", number: 4, title: "Appearance", description: "The same recipe follows adjacent light and dark appearance scopes." },
] as const satisfies readonly ScenarioDefinition[];

export function SegmentGroupPage() {
  const [view, setView] = useState("list");
  return (
    <VStack data-component-page="segment-group" data-testid="segment-group-workbench">
      <Scenario {...segmentGroupScenarios[0]}>
        <EvidenceSurface data-testid="segment-group-overview" inset="lg"><Example /></EvidenceSurface>
      </Scenario>
      <Scenario {...segmentGroupScenarios[1]}>
        <Grid.Root columns={3} data-testid="segment-group-sizes">
          {sizes.map((size) => <EvidenceSurface key={size}><SpecimenLabel>{size}</SpecimenLabel><Example label={`${size} project view`} size={size} /></EvidenceSurface>)}
        </Grid.Root>
      </Scenario>
      <Scenario {...segmentGroupScenarios[2]}>
        <Grid.Root columns={2} data-testid="segment-group-states">
          <EvidenceSurface><SpecimenLabel>controlled</SpecimenLabel><SegmentGroup.Root aria-label="Controlled project view" onValueChange={setView} value={view}><SegmentGroup.Indicator /><SegmentGroup.Item value="list">List</SegmentGroup.Item><SegmentGroup.Item value="grid">Grid</SegmentGroup.Item></SegmentGroup.Root></EvidenceSurface>
          <EvidenceSurface><SpecimenLabel>full width</SpecimenLabel><SegmentGroup.Root aria-label="Full-width project view" defaultValue="list" fullWidth><SegmentGroup.Indicator /><SegmentGroup.Item value="list">List</SegmentGroup.Item><SegmentGroup.Item value="grid">Grid</SegmentGroup.Item></SegmentGroup.Root></EvidenceSurface>
          <EvidenceSurface><SpecimenLabel>disabled</SpecimenLabel><SegmentGroup.Root aria-label="Disabled project view" defaultValue="list" disabled><SegmentGroup.Indicator /><SegmentGroup.Item value="list">List</SegmentGroup.Item><SegmentGroup.Item value="grid">Grid</SegmentGroup.Item></SegmentGroup.Root></EvidenceSurface>
          <EvidenceSurface><SpecimenLabel>icon only</SpecimenLabel><SegmentGroup.Root aria-label="Icon project view" defaultValue="list" size="sm"><SegmentGroup.Indicator /><SegmentGroup.Item aria-label="List view" iconOnly value="list"><Icon size="xs"><List /></Icon></SegmentGroup.Item><SegmentGroup.Item aria-label="Grid view" iconOnly value="grid"><Icon size="xs"><Grid2X2 /></Icon></SegmentGroup.Item></SegmentGroup.Root></EvidenceSurface>
          <EvidenceSurface><SpecimenLabel>vertical</SpecimenLabel><SegmentGroup.Root aria-label="Vertical density" defaultValue="comfortable" orientation="vertical"><SegmentGroup.Indicator /><SegmentGroup.Item value="compact">Compact</SegmentGroup.Item><SegmentGroup.Item value="comfortable">Comfortable</SegmentGroup.Item></SegmentGroup.Root></EvidenceSurface>
        </Grid.Root>
      </Scenario>
      <Scenario {...segmentGroupScenarios[3]}>
        <Grid.Root columns={2} data-testid="segment-group-appearance">
          <EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Example label="Light project view" /></EvidenceSurface>
          <EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Example label="Dark project view" /></EvidenceSurface>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
