import { Button, For, HStack } from "@flowstack-ui/brick";
export function ButtonTones() {
  return (
    <HStack gap="3" wrap="wrap">
      <For
        each={
          [
            "accent",
            "neutral",
            "contrast",
            "info",
            "success",
            "warning",
            "danger",
          ] as const
        }
      >
        {(tone) => (
          <Button key={tone} tone={tone}>
            {tone}
          </Button>
        )}
      </For>
    </HStack>
  );
}
