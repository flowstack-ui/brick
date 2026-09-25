import { useState } from "react";
import { Text, VStack } from "@flowstack-ui/brick";
import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridSelection() {
  const [value, setValue] = useState<string[]>(["app"]);
  const [expanded, setExpanded] = useState(["src"]);
  return (
    <VStack gap={4}>
      <TreeGridBasic
        selectionMode="multiple"
        value={value}
        onValueChange={(value) => setValue(Array.isArray(value) ? value : [])}
        expandedValue={expanded}
        onExpandedValueChange={setExpanded}
        selectOnRowClick
      />
      <Text variant="body-sm">Selected: {value.join(", ") || "none"}</Text>
    </VStack>
  );
}
