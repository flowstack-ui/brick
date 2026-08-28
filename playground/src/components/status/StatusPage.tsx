import { Grid, Status, Surface, VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const statusScenarios = [
  { id: "status.overview", number: 1, title: "Overview", description: "A passive state combines a decorative indicator with visible text." },
  { id: "status.tones", number: 2, title: "Semantic tones", navigationTitle: "Tones", description: "Semantic paint stays on the indicator while the label keeps normal readable text." },
  { id: "status.sizes", number: 3, title: "Sizes and composition", navigationTitle: "Sizes", description: "Closed sizes align Status with nearby metadata without adding live-region behavior." },
] as const satisfies readonly ScenarioDefinition[];

const tones = ["neutral", "accent", "info", "success", "warning", "danger"] as const;

export function StatusPage() {
  return (
    <VStack data-component-page="status" gap="6">
      <Scenario {...statusScenarios[0]}><Surface inset="lg"><Status.Root data-testid="status-overview" tone="success"><Status.Indicator /><Status.Label>Available</Status.Label></Status.Root></Surface></Scenario>
      <Scenario {...statusScenarios[1]}><Grid.Root columns={{ initial: 2, md: 3 }} gap="4">{tones.map((tone) => <Surface inset="md" key={tone}><Status.Root tone={tone}><Status.Indicator /><Status.Label>{tone}</Status.Label></Status.Root></Surface>)}</Grid.Root></Scenario>
      <Scenario {...statusScenarios[2]}><Surface inset="lg"><VStack align="start" gap="4"><Status.Root size="sm" tone="success"><Status.Indicator /><Status.Label>Small</Status.Label></Status.Root><Status.Root size="md" tone="warning"><Status.Indicator /><Status.Label>Medium</Status.Label></Status.Root><Status.Root size="lg" tone="danger"><Status.Indicator /><Status.Label>Large</Status.Label></Status.Root></VStack></Surface></Scenario>
    </VStack>
  );
}
