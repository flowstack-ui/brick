import { IconButton, For, HStack } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonDisabled() {
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
          <IconButton
            disabled
            variant={variant}
            aria-label={`Unavailable ${variant}`}
          >
            <Search />
          </IconButton>
        )}
      </For>
    </HStack>
  );
}
