import { useState } from "react";
import { Text, VStack } from "@flowstack-ui/brick";
import { DataGridBasic } from "./DataGridBasic.js";

export function DataGridSelection() {
  const [selected, setSelected] = useState<string[]>(["website"]);
  return (
    <VStack gap={4}>
      <DataGridBasic
        selectionMode="multiple"
        selectOnRowClick
        value={selected}
        onValueChange={(value) =>
          setSelected(Array.isArray(value) ? value : [])
        }
      />
      <Text role="status" variant="body-sm">
        {selected.length} projects selected
      </Text>
    </VStack>
  );
}
