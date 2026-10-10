import { Checkbox, For, VStack } from "@flowstack-ui/brick";
export function CheckboxVariants() {
  return (
    <VStack gap="3" align="start">
      <For each={["solid", "outline", "subtle"] as const}>
        {(variant) => (
          <Checkbox key={variant} variant={variant} defaultChecked>
            {variant}
          </Checkbox>
        )}
      </For>
    </VStack>
  );
}
