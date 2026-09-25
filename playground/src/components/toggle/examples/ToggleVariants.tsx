import { Toggle, HStack, VStack, For } from "@flowstack-ui/brick";

export function ToggleVariants() {
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
            <Toggle variant={variant}>{variant}</Toggle>
            <Toggle variant={variant} defaultPressed>
              {variant}
            </Toggle>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
