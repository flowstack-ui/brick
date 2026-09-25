import { For, Heading, LinkBox, Stack, Surface } from "@flowstack-ui/brick";

export function LinkBoxVariants() {
  return (
    <Stack gap="6">
      <For each={["outline", "plain"] as const}>
        {(variant) => (
          <LinkBox.Root key={variant} variant={variant}>
            <Surface bordered inset="lg">
              <Heading level={3} variant="title-xs">
                <LinkBox.Link href="#variants">{variant}</LinkBox.Link>
              </Heading>
            </Surface>
          </LinkBox.Root>
        )}
      </For>
    </Stack>
  );
}
