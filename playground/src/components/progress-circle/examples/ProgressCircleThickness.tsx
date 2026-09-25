import { HStack, For, ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleThickness() {
  return (
    <HStack gap="6">
      <For each={["thin", "regular", "thick"] as const}>
        {(thickness) => (
          <ProgressCircle.Root
            key={thickness}
            value={60}
            size="lg"
            thickness={thickness}
          >
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Indicator />
            </ProgressCircle.Circle>
            <ProgressCircle.Label>{thickness}</ProgressCircle.Label>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  );
}
