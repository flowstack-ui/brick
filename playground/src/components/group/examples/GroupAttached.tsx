import { Button, Group } from "@flowstack-ui/brick";
export function GroupAttached() {
  return (
    <Group attached>
      <Button variant="outline">Save</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="outline">Publish</Button>
    </Group>
  );
}
