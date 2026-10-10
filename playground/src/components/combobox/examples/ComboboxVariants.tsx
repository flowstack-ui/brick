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
export function ComboboxVariants() {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "solid", label: "Solid" },
  ];
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap={6}>
        {(
          [
            "outline",
            "surface",
            "soft",
            "subtle",
            "ghost",
            "plain",
            "underline",
          ] as const
        ).map((variant) => (
          <Field.Root key={variant}>
            <Field.Label>{variant}</Field.Label>
            <Combobox.Root options={options} variant={variant}>
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
