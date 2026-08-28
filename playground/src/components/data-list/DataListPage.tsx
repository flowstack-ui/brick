import { DataList, Grid, Surface, VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const dataListScenarios = [
  { id: "data-list.overview", number: 1, title: "Overview", description: "Native term-and-value facts use finished Brick rhythm and text roles." },
  { id: "data-list.orientation", number: 2, title: "Responsive orientation", navigationTitle: "Orientation", description: "One semantic list changes visual alignment without duplicating content." },
  { id: "data-list.recipes", number: 3, title: "Sizes and separators", navigationTitle: "Recipes", description: "Closed size, label-measure, and divider recipes preserve readable facts." },
] as const satisfies readonly ScenarioDefinition[];

function ProfileFacts({ divide = false }: { divide?: boolean }) {
  return (
    <DataList.Root divide={divide}>
      <DataList.Item><DataList.Label>Role</DataList.Label><DataList.Value>Product designer</DataList.Value></DataList.Item>
      <DataList.Item><DataList.Label>Location</DataList.Label><DataList.Value>Brooklyn, New York</DataList.Value></DataList.Item>
      <DataList.Item><DataList.Label>Email</DataList.Label><DataList.Value>maya@example.com</DataList.Value></DataList.Item>
    </DataList.Root>
  );
}

export function DataListPage() {
  return (
    <VStack data-component-page="data-list" gap="6">
      <Scenario {...dataListScenarios[0]}><Surface inset="lg"><ProfileFacts /></Surface></Scenario>
      <Scenario {...dataListScenarios[1]}><Surface inset="lg"><DataList.Root data-testid="data-list-responsive" labelWidth="md" orientation={{ initial: "vertical", md: "horizontal" }}><DataList.Item><DataList.Label>Organization</DataList.Label><DataList.Value>Northstar Studio</DataList.Value></DataList.Item><DataList.Item><DataList.Label>Member since</DataList.Label><DataList.Value>May 2024</DataList.Value></DataList.Item></DataList.Root></Surface></Scenario>
      <Scenario {...dataListScenarios[2]}><Grid.Root columns={{ initial: 1, md: 3 }} gap="4"><Surface inset="lg"><DataList.Root size="sm"><DataList.Item><DataList.Label>Small</DataList.Label><DataList.Value>Compact facts</DataList.Value></DataList.Item></DataList.Root></Surface><Surface inset="lg"><ProfileFacts divide /></Surface><Surface inset="lg"><DataList.Root labelWidth="sm" orientation="horizontal" size="lg"><DataList.Item><DataList.Label>Large</DataList.Label><DataList.Value>Aligned facts</DataList.Value></DataList.Item></DataList.Root></Surface></Grid.Root></Scenario>
    </VStack>
  );
}
