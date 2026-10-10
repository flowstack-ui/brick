import { Button, For, Frame, Group } from "@flowstack-ui/brick";
export function GroupWrap() {
  return (
    <Frame maxInlineSize="18rem" asChild>
      <Group wrap="wrap" gap={3}>
        <For each={["Design", "Engineering", "Marketing", "Operations"]}>
          {(label) => (
            <Button key={label} variant="outline">
              {label}
            </Button>
          )}
        </For>
      </Group>
    </Frame>
  );
}
