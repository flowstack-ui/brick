import { VStack, Text } from "@flowstack-ui/brick";
import { TreeBasic } from "./TreeBasic.js";
export function TreeTones() {
  return (
    <VStack gap={6}>
      {(["neutral", "accent"] as const).map((tone) => (
        <VStack key={tone} gap={2}>
          <Text>{tone}</Text>
          <TreeBasic tone={tone} defaultValue="app" />
        </VStack>
      ))}
    </VStack>
  );
}
