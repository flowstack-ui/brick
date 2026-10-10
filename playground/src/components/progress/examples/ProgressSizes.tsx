import { Frame, VStack, For, Progress } from "@flowstack-ui/brick";

export function ProgressSizes() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="5">
        <For each={["xs", "sm", "md", "lg", "xl"] as const}>
          {(size) => (
            <Progress.Root key={size} size={size} value={60}>
              <Progress.Label>{size}</Progress.Label>
              <Progress.Track>
                <Progress.Indicator />
              </Progress.Track>
            </Progress.Root>
          )}
        </For>
      </VStack>
    </Frame>
  );
}
