import { useState } from "react";
import {
  Center,
  Frame,
  Splitter,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function SplitterEvents() {
  const [event, setEvent] = useState("Resize a panel to see the last event.");
  return (
    <VStack gap={4}>
      <Frame blockSize={240} asChild>
        <Splitter.Root
          keyboardStep={5}
          panels={[
            { id: "a", minSize: 20 },
            { id: "b", minSize: 20 },
          ]}
          onResizeStart={(details) => setEvent("Started: " + details.source)}
          onResize={(details) => setEvent("Resizing: " + details.source)}
          onResizeEnd={(details) =>
            setEvent(
              (details.cancelled ? "Cancelled: " : "Finished: ") +
                details.source,
            )
          }
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
      <Text tone="secondary" role="status">
        {event}
      </Text>
    </VStack>
  );
}
