import { EmptyState, For, Icon, VStack } from "@flowstack-ui/brick";
import { ShoppingCart } from "lucide-react";
export function EmptyStateSizes() {
  return (
    <VStack gap={8}>
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <EmptyState.Root key={size} size={size}>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <Icon size="inherit">
                  <ShoppingCart />
                </Icon>
              </EmptyState.Indicator>
              <VStack gap={2}>
                <EmptyState.Title>{size}</EmptyState.Title>
                <EmptyState.Description>
                  Your cart is empty. Add something you love.
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </For>
    </VStack>
  );
}
