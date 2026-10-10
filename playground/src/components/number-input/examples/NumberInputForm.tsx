import { Frame } from "@flowstack-ui/brick";
import { useState } from "react";
import { Button, HStack, NumberInput, Text, VStack } from "@flowstack-ui/brick";

export function NumberInputForm() {
  const [result, setResult] = useState("No submission");
  return (
    <Frame maxInlineSize={200}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(String(new FormData(event.currentTarget).get("quantity")));
        }}
      >
        <VStack gap="4">
          <NumberInput.Root name="quantity" defaultValue={3} required>
            <NumberInput.Input aria-label="Order quantity" />
            <NumberInput.Control />
          </NumberInput.Root>
          <HStack gap="3">
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text>{result}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
