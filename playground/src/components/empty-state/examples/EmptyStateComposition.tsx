import { Card, EmptyState, Icon, VStack } from "@flowstack-ui/brick";
import { ShoppingCart } from "lucide-react";
export function EmptyStateComposition() {
  return (
    <Card.Root variant="outline">
      <EmptyState.Root asChild>
        <section aria-labelledby="empty-cart-title">
          <EmptyState.Content>
            <EmptyState.Indicator>
              <Icon size="inherit">
                <ShoppingCart />
              </Icon>
            </EmptyState.Indicator>
            <VStack gap={2}>
              <EmptyState.Title as="h2" id="empty-cart-title">
                Your cart is empty
              </EmptyState.Title>
              <EmptyState.Description>
                The Card owns the boundary; the empty state owns the message.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </section>
      </EmptyState.Root>
    </Card.Root>
  );
}
