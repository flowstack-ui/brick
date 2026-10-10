import { For, Pagination, Text, VStack } from "@flowstack-ui/brick";
export function PaginationBoundaries() {
  return (
    <VStack gap={6}>
      <For each={[false, true]}>
        {(disabled) => (
          <VStack key={String(disabled)} gap={2}>
            <Text tone="secondary">
              {disabled ? "Disabled" : "First and last controls"}
            </Text>
            <Pagination.Root
              aria-label={
                disabled ? "Disabled result pages" : "Boundaries result pages"
              }
              disabled={disabled}
              count={100}
              defaultPage={4}
            >
              <Pagination.List>
                <Pagination.First />
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
                <Pagination.Last />
              </Pagination.List>
            </Pagination.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
