import { useState } from "react";
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
export function SplitterControlled() {
  const [sizes, setSizes] = useState<Record<string, number>>({ a: 40, b: 60 });
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSizes({ a: 50, b: 50 })}
        >
          Equal panels
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setSizes({ a: 40, b: 60 })}
        >
          Reset sizes
        </Button>
      </HStack>
      <Frame blockSize={240} asChild>
        <Splitter.Root
          panels={[
            { id: "a", minSize: 20 },
            { id: "b", minSize: 20 },
          ]}
          sizes={sizes}
          onResize={(details) => setSizes(details.sizes)}
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
        </Splitter.Root>
      </Frame>
      <Text tone="secondary">
        A: {sizes.a?.toFixed(1)}% · B: {sizes.b?.toFixed(1)}%
      </Text>
    </VStack>
  );
}
