import { Pagination } from "@flowstack-ui/brick";
export function PaginationLinks() {
  const value =
    typeof window === "undefined"
      ? 1
      : Number(new URLSearchParams(window.location.search).get("page") ?? 1);
  const page =
    Number.isSafeInteger(value) && value >= 1 && value <= 10 ? value : 1;
  return (
    <Pagination.Root
      aria-label="Links result pages"
      count={100}
      page={page}
      getPageHref={({ page }) => `/pagination?page=${page}#links`}
    >
      <Pagination.List>
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
      </Pagination.List>
    </Pagination.Root>
  );
}
