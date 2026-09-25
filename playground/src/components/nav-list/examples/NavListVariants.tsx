import { For, NavList, Stack } from "@flowstack-ui/brick";

export function NavListVariants() {
  return (
    <Stack direction={{ initial: "column", md: "row" }} gap="6">
      <For each={["soft", "solid", "outline", "ghost", "plain"] as const}>
        {(variant) => (
          <NavList.Root key={variant} aria-label={variant} variant={variant}>
            <NavList.List>
              <NavList.Item>
                <NavList.Link active href="#variants">
                  {variant}
                </NavList.Link>
              </NavList.Item>
              <NavList.Item>
                <NavList.Link href="#usage">Usage</NavList.Link>
              </NavList.Item>
            </NavList.List>
          </NavList.Root>
        )}
      </For>
    </Stack>
  );
}
