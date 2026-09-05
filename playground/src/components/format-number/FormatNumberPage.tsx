import { FormatNumber, HStack, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const formatNumberScenarios = [{
  id: "format-number.formats",
  number: 1,
  title: "Common number formats",
  description: "Currency, percentage, and compact notation inherit surrounding typography.",
}] as const;

export function FormatNumberPage() {
  return (
    <VStack data-component-page="format-number" gap="6">
      <Scenario {...formatNumberScenarios[0]}>
        <Specimen label="Localized output">
          <HStack data-testid="format-number-output" gap="5" wrap>
            <Text><FormatNumber value={2499} formatOptions={{ style: "currency", currency: "USD" }} /></Text>
            <Text><FormatNumber value={0.42} formatOptions={{ style: "percent" }} /></Text>
            <Text><FormatNumber value={1200} formatOptions={{ notation: "compact" }} /></Text>
          </HStack>
        </Specimen>
      </Scenario>
    </VStack>
  );
}
