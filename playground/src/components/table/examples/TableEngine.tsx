import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Button, Table } from "@flowstack-ui/brick";
type Product = { name: string; price: number };
// Optional application dependency: @tanstack/react-table@8.21.3.
export function TableEngine() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const data = useMemo(
    () => [
      { name: "Laptop", price: 999 },
      { name: "Monitor", price: 249 },
      { name: "Keyboard", price: 75 },
    ],
    [],
  );
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      { accessorKey: "name", header: "Product" },
      { accessorKey: "price", header: "Price" },
    ],
    [],
  );
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Table.Root>
      <Table.Header>
        {table.getHeaderGroups().map((group) => (
          <Table.Row key={group.id}>
            {group.headers.map((header) => (
              <Table.Head
                key={header.id}
                sortDirection={
                  header.column.getIsSorted() === "asc"
                    ? "ascending"
                    : header.column.getIsSorted() === "desc"
                      ? "descending"
                      : "none"
                }
              >
                <Button
                  size="sm"
                  variant="plain"
                  endIcon={<Table.SortIndicator />}
                  onClick={() => header.column.toggleSorting()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Button>
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
