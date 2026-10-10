import { ButtonGroup, Pagination } from "@flowstack-ui/brick";
export function PaginationAttached() {
  return (
    <Pagination.Root
      aria-label="Attached result pages"
      count={30}
      variant="outline"
      selectedVariant="solid"
    >
      <ButtonGroup attached>
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
      </ButtonGroup>
    </Pagination.Root>
  );
}
