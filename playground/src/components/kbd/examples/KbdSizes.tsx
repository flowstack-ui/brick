import { For, HStack, Kbd } from "@flowstack-ui/brick";
export function KbdSizes() {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Kbd key={size} size={size}>
            {size}
          </Kbd>
        )}
      </For>
    </HStack>
  );
}
