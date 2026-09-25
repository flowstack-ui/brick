import { Checkbox, For, HStack } from "@flowstack-ui/brick";
export function CheckboxTones() {
  return (
    <HStack gap="6" wrap>
      <For
        each={
          [
            "neutral",
            "accent",
            "contrast",
            "success",
            "warning",
            "danger",
            "info",
          ] as const
        }
      >
        {(tone) => (
          <Checkbox key={tone} tone={tone} defaultChecked>
            {tone}
          </Checkbox>
        )}
      </For>
    </HStack>
  );
}
