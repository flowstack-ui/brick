import { Table } from "@flowstack-ui/brick";
export function TableResponsive() {
  return (
    <Table.Root
      size={{ initial: "sm", md: "lg" }}
      density={{ initial: "compact", md: "comfortable" }}
      variant={{ initial: "line", md: "outline" }}
    >
      <Table.Header>
        <Table.Row>
          <Table.Head>Product</Table.Head>
          <Table.Head numeric>Stock</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell numeric>12</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
