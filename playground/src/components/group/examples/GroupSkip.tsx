import { Button, Group, Text } from "@flowstack-ui/brick";
export function GroupSkip() {
  return (
    <Group
      attached
      skip={(child) =>
        Boolean((child.props as Record<string, unknown>)["data-exclude"])
      }
    >
      <Button variant="outline">Undo</Button>
      <Text data-exclude> / </Text>
      <Button variant="outline">Redo</Button>
    </Group>
  );
}
