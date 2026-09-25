import {
  Button,
  ButtonGroup,
  EmptyState,
  Icon,
  VStack,
} from "@flowstack-ui/brick";
import { ShoppingCart } from "lucide-react";
export function EmptyStateActions() {
  return (
    <EmptyState.Root>
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
        <ButtonGroup size="md" wrap="wrap">
          <Button variant="outline" tone="neutral" href="#with-list">
            Learn more
          </Button>
          <Button href="#with-list">Browse products</Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
