import { Editable, For, VStack } from "@flowstack-ui/brick";
export function EditableSizes() {
  return (
    <VStack gap="4">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Editable.Root key={size} size={size} defaultValue={size}>
            <Editable.Preview />
            <Editable.Input aria-label={size} />
          </Editable.Root>
        )}
      </For>
    </VStack>
  );
}
