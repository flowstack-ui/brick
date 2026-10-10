import { HStack, Stack, Surface, Text, Button } from "@flowstack-ui/brick";

export function StackComposition() {
  return (
    <HStack gap={3}>
      <Text>Workspace</Text>
      <Stack.Item asChild grow={1}>
        <Stack asChild align="center" gap={3}>
          <Surface as="section" level="subtle" inset="md">
            <Text>One shared host</Text>
            <Button variant="outline">Open</Button>
          </Surface>
        </Stack>
      </Stack.Item>
    </HStack>
  );
}
