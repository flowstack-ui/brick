import { Select, For, IconButton } from "@flowstack-ui/brick";
import { ChevronDown } from "lucide-react";
const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];
export function SelectCustomTrigger() {
  return (
    <Select.Root items={items}>
      <Select.Trigger unstyled asChild>
        <IconButton aria-label="Choose framework" variant="ghost">
          <ChevronDown />
        </IconButton>
      </Select.Trigger>
      <Select.Content disablePortal>
        <For each={items}>
          {(item) => (
            <Select.Item key={item.value} value={item.value}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          )}
        </For>
      </Select.Content>
    </Select.Root>
  );
}
