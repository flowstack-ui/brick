import { useState, useEffect } from "react";
import {
  Combobox,
  Field,
  Frame,
  VStack,
  HStack,
  Button,
  Text,
} from "@flowstack-ui/brick";
export function ComboboxNativeForm() {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "solid", label: "Solid" },
  ];
  const [submitted, setSubmitted] = useState("");
  return (
    <Frame maxInlineSize="28rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            String(new FormData(event.currentTarget).get("framework")),
          );
        }}
      >
        <VStack gap={4}>
          <Field.Root>
            <Field.Label>Framework</Field.Label>
            <Combobox.Root
              options={options}
              name="framework"
              required
              defaultValue="react"
            >
              <Combobox.Control>
                <Combobox.Input placeholder="Type to search" />
                <Combobox.IndicatorGroup>
                  <Combobox.Clear />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>
              <Combobox.Portal>
                <Combobox.Content>
                  <Combobox.Listbox>
                    {options.map((option) => (
                      <Combobox.Item key={option.value} value={option.value}>
                        <Combobox.ItemText>{option.label}</Combobox.ItemText>
                        <Combobox.ItemIndicator />
                      </Combobox.Item>
                    ))}
                    <Combobox.Empty>No results</Combobox.Empty>
                    <Combobox.Loading>Loading results</Combobox.Loading>
                  </Combobox.Listbox>
                </Combobox.Content>
              </Combobox.Portal>
            </Combobox.Root>
          </Field.Root>
          <HStack gap={3}>
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text>{submitted ? `Submitted: ${submitted}` : "No submission"}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
