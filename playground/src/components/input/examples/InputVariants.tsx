import { Frame, Input, VStack, type InputVariant } from "@flowstack-ui/brick";
const variants: InputVariant[] = [
  "outline",
  "surface",
  "soft",
  "subtle",
  "ghost",
  "plain",
  "underline",
];
export function InputVariants() {
  return (
    <Frame maxInlineSize="24rem">
      <VStack gap="4">
        {variants.map((variant) => (
          <Input
            key={variant}
            aria-label={variant}
            placeholder={variant}
            variant={variant}
          />
        ))}
      </VStack>
    </Frame>
  );
}
