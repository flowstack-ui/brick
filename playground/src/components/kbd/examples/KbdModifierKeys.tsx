import { HStack, Kbd } from "@flowstack-ui/brick";
export function KbdModifierKeys() {
  return (
    <HStack gap="3" wrap="wrap">
      <Kbd aria-label="Command">⌘</Kbd>
      <Kbd aria-label="Option">⌥</Kbd>
      <Kbd aria-label="Shift">⇧</Kbd>
      <Kbd aria-label="Control">⌃</Kbd>
    </HStack>
  );
}
