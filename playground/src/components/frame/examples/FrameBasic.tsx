import { Frame, Surface, Text } from "@flowstack-ui/brick";
export function FrameBasic() {
  return (
    <Frame maxInlineSize="24rem" asChild>
      <Surface inset="lg" level="subtle">
        <Text>A local region, at most 24rem wide.</Text>
      </Surface>
    </Frame>
  );
}
