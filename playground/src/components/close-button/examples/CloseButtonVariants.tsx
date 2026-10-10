import { CloseButton, For, HStack } from "@flowstack-ui/brick";

export function CloseButtonVariants() {
  return (
    <HStack gap="3" wrap>
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
          <CloseButton
            variant={variant}
            aria-label={`Action ${variant}`}
          ></CloseButton>
        )}
      </For>
    </HStack>
  );
}
