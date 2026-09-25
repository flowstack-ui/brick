import { IconButton, For, HStack } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonVariants() {
  return (
    <HStack gap="3" wrap>
      <For
        each={
          [
            "solid",
            "soft",
            "subtle",
            "surface",
            "outline",
            "ghost",
            "plain",
          ] as const
        }
      >
        {(variant) => (
          <IconButton variant={variant} aria-label={`Action ${variant}`}>
            <Search />
          </IconButton>
        )}
      </For>
    </HStack>
  );
}
