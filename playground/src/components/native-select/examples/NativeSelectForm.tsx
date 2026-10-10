import {
  NativeSelect,
  For,
  Frame,
  VStack,
  HStack,
  Text,
  Button,
} from "@flowstack-ui/brick";
import { useState } from "react";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];
export function NativeSelectForm() {
  const [result, setResult] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setResult(String(data.get("framework")));
      }}
    >
      <VStack gap="4">
        <Frame maxInlineSize="20rem">
          <NativeSelect.Root>
            <NativeSelect.Field
              aria-label="Form framework"
              name="framework"
              defaultValue="react"
            >
              <For each={items}>
                {(item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Frame>
        <HStack gap="2">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text tone="secondary">
          {result || "Submit to see the selected value"}
        </Text>
      </VStack>
    </form>
  );
}
