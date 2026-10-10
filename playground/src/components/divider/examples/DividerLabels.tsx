import { Divider, For, VStack } from "@flowstack-ui/brick";

export function DividerLabels() {
  return (
    <VStack gap="6">
      <For each={["start", "center", "end"] as const}>
        {(labelAlign) => (
          <Divider key={labelAlign} labelAlign={labelAlign}>
            {labelAlign}
          </Divider>
        )}
      </For>
    </VStack>
  );
}
