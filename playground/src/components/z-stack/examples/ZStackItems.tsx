import { Badge, Frame, Surface, ZStack } from "@flowstack-ui/brick";
export function ZStackItems() {
  return (
    <Frame minBlockSize="10rem" asChild>
      <ZStack.Root align="center" justify="center" asChild>
        <Surface level="subtle">
          <Badge>Root: center</Badge>
          <ZStack.Item align="end" justify="start" edgeSpacing="4">
            <Badge tone="accent">Item: end / start</Badge>
          </ZStack.Item>
        </Surface>
      </ZStack.Root>
    </Frame>
  );
}
