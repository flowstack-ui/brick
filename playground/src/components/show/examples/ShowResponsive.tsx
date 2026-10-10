import { Show, Text } from "@flowstack-ui/brick";
export function ShowResponsive() {
  return (
    <Show from="md">
      <Text>Visible from the md viewport breakpoint.</Text>
    </Show>
  );
}
