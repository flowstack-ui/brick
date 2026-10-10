import { Button, Group, Input, Stack } from "@flowstack-ui/brick";
export function GroupMixed() {
  return (
    <Group attached>
      <Input aria-label="Project name" placeholder="Project name" />
      <Stack.Item shrink={0} asChild>
        <Button variant="outline">Create</Button>
      </Stack.Item>
    </Group>
  );
}
