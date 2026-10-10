import { Toggle, HStack, For } from "@flowstack-ui/brick";

export function ToggleTones() {
  return (
    <HStack gap="3" wrap>
      <For each={["neutral", "accent", "contrast"] as const}>
        {(tone) => (
          <Toggle tone={tone} variant="solid" defaultPressed>
            {tone}
          </Toggle>
        )}
      </For>
    </HStack>
  );
}
