import { Pagination } from "@flowstack-ui/brick";
export function PaginationBasic() {
  return (
    <Pagination.Root aria-label="Basic result pages" count={100}>
      <Pagination.List>
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
      </Pagination.List>
    </Pagination.Root>
  );
}
