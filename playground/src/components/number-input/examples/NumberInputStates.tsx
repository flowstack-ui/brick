import { Frame } from "@flowstack-ui/brick";
import { NumberInput, VStack } from "@flowstack-ui/brick";

export function NumberInputStates() {
  return (
    <Frame maxInlineSize={200}>
      <VStack gap="4">
        <NumberInput.Root defaultValue={3} disabled>
          <NumberInput.Input aria-label="Disabled" />
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Root defaultValue={3} readOnly>
          <NumberInput.Input aria-label="Read only" />
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Root defaultValue={3} invalid>
          <NumberInput.Input aria-label="Invalid" />
          <NumberInput.Control />
        </NumberInput.Root>
      </VStack>
    </Frame>
  );
}
