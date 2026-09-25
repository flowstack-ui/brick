import { For, HStack, Kbd } from "@flowstack-ui/brick";
export function KbdVariants() {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["raised", "outline", "subtle", "plain"] as const}>
        {(variant) => (
          <Kbd key={variant} variant={variant}>
            {variant}
          </Kbd>
        )}
      </For>
    </HStack>
  );
}
