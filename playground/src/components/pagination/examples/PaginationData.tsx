import {
  For,
  Pagination,
  Text,
  usePagination,
  VStack,
} from "@flowstack-ui/brick";
const records = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Record ${index + 1}`,
}));
export function PaginationData() {
  const pagination = usePagination({
    count: records.length,
    defaultPageSize: 3,
  });
  return (
    <VStack gap={4}>
      <For each={pagination.slice(records)}>
        {(record) => <Text key={record.id}>{record.name}</Text>}
      </For>
      <Pagination.RootProvider
        aria-label="Data result pages"
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
