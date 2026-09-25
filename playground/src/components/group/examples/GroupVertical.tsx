import { Button, Group } from "@flowstack-ui/brick";
export function GroupVertical() {
  return (
    <Group
      attached
      align="stretch"
      orientation={{ initial: "vertical", md: "horizontal" }}
    >
      <Button variant="outline">Daily</Button>
      <Button variant="outline">Weekly</Button>
      <Button variant="outline">Monthly</Button>
    </Group>
  );
}
