import { Frame } from "@flowstack-ui/brick";
import { NumberInput, VStack } from "@flowstack-ui/brick";

export function NumberInputFormatting() {
  return (
    <Frame maxInlineSize={200}>
      <VStack gap="4">
        <NumberInput.Root
          defaultValue={1234.5}
          formatOptions={{ style: "currency", currency: "USD" }}
        >
          <NumberInput.Input aria-label="Price" />
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Root
          defaultValue={0.25}
          step={0.01}
          formatOptions={{ style: "percent" }}
        >
          <NumberInput.Input aria-label="Rate" />
          <NumberInput.Control />
        </NumberInput.Root>
        <NumberInput.Root
          defaultValue={10}
          formatOptions={{ style: "unit", unit: "kilometer" }}
        >
          <NumberInput.Input aria-label="Distance" />
          <NumberInput.Control />
        </NumberInput.Root>
      </VStack>
    </Frame>
  );
}
