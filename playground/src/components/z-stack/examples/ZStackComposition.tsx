import { Badge, Button, Frame, Surface, ZStack } from "@flowstack-ui/brick";
export function ZStackComposition() {
  return (
    <Frame minBlockSize="10rem" asChild>
      <ZStack.Root asChild align="center" justify="center">
        <Surface as="article" level="subtle">
          <Badge>One painted grid host</Badge>
          <ZStack.Item align="end" justify="end" edgeSpacing="4" asChild>
            <Button size="sm">Save layout</Button>
          </ZStack.Item>
        </Surface>
      </ZStack.Root>
    </Frame>
  );
}
