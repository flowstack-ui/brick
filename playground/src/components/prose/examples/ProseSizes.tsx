import { For, Prose, VStack } from "@flowstack-ui/brick";

export function ProseSizes() {
  return (
    <VStack gap={8}>
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Prose key={size} size={size}>
            <h2>{size}</h2>
            <p>
              The complete document scales together, keeping headings and
              supporting text in proportion.
            </p>
            <h3>A smaller heading</h3>
            <p>Details follow a clear reading rhythm.</p>
          </Prose>
        )}
      </For>
    </VStack>
  );
}
