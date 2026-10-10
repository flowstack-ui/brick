import { List } from "@flowstack-ui/brick";
export function ListNested() {
  return (
    <List.Root density="none" inset="none" gap="2">
      <List.Item>Workspace settings</List.Item>
      <List.Item>
        Team permissions
        <List.Root
          marker="circle"
          density="none"
          inset="none"
          gap="2"
          nestedInset={{ initial: "5", md: "6" }}
        >
          <List.Item>Editors can update content</List.Item>
          <List.Item>Viewers have read-only access</List.Item>
        </List.Root>
      </List.Item>
      <List.Item>Billing preferences</List.Item>
    </List.Root>
  );
}
