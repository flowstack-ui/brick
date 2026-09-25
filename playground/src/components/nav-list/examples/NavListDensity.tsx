import { For, NavList, Stack, Text, VStack } from "@flowstack-ui/brick";

export function NavListDensity() {
  return (
    <Stack direction={{ initial: "column", md: "row" }} gap="6">
      <For each={["comfortable", "compact"] as const}>
        {(density) => (
          <VStack key={density} gap="3">
            <Text>{density}</Text>
            <For each={["sm", "md", "lg"] as const}>
              {(size) => (
                <NavList.Root
                  key={size}
                  aria-label={density + " " + size}
                  density={density}
                  size={size}
                >
                  <NavList.List>
                    <NavList.Item>
                      <NavList.Link href="#sizes" active>
                        {size}
                      </NavList.Link>
                    </NavList.Item>
                  </NavList.List>
                </NavList.Root>
              )}
            </For>
          </VStack>
        )}
      </For>
    </Stack>
  );
}
