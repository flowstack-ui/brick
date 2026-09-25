import { Bleed, Center, Frame, Surface, Text } from "@flowstack-ui/brick";

export function BleedOverride() {
  return (
    <Surface level="canvas" bordered inset="lg" radius="none">
      <Bleed inline="6" inlineEnd={0}>
        <Frame blockSize="5rem" asChild>
          <Surface tone="accent" level="subtle" radius="none" asChild>
            <Center>
              <Text>Only inline-start extends</Text>
            </Center>
          </Surface>
        </Frame>
      </Bleed>
    </Surface>
  );
}
