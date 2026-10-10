import { Button, For, HStack } from "@flowstack-ui/brick";
export function ButtonRadius() {
  return (
    <HStack gap="3" wrap="wrap">
      <For each={["none", "sm", "lg", "control", "full"] as const}>
        {(radius) => (
          <Button radius={radius} key={radius}>
            {radius}
          </Button>
        )}
      </For>
    </HStack>
  );
}
