import { For, HStack, Link } from "@flowstack-ui/brick";

export function LinkSizes() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Link key={size} href="#sizes" size={size}>
            {size}
          </Link>
        )}
      </For>
    </HStack>
  );
}
