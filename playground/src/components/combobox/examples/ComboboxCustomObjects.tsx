import { Combobox, Field, Frame } from "@flowstack-ui/brick";

export function ComboboxCustomObjects() {
  const options = [
    { code: "US", country: "United States" },
    { code: "CA", country: "Canada" },
  ].map((item) => ({ value: item.code, label: item.country }));
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <Combobox.Root options={options}>
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
