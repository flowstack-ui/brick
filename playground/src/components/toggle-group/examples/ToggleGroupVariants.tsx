import { ToggleGroup, HStack, VStack, For } from "@flowstack-ui/brick";

export function ToggleGroupVariants() {
  return (
    <VStack gap="4">
      <For
        each={
          [
            "solid",
            "soft",
            "subtle",
            "surface",
            "outline",
            "ghost",
            "plain",
          ] as const
        }
      >
        {(variant) => (
          <HStack gap="3">
            <ToggleGroup.Root
              variant={variant}
              aria-label={`variant: ${variant}`}
            >
              <ToggleGroup.Item value="bold">{variant} 1</ToggleGroup.Item>
              <ToggleGroup.Item value="italic">{variant} 2</ToggleGroup.Item>
            </ToggleGroup.Root>
            <ToggleGroup.Root
              variant={variant}
              defaultValue="bold"
              aria-label={`variant: ${variant}`}
            >
              <ToggleGroup.Item value="bold">{variant} 1</ToggleGroup.Item>
              <ToggleGroup.Item value="italic">{variant} 2</ToggleGroup.Item>
            </ToggleGroup.Root>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
