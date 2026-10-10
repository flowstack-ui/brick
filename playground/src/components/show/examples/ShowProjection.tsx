import { HStack, Show, Text } from "@flowstack-ui/brick";
export function ShowProjection() {
  return (
    <Show from="md" asChild>
      <HStack gap="4">
        <Text>One</Text>
        <Text>Two</Text>
        <Text>Three</Text>
      </HStack>
    </Show>
  );
}
