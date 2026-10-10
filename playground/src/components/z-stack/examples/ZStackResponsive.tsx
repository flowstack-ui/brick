import { Badge, Frame, Surface, ZStack } from "@flowstack-ui/brick";
export function ZStackResponsive() {
  return (
    <ZStack.Root>
      <Frame minBlockSize="12rem" asChild>
        <Surface level="subtle" />
      </Frame>
      <ZStack.Item
        align={{ initial: "end", md: "start" }}
        justify={{ initial: "start", md: "end" }}
        edgeSpacing={{ initial: 3, sm: 4, md: 5, lg: 6, xl: 8 }}
      >
        <Badge tone="accent">Responsive layer</Badge>
      </ZStack.Item>
    </ZStack.Root>
  );
}
