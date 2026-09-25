import { For, HStack, Kbd } from "@flowstack-ui/brick";
export function KbdTones() {
  return (
    <HStack gap="4" wrap="wrap">
      <For
        each={
          ["neutral", "accent", "info", "success", "warning", "danger"] as const
        }
      >
        {(tone) => (
          <Kbd key={tone} tone={tone}>
            {tone}
          </Kbd>
        )}
      </For>
    </HStack>
  );
}
