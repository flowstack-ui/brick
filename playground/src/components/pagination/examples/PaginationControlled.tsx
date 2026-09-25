import { useState } from "react";
import { Pagination, Text, VStack } from "@flowstack-ui/brick";
export function PaginationControlled() {
  const [page, setPage] = useState(1);
  return (
    <VStack gap={4}>
      <Text>Page {page}</Text>
      <Pagination.Root
        aria-label="Controlled result pages"
        count={50}
        page={page}
        onPageChange={setPage}
      >
        <Pagination.List>
          <Pagination.Previous />
          <Pagination.Items />
          <Pagination.Next />
        </Pagination.List>
      </Pagination.Root>
    </VStack>
  );
}
