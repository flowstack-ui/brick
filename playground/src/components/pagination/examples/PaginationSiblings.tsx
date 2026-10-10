import { Pagination } from "@flowstack-ui/brick";
export function PaginationSiblings() {
  return (
    <Pagination.Root
      aria-label="Siblings result pages"
      count={100}
      pageSize={5}
      defaultPage={10}
      siblingCount={2}
    >
      <Pagination.List>
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
      </Pagination.List>
    </Pagination.Root>
  );
}
