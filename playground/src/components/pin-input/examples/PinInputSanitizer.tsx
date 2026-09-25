import { useState } from "react";
import { PinInput, VStack, Text } from "@flowstack-ui/brick";

export function PinInputSanitizer() {
  const [message, setMessage] = useState("Paste 12-34");
  return (
    <VStack gap={3}>
      <PinInput.Root
        length={4}
        sanitizeValue={(value) => value.replace(/[\s-]/g, "")}
        onValueInvalid={() => setMessage("Only digits are accepted.")}
        aria-label="Formatted code"
      >
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <Text role="status">{message}</Text>
    </VStack>
  );
}
