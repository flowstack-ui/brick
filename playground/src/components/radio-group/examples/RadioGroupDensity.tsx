import { RadioGroup, HStack } from "@flowstack-ui/brick";

export function RadioGroupDensity() {
  return (
    <HStack gap="8" align="baseline" wrap="wrap">
      {(["comfortable", "compact"] as const).map((density) => (
        <RadioGroup.Root
          key={density}
          aria-label={density}
          density={density}
          labelPlacement="start"
          defaultValue="one"
        >
          <RadioGroup.Item value="one">{density}</RadioGroup.Item>
          <RadioGroup.Item value="two">Alternative</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </HStack>
  );
}
