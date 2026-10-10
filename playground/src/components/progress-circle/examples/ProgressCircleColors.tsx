import { HStack, For, ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleColors() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={["accent", "success", "warning", "danger"] as const}>
        {(tone) => (
          <ProgressCircle.Root key={tone} value={60} tone={tone}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Indicator />
            </ProgressCircle.Circle>
            <ProgressCircle.Label>{tone}</ProgressCircle.Label>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  );
}
