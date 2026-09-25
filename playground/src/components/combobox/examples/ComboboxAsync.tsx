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
export function ComboboxAsync() {
  const [options, setOptions] = useState([
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "solid", label: "Solid" },
  ]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setOptions(
        [
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "solid", label: "Solid" },
        ].filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        ),
      );
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Search frameworks</Field.Label>
        <Combobox.Root
          options={options}
          inputValue={query}
          onInputValueChange={setQuery}
          loading={loading}
          filterOptions={(items) => items}
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
    </Frame>
  );
}
