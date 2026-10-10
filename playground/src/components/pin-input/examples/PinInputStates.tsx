import { PinInput, VStack } from "@flowstack-ui/brick";

export function PinInputStates() {
  return (
    <VStack gap={6}>
      <PinInput.Root length={4} disabled aria-label="Disabled code">
        <PinInput.Label>Disabled</PinInput.Label>
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <PinInput.Root
        length={4}
        readOnly
        defaultValue={["1", "2", "3", "4"]}
        aria-label="Read-only code"
      >
        <PinInput.Label>Read-only</PinInput.Label>
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <PinInput.Root
        length={4}
        invalid
        variant="underline"
        aria-label="Invalid underline"
      >
        <PinInput.Label>Invalid underline</PinInput.Label>
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
    </VStack>
  );
}
