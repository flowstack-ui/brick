import { For, HStack, Link } from "@flowstack-ui/brick";

export function LinkVariants() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={["underline", "subtle", "plain"] as const}>
        {(variant) => (
          <Link key={variant} href="#variants" variant={variant}>
            {variant}
          </Link>
        )}
      </For>
    </HStack>
  );
}
