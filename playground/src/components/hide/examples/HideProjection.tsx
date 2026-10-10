import { Hide, HStack, Text } from "@flowstack-ui/brick";
export function HideProjection() {
  return (
    <Hide from="lg" asChild>
      <HStack gap="4">
        <Text>Compact</Text>
        <Text>Tools</Text>
      </HStack>
    </Hide>
  );
}
