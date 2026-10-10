import { For, NavList, Stack } from "@flowstack-ui/brick";

export function NavListRadius() {
  return (
    <Stack direction={{ initial: "column", md: "row" }} gap="6">
      <For each={["none", "sm", "control", "full"] as const}>
        {(radius) => (
          <NavList.Root
            key={radius}
            aria-label={radius + " corners"}
            radius={radius}
          >
            <NavList.List>
              <NavList.Item>
                <NavList.Link active href="#radius">
                  {radius}
                </NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.Root>
        )}
      </For>
    </Stack>
  );
}
