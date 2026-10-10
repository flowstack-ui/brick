import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Button,
  DataGrid,
  HStack,
  Input,
  Text,
  VStack,
} from "@flowstack-ui/brick";

// Optional application dependency: @tanstack/react-table@8.21.3.
type Project = { id: string; name: string; hours: number };
export function DataGridEngine() {
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const data = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: `project-${i}`,
        name: `Project ${i + 1}`,
        hours: 8 + i * 2,
      })),
    [],
  );
  const columns = useMemo<ColumnDef<Project>[]>(
    () => [
      { accessorKey: "name", header: "Project" },
      { accessorKey: "hours", header: "Hours" },
    ],
    [],
  );
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row.id,
    state: { sorting, globalFilter: query },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });
  const offset = table.getState().pagination.pageIndex * 5;
  return (
    <VStack gap={4}>
      <Input
        aria-label="Filter projects"
        placeholder="Filter projects…"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          table.setPageIndex(0);
        }}
      />
      <DataGrid.Root
        aria-label="Project planning"
        rowCount={table.getFilteredRowModel().rows.length + 1}
        columnCount={2}
      >
        <DataGrid.Header>
          {table.getHeaderGroups().map((group) => (
            <DataGrid.Row key={group.id} rowIndex={1}>
              {group.headers.map((header, i) => (
                <DataGrid.ColumnHeader
                  key={header.id}
                  columnIndex={i + 1}
                  sortDirection={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                  }
                  onAction={() => header.column.toggleSorting()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  <DataGrid.SortIndicator />
                </DataGrid.ColumnHeader>
              ))}
            </DataGrid.Row>
          ))}
        </DataGrid.Header>
        <DataGrid.Body>
          {table.getRowModel().rows.map((row, index) => (
            <DataGrid.Row
              key={row.id}
              value={row.id}
              rowIndex={offset + index + 2}
            >
              {row.getVisibleCells().map((cell, i) => (
                <DataGrid.Cell key={cell.id} columnIndex={i + 1}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </DataGrid.Cell>
              ))}
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </DataGrid.Root>
      {table.getRowModel().rows.length === 0 && (
        <Text role="status">No matching projects.</Text>
      )}
      <HStack gap={3}>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <Text variant="body-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {Math.max(1, table.getPageCount())}
        </Text>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
}
