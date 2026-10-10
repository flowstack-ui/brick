import { IconButton, For, HStack } from "@flowstack-ui/brick";
import { Search } from "lucide-react";
export function IconButtonTones() {
  return (
    <HStack gap="3" wrap>
      <For
        each={
          [
            "neutral",
            "contrast",
            "accent",
            "info",
            "success",
            "warning",
            "danger",
          ] as const
        }
      >
        {(tone) => (
          <IconButton
            variant="subtle"
            tone={tone}
            aria-label={`Action ${tone}`}
          >
            <Search />
          </IconButton>
        )}
      </For>
    </HStack>
  );
}
