import { DataGrid, type DataGridRootProps } from "@flowstack-ui/brick";

export const projects = [
  { id: "website", name: "Website", owner: "Alex", hours: 24 },
  { id: "dashboard", name: "Dashboard", owner: "Sam", hours: 40 },
  { id: "mobile", name: "Mobile app", owner: "Jordan", hours: 32 },
];

export function DataGridBasic(props: DataGridRootProps) {
  return (
    <DataGrid.Container>
      <DataGrid.Root
        aria-label="Project estimates"
        rowCount={4}
        columnCount={3}
        {...props}
      >
        <DataGrid.Header>
          <DataGrid.Row rowIndex={1}>
            <DataGrid.ColumnHeader columnIndex={1}>
              Project
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={2}>Owner</DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={3} numeric>
              Hours
            </DataGrid.ColumnHeader>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          {projects.map((project, index) => (
            <DataGrid.Row
              key={project.id}
              value={project.id}
              rowIndex={index + 2}
              selectable
            >
              <DataGrid.RowHeader columnIndex={1}>
                {project.name}
              </DataGrid.RowHeader>
              <DataGrid.Cell columnIndex={2}>{project.owner}</DataGrid.Cell>
              <DataGrid.Cell columnIndex={3} numeric>
                {project.hours}
              </DataGrid.Cell>
            </DataGrid.Row>
          ))}
        </DataGrid.Body>
      </DataGrid.Root>
    </DataGrid.Container>
  );
}
