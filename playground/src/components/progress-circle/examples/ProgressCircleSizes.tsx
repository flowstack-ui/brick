import { HStack, For, ProgressCircle } from "@flowstack-ui/brick";

export function ProgressCircleSizes() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={["xs", "sm", "md", "lg", "xl"] as const}>
        {(size) => (
          <ProgressCircle.Root key={size} value={60} size={size}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Indicator />
            </ProgressCircle.Circle>
            <ProgressCircle.Label>{size}</ProgressCircle.Label>
          </ProgressCircle.Root>
        )}
      </For>
    </HStack>
  );
}
