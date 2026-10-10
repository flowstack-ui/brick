import { Combobox, Field, Frame } from "@flowstack-ui/brick";

export function ComboboxLimit() {
  const options = Array.from({ length: 200 }, (_, index) => ({
    value: String(index),
    label: `Project ${index + 1}`,
  }));
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Framework</Field.Label>
        <Combobox.Root
          options={options}
          filterOptions={(items, query) =>
            items
              .filter((item) =>
                item.label?.toLowerCase().includes(query.toLowerCase()),
              )
              .slice(0, 10)
          }
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
                <Combobox.Empty>No matches found</Combobox.Empty>
              </Combobox.Listbox>
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </Field.Root>
    </Frame>
  );
}
