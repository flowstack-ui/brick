import { Bleed, Center, Frame, Surface, Text } from "@flowstack-ui/brick";

export function BleedResponsive() {
  return (
    <Surface
      level="canvas"
      bordered
      inset={{ initial: "md", md: "lg" }}
      radius="none"
    >
      <Bleed inline={{ initial: "5", md: "6" }}>
        <Frame blockSize="5rem" asChild>
          <Surface tone="accent" level="subtle" radius="none" asChild>
            <Center>
              <Text>Responsive inline bleed</Text>
            </Center>
          </Surface>
        </Frame>
      </Bleed>
    </Surface>
  );
}
