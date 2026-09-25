import { Button, Frame, Group } from "@flowstack-ui/brick";
export function GroupAlignment() {
  return (
    <Frame maxInlineSize="28rem" asChild>
      <Group grow align="end" justify="space-between">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="lg" variant="outline">
          Large
        </Button>
      </Group>
    </Frame>
  );
}
