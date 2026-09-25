import { Button, Group } from "@flowstack-ui/brick";
export function GroupGrow() {
  return (
    <Group grow>
      <Button variant="outline">Draft</Button>
      <Button variant="outline">Review</Button>
      <Button variant="outline">Publish</Button>
    </Group>
  );
}
