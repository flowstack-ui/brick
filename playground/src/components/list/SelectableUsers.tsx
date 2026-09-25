import { useId, useState } from "react";
import { ActionDelegate, Button, Checkbox, For, List, Text, VStack, useSelection, useSelectionCheckbox, type SelectionState } from "@flowstack-ui/brick";

const users = [{ id: "ada", name: "Ada Chen", role: "Designer" }, { id: "lee", name: "Lee Morgan", role: "Engineer" }, { id: "sam", name: "Sam Rivera", role: "Administrator" }];
function UserRow({ user, selection, report }: { user: typeof users[number]; selection: SelectionState; report(message: string): void }) {
  const id = useId();
  const binding = useSelectionCheckbox({ selection, value: user.id, rangeSelection: true });
  return (
    <ActionDelegate targetId={id}>
      <List.Item selected={selection.isSelected(user.id)}>
        <List.Leading><Checkbox {...binding} aria-label={`Select ${user.name}`} /></List.Leading>
        <List.Content><List.Title><Button variant="ghost" size="sm" id={id} onClick={() => report(`Opened ${user.name}`)}>{user.name}</Button></List.Title><List.Description>{user.role}</List.Description></List.Content>
        <List.Trailing><Button variant="outline" size="sm" onClick={() => report(`Message to ${user.name}`)}>Message</Button></List.Trailing>
      </List.Item>
    </ActionDelegate>
  );
}
export function SelectableUsers() {
  const selection = useSelection({ orderedKeys: users.map(user => user.id) });
  const [message, report] = useState("No user opened");
  return (
    <VStack gap="4">
      <Text role="status">{selection.selectedKeys.length} selected. {message}</Text>
      <List.Root marker="none" variant="divided" aria-label="Team members">
        <For each={users}>{user => <UserRow key={user.id} user={user} selection={selection} report={report} />}</For>
      </List.Root>
    </VStack>
  );
}
