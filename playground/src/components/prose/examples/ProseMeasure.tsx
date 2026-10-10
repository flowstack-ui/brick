import { For, Prose, VStack } from "@flowstack-ui/brick";

export function ProseMeasure() {
  return (
    <VStack gap={8}>
      <For each={["narrow", "default", "wide", "reading", "none"] as const}>
        {(measure) => (
          <Prose key={measure} measure={measure}>
            <h3>{measure}</h3>
            <p>
              A reading measure limits line length when space allows. Each
              choice remains constrained by its parent, so narrow previews may
              look alike.
            </p>
          </Prose>
        )}
      </For>
    </VStack>
  );
}
