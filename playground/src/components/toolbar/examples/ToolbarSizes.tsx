import { Toolbar, VStack } from "@flowstack-ui/brick";
export function ToolbarSizes() {
  return (
    <VStack gap="4" align="start">
      {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Toolbar.Root key={size} aria-label={size + " tools"} size={size}>
          <Toolbar.Button>{size}</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Share</Toolbar.Button>
        </Toolbar.Root>
      ))}
    </VStack>
  );
}
