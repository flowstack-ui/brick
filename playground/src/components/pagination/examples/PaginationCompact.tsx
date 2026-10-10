import { HStack, Pagination } from "@flowstack-ui/brick";
export function PaginationCompact() {
  return (
    <Pagination.Root aria-label="Compact result pages" count={100}>
      <HStack gap={4}>
        <Pagination.Previous />
        <Pagination.PageText />
        <Pagination.Next />
      </HStack>
    </Pagination.Root>
  );
}
