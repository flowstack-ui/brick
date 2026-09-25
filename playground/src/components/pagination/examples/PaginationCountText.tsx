import { HStack, Pagination } from "@flowstack-ui/brick";
export function PaginationCountText() {
  return (
    <Pagination.Root
      aria-label="Count Text result pages"
      count={53}
      defaultPage={3}
    >
      <HStack gap={4}>
        <Pagination.PageText format="long" />
        <Pagination.Previous />
        <Pagination.Next />
      </HStack>
    </Pagination.Root>
  );
}
