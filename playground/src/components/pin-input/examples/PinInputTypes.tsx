import { PinInput, VStack } from "@flowstack-ui/brick";

export function PinInputTypes() {
  return (
    <VStack gap={6}>
      {(["numeric", "alphabetic", "alphanumeric"] as const).map((value) => (
        <PinInput.Root key={value} length={4} type={value}>
          <PinInput.Label>{value}</PinInput.Label>
          <PinInput.Control>
            {Array.from({ length: 4 }, (_, index) => (
              <PinInput.Input key={index} index={index} />
            ))}
          </PinInput.Control>
        </PinInput.Root>
      ))}
    </VStack>
  );
}
