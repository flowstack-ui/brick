import { For, Text, VStack } from "@flowstack-ui/brick";

export function TextSizes() {
  return (
    <VStack gap={4}>
      <For
        each={
          [
            "caption",
            "body-sm",
            "body-md",
            "body-lg",
            "body-xl",
            "title-2xs",
            "title-xs",
            "title-sm",
            "title-md",
            "title-lg",
            "title-xl",
            "display-sm",
            "display-md",
            "display-lg",
            "display-xl",
          ] as const
        }
      >
        {(variant) => (
          <Text key={variant} variant={variant}>
            {variant}
          </Text>
        )}
      </For>
    </VStack>
  );
}
