import { HStack, Switch } from "@flowstack-ui/brick";

export function SwitchVariants() {
  return (
    <HStack gap="6" wrap="wrap">
      {(["solid", "raised"] as const).map((variant) => (
        <Switch.Field key={variant} variant={variant} defaultChecked>
          <Switch.Control />
          <Switch.Label>{variant}</Switch.Label>
          <Switch.HiddenInput />
        </Switch.Field>
      ))}
    </HStack>
  );
}
