import { RadioGroup, HStack } from "@flowstack-ui/brick";

export function RadioGroupTones() {
  return (
    <HStack gap="8" wrap="wrap">
      {(
        [
          "accent",
          "neutral",
          "contrast",
          "info",
          "success",
          "warning",
          "danger",
        ] as const
      ).map((value) => (
        <RadioGroup.Root
          key={value}
          aria-label={value}
          tone={value}
          defaultValue="one"
        >
          <RadioGroup.Item value="one">{value}</RadioGroup.Item>
          <RadioGroup.Item value="two">Alternative</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </HStack>
  );
}
