import { Center, Frame, Splitter, Surface, Text } from "@flowstack-ui/brick";

export function SplitterNested() {
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root
        panels={[
          { id: "a", minSize: 20 },
          { id: "b", minSize: 30 },
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
            <Splitter.Root
              orientation="vertical"
              panels={[
                { id: "c", minSize: 20 },
                { id: "d", minSize: 20 },
              ]}
            >
              <Splitter.Panel panelId="c">
                <Frame blockSize="100%" asChild>
                  <Surface level="subtle" asChild>
                    <Center>
                      <Text>C</Text>
                    </Center>
                  </Surface>
                </Frame>
              </Splitter.Panel>
              <Splitter.ResizeTrigger
                before="c"
                after="d"
                aria-label="C panel size"
              ></Splitter.ResizeTrigger>
              <Splitter.Panel panelId="d">
                <Frame blockSize="100%" asChild>
                  <Surface level="subtle" asChild>
                    <Center>
                      <Text>D</Text>
                    </Center>
                  </Surface>
                </Frame>
              </Splitter.Panel>
            </Splitter.Root>
          </Frame>
        </Splitter.Panel>
      </Splitter.Root>
    </Frame>
  );
}
