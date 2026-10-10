import { Pagination } from "@flowstack-ui/brick";
export function PaginationVariants() {
  return (
    <Pagination.Root
      aria-label="Variants result pages"
      count={100}
      variant="outline"
      selectedVariant="solid"
      tone="accent"
    >
      <Pagination.List>
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
      </Pagination.List>
    </Pagination.Root>
  );
}
