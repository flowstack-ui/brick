import { For, Pagination, VStack, Text } from "@flowstack-ui/brick";
export function PaginationSizes() {
  return (
    <VStack gap={6}>
      <For each={["xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <VStack key={size} gap={2}>
            <Text tone="secondary">{size}</Text>
            <Pagination.Root
              aria-label={`${size} result pages`}
              count={50}
              size={size}
            >
              <Pagination.List>
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
              </Pagination.List>
            </Pagination.Root>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
