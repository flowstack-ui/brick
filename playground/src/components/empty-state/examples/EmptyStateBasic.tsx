import { EmptyState, Icon, VStack } from "@flowstack-ui/brick";
import { ShoppingCart } from "lucide-react";
export function EmptyStateBasic() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon size="inherit">
            <ShoppingCart />
          </Icon>
        </EmptyState.Indicator>
        <VStack gap={2}>
          <EmptyState.Title as="h2">Your cart is empty</EmptyState.Title>
          <EmptyState.Description>
            Explore our products and add something you love.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
