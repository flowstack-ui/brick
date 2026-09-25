import { Toolbar, VStack } from "@flowstack-ui/brick";
export function ToolbarSurfaces() {
  return (
    <VStack gap="4" align="start">
      {(["plain", "soft", "outline", "surface"] as const).map((variant) => (
        <Toolbar.Root
          key={variant}
          aria-label={variant + " tools"}
          variant={variant}
        >
          <Toolbar.Button>{variant}</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Share</Toolbar.Button>
        </Toolbar.Root>
      ))}
    </VStack>
  );
}
