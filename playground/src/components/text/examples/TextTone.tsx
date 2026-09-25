import { For, Text, VStack } from "@flowstack-ui/brick";

export function TextTone() {
  return (
    <VStack gap={3}>
      <For
        each={
          [
            "primary",
            "secondary",
            "muted",
            "accent",
            "info",
            "success",
            "warning",
            "danger",
            "inherit",
          ] as const
        }
      >
        {(tone) => (
          <Text key={tone} tone={tone}>
            {tone}
          </Text>
        )}
      </For>
    </VStack>
  );
}
