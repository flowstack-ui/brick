import { Table } from "@flowstack-ui/brick";

export function TableNested() {
  return (
    <Table.Root variant="outline" surface="base" stickyHeader showColumnBorder>
      <Table.Caption>Independent nested recipes</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Workspace</Table.Head>
          <Table.Head>Usage</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Head scope="row">Design</Table.Head>
          <Table.Cell>
            <Table.Root aria-label="Design usage" striped>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Resource</Table.Head>
                  <Table.Head numeric>Count</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Head scope="row">Projects</Table.Head>
                  <Table.Cell numeric>12</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Head scope="row">Members</Table.Head>
                  <Table.Cell numeric>8</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
