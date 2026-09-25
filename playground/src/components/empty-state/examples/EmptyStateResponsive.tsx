import { EmptyState, Icon, VStack } from "@flowstack-ui/brick";
import { ShoppingCart } from "lucide-react";
export function EmptyStateResponsive() {
  return (
    <EmptyState.Root
      size={{ initial: "sm", md: "md", lg: "lg", xl: "md" }}
      align={{ initial: "center", md: "start", xl: "center" }}
    >
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon size="inherit">
            <ShoppingCart />
          </Icon>
        </EmptyState.Indicator>
        <VStack gap={2}>
          <EmptyState.Title>Your cart is empty</EmptyState.Title>
          <EmptyState.Description>
            Explore our products and add something you love.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
