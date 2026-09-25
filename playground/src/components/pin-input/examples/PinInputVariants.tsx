import { PinInput, VStack } from "@flowstack-ui/brick";

export function PinInputVariants() {
  return (
    <VStack gap={6}>
      {(
        [
          "outline",
          "surface",
          "soft",
          "subtle",
          "ghost",
          "plain",
          "underline",
        ] as const
      ).map((value) => (
        <PinInput.Root key={value} length={4} variant={value}>
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
