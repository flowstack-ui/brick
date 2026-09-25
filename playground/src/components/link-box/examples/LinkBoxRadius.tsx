import { For, LinkBox, Stack, Surface } from "@flowstack-ui/brick";

export function LinkBoxRadius() {
  return (
    <Stack gap="6">
      <For each={["none", "sm", "surface", "full"] as const}>
        {(radius) => (
          <LinkBox.Root key={radius} radius={radius}>
            <Surface bordered inset="lg" radius={radius}>
              <LinkBox.Link href="#radius">{radius}</LinkBox.Link>
            </Surface>
          </LinkBox.Root>
        )}
      </For>
    </Stack>
  );
}
