import { useState } from "react";
import { PinInput, VStack, HStack, Text, Button } from "@flowstack-ui/brick";

export function PinInputNativeForm() {
  const [message, setMessage] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(
          new FormData(event.currentTarget).get("code")
            ? "Code submitted"
            : "No code",
        );
      }}
      onReset={() => setMessage("")}
    >
      <VStack gap={4}>
        <PinInput.Root
          length={4}
          name="code"
          required
          aria-label="Native form code"
        >
          <PinInput.Control>
            {Array.from({ length: 4 }, (_, index) => (
              <PinInput.Input key={index} index={index} />
            ))}
          </PinInput.Control>
        </PinInput.Root>
        <HStack gap={3}>
          <Button type="submit">Verify</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text role="status">{message}</Text>
      </VStack>
    </form>
  );
}
