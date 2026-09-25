import { useState } from "react";
import { Button, DataGrid, Input, Text, VStack } from "@flowstack-ui/brick";

export function DataGridEditing() {
  const [name, setName] = useState("Website");
  const [saved, setSaved] = useState("Website");
  return (
    <VStack gap={4}>
      <DataGrid.Root
        aria-label="Edit project"
        rowCount={2}
        columnCount={2}
        variant="outline"
      >
        <DataGrid.Header>
          <DataGrid.Row rowIndex={1}>
            <DataGrid.ColumnHeader columnIndex={1}>
              Project
            </DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader columnIndex={2}>
              Actions
            </DataGrid.ColumnHeader>
          </DataGrid.Row>
        </DataGrid.Header>
        <DataGrid.Body>
          <DataGrid.Row rowIndex={2} value="website">
            <DataGrid.Cell columnIndex={1} interactive>
              <Input
                aria-label="Project name"
                size="sm"
                value={name}
                required
                aria-invalid={!name.trim() || undefined}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setName(saved);
                }}
                onChange={(event) => setName(event.target.value)}
              />
            </DataGrid.Cell>
            <DataGrid.Cell columnIndex={2} interactive>
              <Button
                size="sm"
                variant="outline"
                disabled={!name.trim()}
                onClick={() => setSaved(name)}
              >
                Save
              </Button>
            </DataGrid.Cell>
          </DataGrid.Row>
        </DataGrid.Body>
      </DataGrid.Root>
      <Text role="status" variant="body-sm">
        {name.trim()
          ? `Saved: ${saved}. Escape cancels the draft.`
          : "Enter a project name before saving."}
      </Text>
    </VStack>
  );
}
