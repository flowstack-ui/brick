import { Code, For, HStack } from "@flowstack-ui/brick";
export function CodeVariants() {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["subtle", "solid", "outline", "surface", "plain"] as const}>
        {(variant) => (
          <Code key={variant} variant={variant} tone="accent">
            {variant}
          </Code>
        )}
      </For>
    </HStack>
  );
}
