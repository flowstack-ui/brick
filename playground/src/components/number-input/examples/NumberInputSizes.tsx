import { Frame } from "@flowstack-ui/brick";
import { For, NumberInput, VStack } from "@flowstack-ui/brick";

export function NumberInputSizes() {
  return (
    <Frame maxInlineSize={200}>
      <VStack gap="4">
        <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
          {(size) => (
            <NumberInput.Root key={size} size={size} defaultValue={3}>
              <NumberInput.Input aria-label={size} />
              <NumberInput.Control />
            </NumberInput.Root>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
