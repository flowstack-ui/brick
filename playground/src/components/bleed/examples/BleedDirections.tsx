import {
  Bleed,
  Center,
  For,
  Frame,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function BleedDirections() {
  return (
    <VStack gap="6">
      <For
        each={["inlineStart", "inlineEnd", "blockStart", "blockEnd"] as const}
      >
        {(edge) => (
          <Surface key={edge} level="canvas" bordered inset="lg" radius="none">
            <Bleed {...{ [edge]: "6" }}>
              <Frame blockSize="3rem" asChild>
                <Surface tone="accent" level="subtle" radius="none" asChild>
                  <Center>
                    <Text>{edge}</Text>
                  </Center>
                </Surface>
              </Frame>
            </Bleed>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
