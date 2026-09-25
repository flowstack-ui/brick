import { Toggle, HStack } from "@flowstack-ui/brick";

export function ToggleDisabled() {
  return (
    <HStack gap="3">
      <Toggle disabled>Bold</Toggle>
      <Toggle disabled defaultPressed>
        Bold
      </Toggle>
    </HStack>
  );
}
