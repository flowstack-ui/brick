import { VStack, Text } from "@flowstack-ui/brick";
import { TreeGridBasic } from "./TreeGridBasic.js";
export function TreeGridTones() {
  return (
    <VStack gap={8}>
      {(["neutral", "accent"] as const).map((tone) => (
        <VStack key={tone} gap={2}>
          <Text>{tone}</Text>
          <TreeGridBasic
            tone={tone}
            selectionMode="single"
            defaultValue="app"
            selectOnRowClick
          />
        </VStack>
      ))}
    </VStack>
  );
}
