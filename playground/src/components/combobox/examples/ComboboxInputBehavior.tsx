import { Combobox, Field, Frame, VStack } from "@flowstack-ui/brick";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "solid", label: "Solid" },
];
export function ComboboxInputBehavior() {
  return (
    <Frame maxInlineSize="28rem">
      <VStack gap={6}>
        {(["autohighlight", "autocomplete"] as const).map((behavior) => (
          <Field.Root key={behavior}>
            <Field.Label>
              {behavior === "autohighlight"
                ? "Highlight first match"
                : "Complete with arrow keys"}
            </Field.Label>
            <Combobox.Root options={options} inputBehavior={behavior}>
              <Combobox.Control>
                <Combobox.Input placeholder="Search frameworks" />
                <Combobox.Trigger />
              </Combobox.Control>
              <Combobox.Portal>
                <Combobox.Content>
                  <Combobox.Listbox>
                    {options.map((option) => (
                      <Combobox.Item key={option.value} value={option.value}>
                        {option.label}
                      </Combobox.Item>
                    ))}
                    <Combobox.Empty>No matches</Combobox.Empty>
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
