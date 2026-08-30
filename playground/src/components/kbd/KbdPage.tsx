import { Kbd, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const kbdScenarios = [
  { id: "kbd.overview", number: 1, title: "Overview", description: "Native keyboard-input notation stays compact inside meaningful copy." },
  { id: "kbd.recipes", number: 2, title: "Variants and sizes", navigationTitle: "Recipes", description: "Four closed appearances and three sizes cover ordinary key notation without becoming controls." },
  { id: "kbd.sequence", number: 3, title: "Sequences and native output", navigationTitle: "Sequences", description: "Each key keeps its own native host while authored separators and wrapping remain visible and selectable." },
] as const satisfies readonly ScenarioDefinition[];

export function KbdPage() {
  return (
    <VStack data-component-page="kbd" gap="6">
      <Scenario {...kbdScenarios[0]}>
        <EvidenceSurface data-testid="kbd-overview" inset="lg"><Text as="p">Press <Kbd>F12</Kbd> to open developer tools.</Text></EvidenceSurface>
      </Scenario>
      <Scenario {...kbdScenarios[1]}>
        <VStack data-testid="kbd-recipes" gap="4">
          <EvidenceSurface inset="lg"><Text as="p">Raised <Kbd>Enter</Kbd></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Outline <Kbd variant="outline">Enter</Kbd></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Subtle <Kbd variant="subtle">Enter</Kbd></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Plain <Kbd variant="plain">Enter</Kbd></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Sizes <Kbd size="sm">Esc</Kbd> <Kbd>Tab</Kbd> <Kbd size="lg">Enter</Kbd></Text></EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...kbdScenarios[2]}>
        <EvidenceSurface data-testid="kbd-sequence" inset="lg">
          <Text as="p">Open commands with <Kbd aria-label="Control key" className="consumer-kbd" data-owner="playground" slot="key">Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>.</Text>
          <Text as="p" dir="rtl" lang="ar">اضغط <Kbd>Ctrl</Kbd> + <Kbd>P</Kbd> لفتح الأوامر.</Text>
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
