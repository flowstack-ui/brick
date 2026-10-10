import { List } from "@flowstack-ui/brick";
export function ListOrdered() {
  return (
    <List.Root ordered density="none" inset="none" gap="2">
      <List.Item>Create a workspace</List.Item>
      <List.Item>Invite your team</List.Item>
      <List.Item>Start collaborating</List.Item>
    </List.Root>
  );
}
