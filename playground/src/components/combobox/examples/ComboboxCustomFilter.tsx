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
export function ComboboxCustomFilter() {
  const options = [
    { value: "react", label: "React", keywords: "meta facebook" },
    { value: "vue", label: "Vue", keywords: "evan community" },
  ];
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Framework or organization</Field.Label>
        <Combobox.Root
          options={options}
          filterOptions={(items, query) =>
            items.filter((item) => {
              const record = options.find(
                (option) => option.value === item.value,
              );
              return `${record?.label} ${record?.keywords}`
                .toLowerCase()
                .includes(query.toLowerCase());
            })
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
