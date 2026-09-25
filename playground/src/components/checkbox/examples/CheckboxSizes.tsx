import { Checkbox, For, VStack } from "@flowstack-ui/brick";
export function CheckboxSizes() {
  return (
    <VStack gap="3" align="start">
      <For each={["xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <Checkbox key={size} size={size} defaultChecked>
            {size}
          </Checkbox>
        )}
      </For>
    </VStack>
  );
}
