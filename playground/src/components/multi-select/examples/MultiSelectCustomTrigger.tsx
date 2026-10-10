import { MultiSelect, For, IconButton } from "@flowstack-ui/brick";
import { ChevronDown } from "lucide-react";
const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function MultiSelectCustomTrigger() {
  return (
    <MultiSelect.Root items={items}>
      <MultiSelect.Trigger unstyled asChild>
        <IconButton aria-label="Choose framework" variant="ghost">
          <ChevronDown />
        </IconButton>
      </MultiSelect.Trigger>
      <MultiSelect.Content disablePortal>
        <For each={items}>
          {(item) => (
            <MultiSelect.Item key={item.value} value={item.value}>
              <MultiSelect.ItemText>{item.label}</MultiSelect.ItemText>
              <MultiSelect.ItemIndicator />
            </MultiSelect.Item>
          )}
        </For>
      </MultiSelect.Content>
    </MultiSelect.Root>
  );
}
