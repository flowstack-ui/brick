import { Text, VStack } from "@flowstack-ui/brick";
import { DataGridBasic } from "./DataGridBasic.js";

export function DataGridVariants() {
  return (
    <VStack gap={8}>
      {["line", "outline"].map((value) => (
        <VStack key={value} gap={2}>
          <Text variant="body-sm">{value}</Text>
          <DataGridBasic variant={value as "line" | "outline"} />
        </VStack>
      ))}
    </VStack>
  );
}
