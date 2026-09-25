import { For, HStack, Status, VStack } from "@flowstack-ui/brick";
export function StatusSizes() {
  return (
    <VStack align="start" gap={4}>
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <HStack key={size} gap={8} wrap="wrap">
            <Status.Root size={size} tone="warning">
              <Status.Indicator />
              In review
            </Status.Root>
            <Status.Root size={size} tone="danger">
              <Status.Indicator />
              Error
            </Status.Root>
            <Status.Root size={size} tone="success">
              <Status.Indicator />
              Approved
            </Status.Root>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
