import { useState } from "react";
import { PinInput, VStack, Text } from "@flowstack-ui/brick";

export function PinInputCompletion() {
  const [done, setDone] = useState(false);
  return (
    <VStack gap={3}>
      <PinInput.Root
        length={4}
        blurOnComplete
        onComplete={() => setDone(true)}
        aria-label="Completion code"
      >
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <Text role="status">
        {done ? "Code entered" : "Waiting for four digits"}
      </Text>
    </VStack>
  );
}
