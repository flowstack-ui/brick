import { Frame } from "@flowstack-ui/brick";
import { For, NumberInput, VStack } from "@flowstack-ui/brick";

export function NumberInputVariants() {
  return (
    <Frame maxInlineSize={200}>
      <VStack gap="4">
        <For
          each={
            [
              "outline",
              "surface",
              "soft",
              "subtle",
              "ghost",
              "plain",
              "underline",
            ] as const
          }
        >
          {(variant) => (
            <NumberInput.Root key={variant} variant={variant} defaultValue={3}>
              <NumberInput.Input aria-label={variant} />
              <NumberInput.Control />
            </NumberInput.Root>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
