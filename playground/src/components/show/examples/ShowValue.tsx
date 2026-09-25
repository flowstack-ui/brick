import { Show, Text } from "@flowstack-ui/brick";
export function ShowValue() {
  const user: { name: string } | undefined = { name: "Ada" };
  return (
    <Show when={user} fallback={<Text>No user selected</Text>}>
      {(value) => <Text>Welcome, {value.name}</Text>}
    </Show>
  );
}
