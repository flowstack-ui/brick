import { EmptyState, Icon, List, Text, VStack } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function EmptyStateList() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon size="inherit">
            <Search />
          </Icon>
        </EmptyState.Indicator>
        <VStack gap={2}>
          <EmptyState.Title>No results found</EmptyState.Title>
          <EmptyState.Description>
            Try adjusting your search.
          </EmptyState.Description>
        </VStack>
        <Text as="div" align="start">
          <List.Root density="none" inset="none" gap={2}>
            <List.Item>Check for spelling errors.</List.Item>
            <List.Item>Use more general keywords.</List.Item>
            <List.Item>Remove a filter and try again.</List.Item>
          </List.Root>
        </Text>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
