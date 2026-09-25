import { Frame, VStack, For, Progress } from "@flowstack-ui/brick";

export function ProgressColors() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="5">
        <For each={["accent", "success", "warning", "danger"] as const}>
          {(tone) => (
            <Progress.Root key={tone} tone={tone} value={60}>
              <Progress.Label>{tone}</Progress.Label>
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
