import {
  Button,
  Center,
  Frame,
  Splitter,
  Surface,
  Text,
} from "@flowstack-ui/brick";
export function SplitterReset() {
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root
        panels={[
          { id: "a", minSize: 20 },
          { id: "b", minSize: 20 },
        ]}
        defaultSizes={{ a: 35, b: 65 }}
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
        <Splitter.Context>
          {(api) => (
            <Splitter.ResizeTrigger
              before="a"
              after="b"
              aria-label="A panel size"
              onDoubleClick={api.resetSizes}
            />
          )}
        </Splitter.Context>
        <Splitter.Panel panelId="b">
          <Frame blockSize="100%" asChild>
            <Center>
              <Splitter.Context>
                {(api) => (
                  <Button size="sm" variant="outline" onClick={api.resetSizes}>
                    Reset panels
                  </Button>
                )}
              </Splitter.Context>
            </Center>
          </Frame>
        </Splitter.Panel>
      </Splitter.Root>
    </Frame>
  );
}
