import { List } from "@flowstack-ui/brick";
export function ListMarkers() {
  return (
    <List.Root
      ordered
      marker="upper-roman"
      markerTone="muted"
      density="none"
      inset="none"
      gap="2"
    >
      <List.Item>Muted marker</List.Item>
      <List.Item markerTone="accent">Accent marker</List.Item>
      <List.Item markerTone="inherit">Marker matches the text</List.Item>
    </List.Root>
  );
}
