import { RadioGroup, HStack } from "@flowstack-ui/brick";

export function RadioGroupVariants() {
  return (
    <HStack gap="8" wrap="wrap">
      {(["solid", "outline", "subtle"] as const).map((value) => (
        <RadioGroup.Root
          key={value}
          aria-label={value}
          variant={value}
          defaultValue="one"
        >
          <RadioGroup.Item value="one">{value}</RadioGroup.Item>
          <RadioGroup.Item value="two">Alternative</RadioGroup.Item>
        </RadioGroup.Root>
      ))}
    </HStack>
  );
}
