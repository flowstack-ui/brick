import { useState } from "react";
import { PinInput, VStack, Text } from "@flowstack-ui/brick";

export function PinInputControlled() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <VStack gap={3}>
      <PinInput.Root
        length={4}
        value={value}
        onValueChange={(details) => setValue(details.value)}
        aria-label="Controlled code"
      >
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <Text>{value.filter(Boolean).length} of 4 filled</Text>
    </VStack>
  );
}
