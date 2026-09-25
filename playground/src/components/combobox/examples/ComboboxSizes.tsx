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
export function ComboboxSizes() {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "solid", label: "Solid" },
  ];
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap={6}>
        {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
          <Field.Root key={size}>
            <Field.Label>{size}</Field.Label>
            <Combobox.Root options={options} size={size}>
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
        ))}
      </VStack>
    </Frame>
  );
}
