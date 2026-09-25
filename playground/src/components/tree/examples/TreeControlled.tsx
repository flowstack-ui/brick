import { useState } from "react";
import { VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeControlled() {
  const [value, setValue] = useState<string[]>(["app"]);
  const [focused, setFocused] = useState<string | null>(null);
  return (
    <VStack gap={4}>
      <TreeBasic
        selectionMode="multiple"
        value={value}
        onValueChange={(value) => setValue(Array.isArray(value) ? value : [])}
        focusedValue={focused}
        onFocusedValueChange={setFocused}
      />
      <Text variant="body-sm">
        Selected: {value.join(", ") || "none"}; active: {focused ?? "none"}
      </Text>
    </VStack>
  );
}
