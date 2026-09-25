import { Text, VStack } from "@flowstack-ui/brick";
import { DataGridBasic } from "./DataGridBasic.js";

export function DataGridDensity() {
  return (
    <VStack gap={8}>
      {["compact", "comfortable", "spacious"].map((value) => (
        <VStack key={value} gap={2}>
          <Text variant="body-sm">{value}</Text>
          <DataGridBasic
            density={value as "compact" | "comfortable" | "spacious"}
          />
        </VStack>
      ))}
    </VStack>
  );
}
