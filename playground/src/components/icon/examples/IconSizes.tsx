import { Icon, HStack, VStack, Text, type IconSize } from "@flowstack-ui/brick";
const sizes: IconSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
export function IconSizes() {
  return (
    <VStack gap={6}>
      <HStack gap={4} wrap>
        {sizes.map((size) => (
          <VStack key={size} gap={2}>
            <Icon size={size}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </Icon>
            <Text>{size}</Text>
          </VStack>
        ))}
      </HStack>
      <HStack gap={2} style={{ fontSize: "2rem" }}>
        <Icon size="inherit">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </Icon>
        <Text style={{ fontSize: "inherit" }}>Saved</Text>
      </HStack>
    </VStack>
  );
}
