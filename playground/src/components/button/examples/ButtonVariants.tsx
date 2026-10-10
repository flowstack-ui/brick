import { Button, For, HStack } from "@flowstack-ui/brick";
export function ButtonVariants() {
  return (
    <HStack gap="3" wrap="wrap">
      <For
        each={
          [
            "solid",
            "soft",
            "subtle",
            "surface",
            "outline",
            "ghost",
            "plain",
          ] as const
        }
      >
        {(variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        )}
      </For>
    </HStack>
  );
}
