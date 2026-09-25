import {
  Button,
  FormatNumber,
  LocaleProvider,
  Pagination,
} from "@flowstack-ui/brick";
export function PaginationCustomization() {
  return (
    <LocaleProvider locale="de-DE">
      <Pagination.Root
        aria-label="Customization result pages"
        count={1000}
        pageSize={1}
        defaultPage={500}
        size="sm"
        radius="full"
        tone="accent"
      >
        <Pagination.List>
          <Pagination.Previous />
          <Pagination.Items
            ellipsis="⋯"
            render={({ page, isCurrent }) => (
              <Button
                size="sm"
                radius="full"
                variant={isCurrent ? "solid" : "ghost"}
              >
                <FormatNumber value={page} />
              </Button>
            )}
          />
          <Pagination.Next />
        </Pagination.List>
      </Pagination.Root>
    </LocaleProvider>
  );
}
