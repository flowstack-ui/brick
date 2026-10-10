import { PinInput, VStack } from "@flowstack-ui/brick";

export function PinInputSizes() {
  return (
    <VStack gap={6}>
      {(["sm", "md", "lg"] as const).map((value) => (
        <PinInput.Root key={value} length={4} size={value}>
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
