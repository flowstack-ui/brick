import { Button, Group, Surface } from "@flowstack-ui/brick";
export function GroupComposition() {
  return (
    <Group asChild gap={3}>
      <Surface level="canvas" bordered inset="md">
        <Button variant="outline">Cancel</Button>
        <Button>Continue</Button>
      </Surface>
    </Group>
  );
}
