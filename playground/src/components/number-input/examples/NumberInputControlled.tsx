import { Frame } from "@flowstack-ui/brick";
import { useState } from "react";
import { NumberInput, Text, VStack } from "@flowstack-ui/brick";

export function NumberInputControlled() {
  const [value, setValue] = useState<number | null>(3);
  const [text, setText] = useState("3");
  return (
    <Frame maxInlineSize={200}>
      <VStack gap="4">
        <NumberInput.Root value={value} onValueChange={setValue}>
          <NumberInput.Input aria-label="Numeric value" />
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Root
          valueMode="string"
          value={text}
          onValueChange={(details) => setText(details.value)}
        >
          <NumberInput.Input aria-label="String value" />
          <NumberInput.Control />
        </NumberInput.Root>
        <Text>
          Numeric: {String(value)}; text: {text}
        </Text>
      </VStack>
    </Frame>
  );
}
