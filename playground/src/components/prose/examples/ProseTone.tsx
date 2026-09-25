import { For, Prose, VStack } from "@flowstack-ui/brick";

export function ProseTone() {
  return (
    <VStack gap={8}>
      <For each={["primary", "secondary", "inherit"] as const}>
        {(tone) => (
          <Prose key={tone} tone={tone}>
            <h3>{tone}</h3>
            <p>
              The body foreground can change without losing the heading
              hierarchy.
            </p>
          </Prose>
        )}
      </For>
    </VStack>
  );
}
