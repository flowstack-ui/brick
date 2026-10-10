import { For, Icon, List } from "@flowstack-ui/brick";
import { CircleCheck } from "lucide-react";
export function ListIcons() {
  return (
    <List.Root marker="none" density="none" inset="none" gap="3">
      <For
        each={[
          "Accessible native semantics",
          "Independent content that can wrap onto another line while its icon stays aligned with the first line",
        ]}
      >
        {(text) => (
          <List.Item key={text}>
            <List.Leading>
              <Icon size="sm" tone="success">
                <CircleCheck />
              </Icon>
            </List.Leading>
            <List.Content>{text}</List.Content>
          </List.Item>
        )}
      </For>
    </List.Root>
  );
}
