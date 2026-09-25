import { Button, Frame, Surface, ZStack } from "@flowstack-ui/brick";
export function ZStackLayers() {
  return (
    <ZStack.Root>
      <Frame minBlockSize="10rem" asChild>
        <Surface level="subtle" />
      </Frame>
      <ZStack.Item
        align="start"
        justify="start"
        edgeSpacing="4"
        layer="content"
        asChild
      >
        <Button variant="outline" tone="neutral">
          First action
        </Button>
      </ZStack.Item>
      <ZStack.Item
        align="end"
        justify="end"
        edgeSpacing="4"
        layer="action"
        asChild
      >
        <Button>Second action</Button>
      </ZStack.Item>
    </ZStack.Root>
  );
}
