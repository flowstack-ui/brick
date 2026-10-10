import { useState } from "react";
import { Button, Table } from "@flowstack-ui/brick";
const products = [
  { id: "laptop", name: "Laptop", price: 999 },
  { id: "monitor", name: "Monitor", price: 249 },
  { id: "keyboard", name: "Keyboard", price: 75 },
];
export function TableSorting() {
  const [ascending, setAscending] = useState(true);
  const sorted = [...products].sort(
    (a, b) => (a.price - b.price) * (ascending ? 1 : -1),
  );
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Product</Table.Head>
          <Table.Head
            numeric
            sortDirection={ascending ? "ascending" : "descending"}
          >
            <Button
              size="sm"
              variant="plain"
              endIcon={<Table.SortIndicator />}
              onClick={() => setAscending(!ascending)}
            >
              Price
            </Button>
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sorted.map((product) => (
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell numeric>${product.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
