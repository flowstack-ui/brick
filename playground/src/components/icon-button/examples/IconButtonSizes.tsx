import { IconButton, For, HStack } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonSizes() {
  return (
    <HStack gap="3" wrap>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <IconButton size={size} aria-label={`Action ${size}`}>
            <Search />
          </IconButton>
        )}
      </For>
    </HStack>
  );
}
