import { For, FormatNumber, Table, Text, VStack } from "@flowstack-ui/brick";
const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
export function TableSurfaces() {
  return (
    <VStack gap={8}>
      <For each={["transparent", "base"] as const}>
        {(value) => (
          <VStack key={value} gap={3}>
            <Text>surface: {value}</Text>
            <Table.Root aria-label="Product inventory" surface={value}>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Product</Table.Head>
                  <Table.Head>Category</Table.Head>
                  <Table.Head numeric>Price</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <For each={products}>
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
          </VStack>
        )}
      </For>
    </VStack>
  );
}
