import { IconButton, For, HStack } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonRadius() {
  return (
    <HStack gap="3" wrap>
      <For each={["none", "sm", "control", "full"] as const}>
        {(radius) => (
          <IconButton
            variant="outline"
            radius={radius}
            aria-label={`Action ${radius}`}
          >
            <Search />
          </IconButton>
        )}
      </For>
    </HStack>
  );
}
