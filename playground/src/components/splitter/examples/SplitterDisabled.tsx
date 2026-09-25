import { Center, Frame, Splitter, Surface, Text } from "@flowstack-ui/brick";

export function SplitterDisabled() {
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
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
          disabled
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
      </Splitter.Root>
    </Frame>
  );
}
