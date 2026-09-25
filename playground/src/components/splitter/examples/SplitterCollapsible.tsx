import {
  Button,
  Center,
  Frame,
  Splitter,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function SplitterCollapsible() {
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root
        panels={[
          {
            id: "a",
            minSize: 20,
            maxSize: 60,
            collapsible: true,
            collapsedSize: 5,
          },
          { id: "b", minSize: 40 },
        ]}
        defaultSizes={{ a: 40, b: 60 }}
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
            <Center>
              <Splitter.Context>
                {(api) => (
                  <VStack gap={3}>
                    <Text>B</Text>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        api.isPanelCollapsed("a")
                          ? api.expandPanel("a")
                          : api.collapsePanel("a")
                      }
                    >
                      {api.isPanelCollapsed("a") ? "Expand A" : "Collapse A"}
                    </Button>
                  </VStack>
                )}
              </Splitter.Context>
            </Center>
          </Frame>
        </Splitter.Panel>
      </Splitter.Root>
    </Frame>
  );
}
