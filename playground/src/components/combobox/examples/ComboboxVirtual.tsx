import { useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Combobox, Field, Frame } from "@flowstack-ui/brick";
const items = Array.from({ length: 1000 }, (_, index) => ({
  value: String(index),
  label: `Project ${index + 1}`,
}));
export function ComboboxVirtual() {
  const [query, setQuery] = useState("");
  const [scroll, setScroll] = useState<HTMLDivElement | null>(null);
  const options = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );
  const virtual = useVirtualizer({
    count: options.length,
    getScrollElement: () => scroll,
    estimateSize: () => 36,
    overscan: 4,
  });
  return (
    <Frame maxInlineSize="28rem">
      <Field.Root>
        <Field.Label>Project</Field.Label>
        <Combobox.Root
          options={options}
          inputValue={query}
          onInputValueChange={setQuery}
          filterOptions={(items) => items}
          scrollToIndexFn={({ index }) => {
            if (index >= 0) virtual.scrollToIndex(index, { align: "auto" });
          }}
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Search 1,000 projects" />
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Portal>
            <Combobox.Content>
              <Combobox.Listbox ref={setScroll} style={{ height: 240 }}>
                <div
                  style={{
                    height: virtual.getTotalSize(),
                    position: "relative",
                  }}
                >
                  {virtual.getVirtualItems().map((row) => {
                    const option = options[row.index];
                    return (
                      <Combobox.Item
                        key={option.value}
                        value={option.value}
                        aria-setsize={options.length}
                        aria-posinset={row.index + 1}
                        style={{
                          position: "absolute",
                          insetInline: 0,
                          top: row.start,
                          height: row.size,
                        }}
                      >
                        {option.label}
                      </Combobox.Item>
                    );
                  })}
                </div>
                <Combobox.Empty>No matching projects</Combobox.Empty>
              </Combobox.Listbox>
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </Field.Root>
    </Frame>
  );
}
