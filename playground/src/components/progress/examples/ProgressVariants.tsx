import { Frame, VStack, For, Progress } from "@flowstack-ui/brick";

export function ProgressVariants() {
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="5">
        <For each={["outline", "subtle"] as const}>
          {(variant) => (
            <Progress.Root key={variant} variant={variant} value={60}>
              <Progress.Label>{variant}</Progress.Label>
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
