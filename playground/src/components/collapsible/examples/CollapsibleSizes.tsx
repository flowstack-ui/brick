import { Collapsible, For, VStack } from "@flowstack-ui/brick";

export function CollapsibleSizes() {
  return (
    <VStack gap="4">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Collapsible.Root key={size} size={size} variant="outline">
            <Collapsible.Trigger>
              {size}
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.ContentInner>
                Coordinated trigger and content density
              </Collapsible.ContentInner>
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </For>
    </VStack>
  );
}
