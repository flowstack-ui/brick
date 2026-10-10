import { useEffect, useState } from "react";
import { Center, Frame, Splitter, Surface, Text } from "@flowstack-ui/brick";
export function SplitterResponsive() {
  const [vertical, setVertical] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setVertical(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <Frame blockSize={240} asChild>
      <Splitter.Root
        orientation={vertical ? "vertical" : "horizontal"}
        panels={[
          { id: "a", minSize: 20 },
          { id: "b", minSize: 20 },
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
