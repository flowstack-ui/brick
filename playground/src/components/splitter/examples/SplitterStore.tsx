import {
  Button,
  Center,
  Frame,
  HStack,
  Splitter,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { useSplitter } from "@flowstack-ui/brick";
export function SplitterStore() {
  const store = useSplitter({
    panels: [
      { id: "a", minSize: 20 },
      { id: "b", minSize: 20 },
    ],
    defaultSizes: { a: 30, b: 70 },
  });
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap>
        <Button
          size="sm"
          variant="outline"
          onClick={() => store.resizePanel("a", 50)}
        >
          Equalize
        </Button>
        <Button size="sm" variant="ghost" onClick={store.resetSizes}>
          Reset store
        </Button>
      </HStack>
      <Frame blockSize={240} asChild>
        <Splitter.RootProvider value={store}>
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
            aria-label="A boundary"
          />
          <Splitter.Panel panelId="b">
            <Frame blockSize="100%" asChild>
              <Surface level="subtle" asChild>
                <Center>
                  <Text>B</Text>
                </Center>
              </Surface>
            </Frame>
          </Splitter.Panel>
        </Splitter.RootProvider>
      </Frame>
      <Text tone="secondary">A: {store.getPanelSize("a").toFixed(1)}%</Text>
    </VStack>
  );
}
