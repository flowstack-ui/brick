import { HStack, Radiomark, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const radiomarkScenarios = [{
  id: "radiomark.recipes",
  number: 1,
  title: "States and recipes",
  description: "Passive selection marks keep circular geometry across recipes and sizes.",
}] as const;

export function RadiomarkPage() {
  return (
    <VStack data-component-page="radiomark" gap="6">
      <Scenario {...radiomarkScenarios[0]}>
        <Specimen label="Selected, unselected, and disabled">
          <HStack data-testid="radiomark-output" gap="4">
            <Radiomark checked />
            <Radiomark variant="outline" />
            <Radiomark checked variant="soft" tone="info" size="sm" />
            <Radiomark disabled />
          </HStack>
        </Specimen>
      </Scenario>
    </VStack>
  );
}
