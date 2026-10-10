import { Toolbar, VStack } from "@flowstack-ui/brick";
export function ToolbarToggleRecipes() {
  return (
    <VStack gap="4" align="start">
      {(["neutral", "accent", "contrast"] as const).map((tone) => (
        <Toolbar.Root key={tone} aria-label={tone + " selection"}>
          <Toolbar.ToggleGroup
            aria-label={tone + " options"}
            tone={tone}
            variant="subtle"
            defaultValue="selected"
          >
            <Toolbar.ToggleItem value="selected">{tone}</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="other">Other</Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
        </Toolbar.Root>
      ))}
    </VStack>
  );
}
