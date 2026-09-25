import { CloseButton, For, HStack } from "@flowstack-ui/brick";

export function CloseButtonTones() {
  return (
    <HStack gap="3" wrap>
      <For
        each={
          [
            "neutral",
            "contrast",
            "accent",
            "info",
            "success",
            "warning",
            "danger",
          ] as const
        }
      >
        {(tone) => (
          <CloseButton
            variant="subtle"
            tone={tone}
            aria-label={`Action ${tone}`}
          ></CloseButton>
        )}
      </For>
    </HStack>
  );
}
