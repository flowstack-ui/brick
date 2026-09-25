import { useState } from "react";
import { For, useSplitter } from "@flowstack-ui/brick";
import {
  Button,
  Center,
  Frame,
  Splitter,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function SplitterDynamic() {
  const [ids, setIds] = useState(["a", "b"]);
  const [sizes, setSizes] = useState<Record<string, number>>({ a: 50, b: 50 });
  const store = useSplitter({
    panels: ids.map((id) => ({ id, minSize: 15 })),
    sizes,
    onResize: (details) => setSizes(details.sizes),
  });
  function toggle() {
    const next = ids.length === 2 ? ["a"] : ["a", "b"];
    setSizes(next.length === 1 ? { a: 100 } : { a: 50, b: 50 });
    setIds(next);
  }
  return (
    <VStack gap={4}>
      <Button size="sm" variant="outline" onClick={toggle}>
        {ids.length === 2 ? "Remove B" : "Restore B"}
      </Button>
      <Frame blockSize={240} asChild>
        <Splitter.RootProvider value={store}>
          <For each={store.getItems()}>
            {(item) =>
              item.type === "panel" ? (
                <Splitter.Panel key={item.id} panelId={item.id}>
                  <Frame blockSize="100%" asChild>
                    <Surface level="subtle" asChild>
                      <Center>
                        <Text>{item.id.toUpperCase()}</Text>
                      </Center>
                    </Surface>
                  </Frame>
                </Splitter.Panel>
              ) : (
                <Splitter.ResizeTrigger
                  key={item.before + ":" + item.after}
                  before={item.before}
                  after={item.after}
                  aria-label="Dynamic boundary"
                />
              )
            }
          </For>
        </Splitter.RootProvider>
      </Frame>
    </VStack>
  );
}
