import { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  For,
  HStack,
  List,
  Text,
  VStack,
  useSelection,
  useSelectionCheckbox,
  type SelectionState,
} from "@flowstack-ui/brick";
const members = ["Ada", "Lee", "Sam"];
function Member({
  name,
  selection,
}: {
  name: string;
  selection: SelectionState;
}) {
  const binding = useSelectionCheckbox({ selection, value: name });
  return (
    <List.Item selected={selection.isSelected(name)}>
      <List.Leading>
        <HStack>
          <Checkbox {...binding} aria-label={`Select ${name}`} />
          <Avatar fallback={name[0]} alt={name} size="sm" />
        </HStack>
      </List.Leading>
      <List.Content>
        <List.Title>{name}</List.Title>
      </List.Content>
    </List.Item>
  );
}
export function ListSingleSelection() {
  const [filtered, setFiltered] = useState(false);
  const selection = useSelection({ orderedKeys: members, mode: "single" });
  return (
    <VStack gap="4">
      <Text role="status">
        Selected: {selection.selectedKeys.join(", ") || "none"}
      </Text>
      <Button variant="outline" onClick={() => setFiltered((value) => !value)}>
        {filtered ? "Show everyone" : "Hide Ada"}
      </Button>
      <List.Root marker="none" variant="bordered">
        <For each={filtered ? members.slice(1) : members}>
          {(name) => <Member key={name} name={name} selection={selection} />}
        </For>
      </List.Root>
    </VStack>
  );
}
