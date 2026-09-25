import { Stack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackGaps() {
  return (
    <Stack direction="row" wrap gap={{ initial: 3, lg: 6 }} rowGap={2}>
      <For
        each={["Research", "Design", "Prototype", "Build", "Review", "Release"]}
      >
        {(label) => (
          <Stack.Item key={label} basis="8rem">
            <Surface inset="sm" level="subtle">
              <Text>{label}</Text>
            </Surface>
          </Stack.Item>
        )}
      </For>
    </Stack>
  );
}
