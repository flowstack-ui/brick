import { Frame, Input, VStack, type InputSize } from "@flowstack-ui/brick";
const sizes: InputSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
export function InputSizes() {
  return (
    <Frame maxInlineSize="24rem">
      <VStack gap="4">
        {sizes.map((size) => (
          <Input key={size} aria-label={size} size={size} placeholder={size} />
        ))}
      </VStack>
    </Frame>
  );
}
