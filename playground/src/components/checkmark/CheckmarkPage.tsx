import { Checkmark, HStack, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const checkmarkScenarios = [{
  id: "checkmark.recipes",
  number: 1,
  title: "States and recipes",
  description: "Passive state marks keep square geometry across recipes and sizes.",
}] as const;

export function CheckmarkPage() {
  return (
    <VStack data-component-page="checkmark" gap="6">
      <Scenario {...checkmarkScenarios[0]}>
        <Specimen label="Checked, mixed, and disabled">
          <HStack data-testid="checkmark-output" gap="4">
            <Checkmark checked />
            <Checkmark indeterminate variant="outline" />
            <Checkmark checked variant="soft" tone="success" size="sm" />
            <Checkmark disabled />
          </HStack>
        </Specimen>
      </Scenario>
    </VStack>
  );
}
