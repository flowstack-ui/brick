import { Table } from "@flowstack-ui/brick";

export function TableStructure() {
  return (
    <Table.Root layout="fixed" aria-label="Workspace usage">
      <Table.ColumnGroup>
        <Table.Column htmlWidth="50%" />
        <Table.Column htmlWidth="25%" />
        <Table.Column htmlWidth="25%" />
      </Table.ColumnGroup>
      <Table.Header>
        <Table.Row>
          <Table.Head>Workspace</Table.Head>
          <Table.Head align="center">Plan</Table.Head>
          <Table.Head numeric>Seats</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row variant="section">
          <Table.Head scope="rowgroup" colSpan={3}>
            Design teams
          </Table.Head>
        </Table.Row>
        <Table.Row>
          <Table.Head scope="row">Brand</Table.Head>
          <Table.Cell align="center">Pro</Table.Cell>
          <Table.Cell numeric>12</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Head scope="row">Product</Table.Head>
          <Table.Cell align="center">Pro</Table.Cell>
          <Table.Cell numeric>24</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Head scope="row" colSpan={2}>
            Total seats
          </Table.Head>
          <Table.Cell numeric>36</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
