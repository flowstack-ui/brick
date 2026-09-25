import { Button, Group, VStack } from "@flowstack-ui/brick";
export function GroupStacking() {
  return (
    <VStack align="start" gap={4}>
      <Group attached stacking="first-on-top">
        <Button variant="outline">First on top</Button>
        <Button variant="outline">Second</Button>
      </Group>
      <Group attached stacking="last-on-top">
        <Button variant="outline">First</Button>
        <Button variant="outline">Last on top</Button>
      </Group>
    </VStack>
  );
}
