import { useState } from "react";
import {
  Button,
  Checkbox,
  HStack,
  Text,
  TreeGrid,
  VStack,
} from "@flowstack-ui/brick";
import { fileRows } from "./TreeGridBasic.js";
export function TreeGridCheckboxSelection() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <VStack gap={4}>
      <HStack gap={3}>
        <Text>{selected.length} selected</Text>
        <Button
          size="sm"
          variant="outline"
          disabled={!selected.length}
          onClick={() => setSelected([])}
        >
          Clear selection
        </Button>
      </HStack>
      <TreeGrid.Root
        aria-label="Select project files"
        rowCount={4}
        columnCount={2}
        defaultExpandedValue={["src"]}
        selectionMode="multiple"
        value={selected}
        onValueChange={(value) =>
          setSelected(Array.isArray(value) ? value : [])
        }
      >
        <TreeGrid.Body>
          {fileRows.map((row, index) => (
            <TreeGrid.Row
              key={row.value}
              value={row.value}
              parentValue={row.parent}
              level={row.level}
              rowIndex={index + 1}
              expandable={row.expandable}
            >
              <TreeGrid.RowHeader columnIndex={1}>
                <TreeGridFileLabel folder={row.expandable}>
                  {row.label}
                </TreeGridFileLabel>
              </TreeGrid.RowHeader>
              <TreeGrid.Cell columnIndex={2} interactive>
                <Checkbox
                  size="sm"
                  density="compact"
                  aria-label={`Select ${row.label}`}
                  checked={selected.includes(row.value)}
                  onCheckedChange={(checked) =>
                    setSelected((values) =>
                      checked
                        ? [...new Set([...values, row.value])]
                        : values.filter((value) => value !== row.value),
                    )
                  }
                />
              </TreeGrid.Cell>
            </TreeGrid.Row>
          ))}
        </TreeGrid.Body>
      </TreeGrid.Root>
    </VStack>
  );
}
import { TreeGridFileLabel } from "../TreeGridFileLabel.js";
