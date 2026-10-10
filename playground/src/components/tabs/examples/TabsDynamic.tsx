import { Tabs, Text, Button, HStack, VStack, For } from "@flowstack-ui/brick";
import { useRef, useState } from "react";
export function TabsDynamic() {
  const [values, setValues] = useState(["Document 1", "Document 2"]);
  const [value, setValue] = useState("Document 1");
  const nextId = useRef(3);
  return (
    <VStack gap="4">
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List ariaLabel="Open documents">
          <For each={values}>
            {(name) => (
              <Tabs.Trigger key={name} value={name}>
                {name}
              </Tabs.Trigger>
            )}
          </For>
          <Tabs.Indicator />
        </Tabs.List>
        <For each={values}>
          {(name) => (
            <Tabs.Content key={name} value={name} spacing="adjacent">
              <Text>{name}</Text>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
      <HStack gap="3" wrap>
        <Button
          variant="outline"
          onClick={() => {
            const next = "Document " + nextId.current++;
            setValues([...values, next]);
            setValue(next);
          }}
        >
          Add document
        </Button>
        <Button
          variant="ghost"
          disabled={values.length === 1}
          onClick={() => {
            if (values.length <= 1) return;
            const selectedIndex = values.indexOf(value);
            const next = values.filter((item) => item !== value);
            setValues(next);
            setValue(next[Math.max(0, selectedIndex - 1)]);
          }}
        >
          Close selected document
        </Button>
      </HStack>
    </VStack>
  );
}
