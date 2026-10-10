import { HStack, Switch, VStack } from "@flowstack-ui/brick";

export function SwitchSizes() {
  return (
    <HStack gap="5" wrap="wrap">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <VStack key={size} align="center" gap="1">
          <Switch.Field size={size} defaultChecked>
            <Switch.Control />
            <Switch.Label>{size}</Switch.Label>
            <Switch.HiddenInput />
          </Switch.Field>
        </VStack>
      ))}
    </HStack>
  );
}
