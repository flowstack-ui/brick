import { Frame, Surface, Text } from "@flowstack-ui/brick";
export function FrameResponsive() {
  return (
    <Frame maxInlineSize={{ md: "24rem", xl: "32rem" }} asChild>
      <Surface inset="lg" level="subtle">
        <Text>
          No maximum on small screens; 24rem from md, then 32rem from xl.
        </Text>
      </Surface>
    </Frame>
  );
}
