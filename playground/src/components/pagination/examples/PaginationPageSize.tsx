import {
  For,
  HStack,
  NativeSelect,
  Pagination,
  usePagination,
  VStack,
} from "@flowstack-ui/brick";
export function PaginationPageSize() {
  const pagination = usePagination({ count: 100, defaultPageSize: 10 });
  return (
    <VStack gap={4}>
      <HStack gap={4}>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            aria-label="Rows per page"
            value={pagination.pageSize}
            onChange={(event) =>
              pagination.setPageSize(Number(event.target.value))
            }
          >
            <For each={[5, 10, 25]}>
              {(size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              )}
            </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </HStack>
      <Pagination.RootProvider
        aria-label="Page Size result pages"
        value={pagination}
      >
        <Pagination.List>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.List>
      </Pagination.RootProvider>
    </VStack>
  );
}
