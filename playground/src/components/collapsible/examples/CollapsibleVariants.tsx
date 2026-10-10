import { Collapsible, For, VStack } from "@flowstack-ui/brick";

export function CollapsibleVariants() {
  return (
    <VStack gap="4">
      <For each={["plain", "soft", "outline"] as const}>
        {(variant) => (
          <Collapsible.Root key={variant} variant={variant} defaultOpen>
            <Collapsible.Trigger>
              {variant}
              <Collapsible.Indicator />
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Collapsible.ContentInner>
                Containing surface recipe
              </Collapsible.ContentInner>
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </For>
    </VStack>
  );
}
