import { Button, For, HStack } from "@flowstack-ui/brick";
export function ButtonSizes() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        )}
      </For>
    </HStack>
  );
}
