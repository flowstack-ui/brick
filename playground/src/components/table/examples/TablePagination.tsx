import { useState } from "react";
import {
  For,
  FormatNumber,
  Table,
  Pagination,
  VStack,
} from "@flowstack-ui/brick";
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
const inventory = [
  ...products,
  { id: 6, name: "Monitor", category: "Electronics", price: 299.99 },
  { id: 7, name: "Keyboard", category: "Accessories", price: 79.99 },
  { id: 8, name: "Lamp", category: "Furniture", price: 39.99 },
  { id: 9, name: "Toaster", category: "Home Appliances", price: 34.99 },
  { id: 10, name: "Mouse", category: "Accessories", price: 24.99 },
];
export function TablePagination() {
  const [page, setPage] = useState(1);
  const visible = inventory.slice((page - 1) * 5, page * 5);
  return (
    <VStack gap={4}>
      <Table.Root aria-label="Product inventory">
        <Table.Header>
          <Table.Row>
            <Table.Head>Product</Table.Head>
            <Table.Head>Category</Table.Head>
            <Table.Head numeric>Price</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={visible}>
            {(product) => (
              <Table.Row key={product.id}>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell numeric>
                  <FormatNumber value={product.price} />
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
      <Pagination.Root
        aria-label="Product pages"
        page={page}
        onPageChange={setPage}
        totalPages={2}
        size="sm"
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
