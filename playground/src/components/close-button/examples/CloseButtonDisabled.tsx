import { CloseButton, For, HStack } from "@flowstack-ui/brick";

export function CloseButtonDisabled() {
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
            disabled
            variant={variant}
            aria-label={`Unavailable ${variant}`}
          ></CloseButton>
        )}
      </For>
    </HStack>
  );
}
