import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Frame,
  Splitter,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
const storageKey = "brick.splitter.example";
export function SplitterStorage() {
  const [sizes, setSizes] = useState<Record<string, number>>({ a: 50, b: 50 });
  const [message, setMessage] = useState("Save sizes by resizing the panels.");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (
        saved &&
        Number.isFinite(saved.a) &&
        Number.isFinite(saved.b) &&
        saved.a >= 20 &&
        saved.b >= 20 &&
        Math.abs(saved.a + saved.b - 100) < 0.01
      )
        setSizes({ a: saved.a, b: saved.b });
    } catch {
      setMessage("Storage unavailable; resizing still works.");
    }
  }, []);
  return (
    <VStack gap={4}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSizes({ a: 50, b: 50 });
          try {
            localStorage.removeItem(storageKey);
            setMessage("Saved sizes cleared.");
          } catch {
            setMessage("Storage unavailable.");
          }
        }}
      >
        Clear saved sizes
      </Button>
      <Frame blockSize={240} asChild>
        <Splitter.Root
          panels={[
            { id: "a", minSize: 20 },
            { id: "b", minSize: 20 },
          ]}
          sizes={sizes}
          onResize={(details) => setSizes(details.sizes)}
          onResizeEnd={(details) => {
            if (details.cancelled) return;
            try {
              localStorage.setItem(storageKey, JSON.stringify(details.sizes));
              setMessage("Sizes saved.");
            } catch {
              setMessage("Storage unavailable; resizing still works.");
            }
          }}
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
        </Splitter.Root>
      </Frame>
      <Text tone="secondary" role="status">
        {message}
      </Text>
    </VStack>
  );
}
