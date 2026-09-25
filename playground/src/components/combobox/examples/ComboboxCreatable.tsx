import { useState } from "react";
import { Combobox, Field, Frame } from "@flowstack-ui/brick";
export function ComboboxCreatable() {
  const [items, setItems] = useState([
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState<string | null>(null);
  const create =
    query.trim() &&
    !items.some(
      (item) => item.label.toLowerCase() === query.trim().toLowerCase(),
    );
  const options = create
    ? [
        ...items,
        { value: `create:${query.trim()}`, label: `Create “${query.trim()}”` },
      ]
    : items;
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Framework</Field.Label>
        <Combobox.Root
          options={options}
          value={value}
          inputValue={query}
          onInputValueChange={(next) => {
            // The synthetic row has a descriptive label, but the editable value
            // is the newly created item's label, not that action label.
            setQuery(
              next.startsWith("Create “") && next.endsWith("”")
                ? next.slice(8, -1)
                : next,
            );
          }}
          onValueChange={(next) => {
            if (next?.startsWith("create:")) {
              const label = next.slice(7);
              setItems((previous) => [...previous, { value: label, label }]);
              setValue(label);
            } else setValue(next);
          }}
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Choose or create" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Portal>
            <Combobox.Content>
              <Combobox.Listbox>
                {options.map((item) => (
                  <Combobox.Item key={item.value} value={item.value}>
                    {item.label}
                  </Combobox.Item>
                ))}
              </Combobox.Listbox>
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </Field.Root>
    </Frame>
  );
}
