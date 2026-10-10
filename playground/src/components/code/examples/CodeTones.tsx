import { Code, For, HStack } from "@flowstack-ui/brick";
export function CodeTones() {
  return (
    <HStack gap="4" wrap="wrap">
      <For
        each={
          [
            "neutral",
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
          <Code key={tone} tone={tone}>
            {tone}
          </Code>
        )}
      </For>
    </HStack>
  );
}
