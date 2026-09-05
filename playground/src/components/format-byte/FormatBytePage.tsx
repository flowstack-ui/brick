import { FormatByte, HStack, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const formatByteScenarios = [{
  id: "format-byte.formats",
  number: 1,
  title: "Byte and bit formats",
  description: "Decimal and binary scaling use locale-aware platform units.",
}] as const;

export function FormatBytePage() {
  return (
    <VStack data-component-page="format-byte" gap="6">
      <Scenario {...formatByteScenarios[0]}>
        <Specimen label="Localized quantities">
          <HStack data-testid="format-byte-output" gap="5" wrap>
            <Text><FormatByte value={1450} /></Text>
            <Text><FormatByte value={2048} unitSystem="binary" /></Text>
            <Text><FormatByte value={1450} unit="bit" unitDisplay="long" /></Text>
          </HStack>
        </Specimen>
      </Scenario>
    </VStack>
  );
}
