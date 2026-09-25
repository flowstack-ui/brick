import {
  Button,
  HStack,
  Pagination,
  usePagination,
  VStack,
} from "@flowstack-ui/brick";
export function PaginationController() {
  const pagination = usePagination({ count: 100, defaultPage: 3 });
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => pagination.setPage(1)}
        >
          Reset page
        </Button>
      </HStack>
      <Pagination.RootProvider
        aria-label="Controller result pages"
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
