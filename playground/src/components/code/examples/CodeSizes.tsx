import { Code, For, HStack } from "@flowstack-ui/brick";
export function CodeSizes() {
  return (
    <HStack gap="4" wrap="wrap">
      <For each={["inherit", "xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <Code key={size} size={size}>
            {size}
          </Code>
        )}
      </For>
    </HStack>
  );
}
