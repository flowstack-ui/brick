import { RadioGroup, HStack } from "@flowstack-ui/brick";

export function RadioGroupSizes() {
  return (
    <HStack gap="8" wrap="wrap">
      {(["xs", "sm", "md", "lg"] as const).map((value) => (
        <RadioGroup.Root
          key={value}
          aria-label={value}
          size={value}
          defaultValue="one"
        >
          <RadioGroup.Item value="one">{value}</RadioGroup.Item>
          <RadioGroup.Item value="two">Alternative</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </HStack>
  );
}
