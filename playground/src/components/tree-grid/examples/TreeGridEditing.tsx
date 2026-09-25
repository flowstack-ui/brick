import { useRef, useState } from "react";
import {
  Button,
  HStack,
  Input,
  Text,
  TreeGrid,
  VStack,
} from "@flowstack-ui/brick";
export function TreeGridEditing() {
  const [name, setName] = useState("Project");
  const [saved, setSaved] = useState(name);
  const [error, setError] = useState("");
  const grid = useRef<HTMLTableElement>(null);
  const save = () => {
    if (!name.trim()) {
      setError("Enter a project name.");
      return;
    }
    setSaved(name.trim());
    setError("");
    grid.current?.focus();
  };
  const cancel = () => {
    setName(saved);
    setError("");
    grid.current?.focus();
  };
  return (
    <VStack gap={2}>
      <TreeGrid.Root
        ref={grid}
        aria-label="Editable project"
        rowCount={1}
        columnCount={3}
      >
        <TreeGrid.Body>
          <TreeGrid.Row value="project" rowIndex={1}>
            <TreeGrid.RowHeader columnIndex={1}>{saved}</TreeGrid.RowHeader>
            <TreeGrid.Cell columnIndex={2} interactive>
              <Input
                size="sm"
                aria-label="Project name"
                aria-invalid={!!error}
                value={name}
                onChange={(event) => setName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.nativeEvent.isComposing) return;
                  if (event.key === "Enter") {
                    event.preventDefault();
                    save();
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    cancel();
                  }
                }}
              />
            </TreeGrid.Cell>
            <TreeGrid.Cell columnIndex={3} interactive>
              <HStack gap={2}>
                <Button size="sm" variant="outline" onClick={save}>
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={cancel}>
                  Cancel
                </Button>
              </HStack>
            </TreeGrid.Cell>
          </TreeGrid.Row>
        </TreeGrid.Body>
      </TreeGrid.Root>
      {error ? <Text role="alert">{error}</Text> : null}
    </VStack>
  );
}
