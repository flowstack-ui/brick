import { Center, Frame, Splitter, Surface, Text } from "@flowstack-ui/brick";

export function SplitterMultiple() {
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root
        panels={[
          { id: "a", minSize: 15 },
          { id: "b", minSize: 15 },
          { id: "c", minSize: 15 },
        ]}
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
        <Splitter.ResizeTrigger
          before="a"
          after="b"
          aria-label="A panel size"
        ></Splitter.ResizeTrigger>
        <Splitter.Panel panelId="b">
          <Frame blockSize="100%" asChild>
            <Surface level="subtle" asChild>
              <Center>
                <Text>B</Text>
              </Center>
            </Surface>
          </Frame>
        </Splitter.Panel>
        <Splitter.ResizeTrigger
          before="b"
          after="c"
          aria-label="B panel size"
        ></Splitter.ResizeTrigger>
        <Splitter.Panel panelId="c">
          <Frame blockSize="100%" asChild>
            <Surface level="subtle" asChild>
              <Center>
                <Text>C</Text>
              </Center>
            </Surface>
          </Frame>
        </Splitter.Panel>
      </Splitter.Root>
    </Frame>
  );
}
