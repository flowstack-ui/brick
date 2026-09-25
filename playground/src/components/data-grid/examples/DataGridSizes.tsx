import { Text, VStack } from "@flowstack-ui/brick";
import { DataGridBasic } from "./DataGridBasic.js";

export function DataGridSizes() {
  return (
    <VStack gap={8}>
      {["sm", "md", "lg"].map((value) => (
        <VStack key={value} gap={2}>
          <Text variant="body-sm">{value}</Text>
          <DataGridBasic size={value as "sm" | "md" | "lg"} />
        </VStack>
      ))}
    </VStack>
  );
}
