import { ToggleGroup } from "@flowstack-ui/brick";
import { Bold, Italic } from "lucide-react";

export function ToggleGroupIcons() {
  return (
    <ToggleGroup.Root aria-label="Formatting">
      <ToggleGroup.Item value="bold" iconOnly aria-label="Bold">
        <Bold />
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic" iconOnly aria-label="Italic">
        <Italic />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
