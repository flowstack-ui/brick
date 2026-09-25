import { Text, VStack } from "@flowstack-ui/brick";
import { DataGridBasic } from "./DataGridBasic.js";

export function DataGridTones() {
  return (
    <VStack gap={8}>
      {["neutral", "accent"].map((value) => (
        <VStack key={value} gap={2}>
          <Text variant="body-sm">{value}</Text>
          <DataGridBasic
            tone={value as "neutral" | "accent"}
            selectionMode="single"
            defaultValue="website"
            selectOnRowClick
          />
        </VStack>
      ))}
    </VStack>
  );
}
