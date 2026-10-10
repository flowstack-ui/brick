import { Center, Frame, Splitter, Surface, Text } from "@flowstack-ui/brick";
export function SplitterUnits() {
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root
        panels={[
          { id: "a", minSize: "5rem", maxSize: "20rem" },
          { id: "b", minSize: "5rem" },
        ]}
        defaultSizes={{ a: "10rem" }}
      >
        <Splitter.Panel panelId="a">
          <Frame blockSize="100%" asChild>
            <Surface level="subtle" asChild>
              <Center>
                <Text>A</Text>
              </Center>
            </Surface>
          </Frame>
        </Splitter.Panel>
        <Splitter.ResizeTrigger before="a" after="b" aria-label="A boundary" />
        <Splitter.Panel panelId="b">
          <Frame blockSize="100%" asChild>
            <Surface level="subtle" asChild>
              <Center>
                <Text>B</Text>
              </Center>
            </Surface>
          </Frame>
        </Splitter.Panel>
      </Splitter.Root>
    </Frame>
  );
}
