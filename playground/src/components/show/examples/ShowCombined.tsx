import { Show, Text } from "@flowstack-ui/brick";
export function ShowCombined() {
  const hasTools = true;
  return (
    <Show when={hasTools}>
      <Show from="md">
        <Text>Available tools, visible on larger viewports.</Text>
      </Show>
    </Show>
  );
}
