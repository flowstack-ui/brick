import { Badge, Frame, Surface, ZStack } from "@flowstack-ui/brick";
export function ZStackBasic() {
  return (
    <ZStack.Root>
      <Frame minBlockSize="10rem" asChild>
        <Surface level="subtle" />
      </Frame>
      <ZStack.Item align="end" justify="end" edgeSpacing="4">
        <Badge tone="accent">Overlay</Badge>
      </ZStack.Item>
    </ZStack.Root>
  );
}
