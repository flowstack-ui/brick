import { Bleed, Center, Frame, Surface, Text } from "@flowstack-ui/brick";

export function BleedVertical() {
  return (
    <Surface level="canvas" bordered inset="lg" radius="none">
      <Bleed block="6">
        <Frame blockSize="10rem" asChild>
          <Surface tone="accent" level="subtle" radius="none" asChild>
            <Center>
              <Text>block</Text>
            </Center>
          </Surface>
        </Frame>
      </Bleed>
    </Surface>
  );
}
