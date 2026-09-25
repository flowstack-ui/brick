import { useState, useRef } from "react";
import { Combobox, Field, Frame, Chip, HStack } from "@flowstack-ui/brick";

export function ComboboxMultiple() {
  const [values, setValues] = useState<string[]>(["react"]);
  const input = useRef<HTMLInputElement>(null);
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
  ];
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Framework</Field.Label>
        <Combobox.Root
          options={options}
          multiple
          values={values}
          onValuesChange={setValues}
        >
          <HStack gap={2} wrap="wrap">
            {values.map((value) => (
              <Chip.Root key={value} size="sm">
                <Chip.Label>
                  {options.find((option) => option.value === value)?.label ??
                    value}
                </Chip.Label>
                <Chip.RemoveTrigger
                  ariaLabel={`Remove ${value}`}
                  onPress={() => {
                    setValues((previous) =>
                      previous.filter((item) => item !== value),
                    );
                    input.current?.focus();
                  }}
                />
              </Chip.Root>
            ))}
          </HStack>
          <Combobox.Control>
            <Combobox.Input ref={input} placeholder="Type to search" />
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
