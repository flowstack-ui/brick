import { HStack, For, ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleRounded() {
  return (
    <HStack gap="8">
      <For each={["butt", "round"] as const}>
        {(cap) => (
          <ProgressCircle.Root key={cap} value={60} cap={cap}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Indicator />
            </ProgressCircle.Circle>
            <ProgressCircle.Label>{cap}</ProgressCircle.Label>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  );
}
