import { Combobox, Field, Frame } from "@flowstack-ui/brick";

export function ComboboxLinks() {
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
                  <Combobox.Item
                    key={option.value}
                    value={option.value}
                    asChild
                  >
                    <a
                      href={`https://${option.value === "react" ? "react.dev" : option.value === "vue" ? "vuejs.org" : option.value === "solid" ? "solidjs.com" : "svelte.dev"}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {option.label}
                    </a>
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
