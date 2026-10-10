import { Collapsible, For, VStack } from "@flowstack-ui/brick";

export function CollapsibleRadius() {
  return (
    <VStack gap="4">
      <For each={["none", "sm", "control"] as const}>
        {(radius) => (
          <Collapsible.Root key={radius} radius={radius} variant="outline">
            <Collapsible.Trigger>
              {radius}
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.ContentInner>
                Theme-owned radius
              </Collapsible.ContentInner>
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </For>
    </VStack>
  );
}
