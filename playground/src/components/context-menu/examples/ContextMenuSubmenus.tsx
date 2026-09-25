import { ContextMenu, Surface, For, Icon } from "@flowstack-ui/brick";
import { ArrowRight } from "lucide-react";
export function ContextMenuSubmenus() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Actions: right-click or press Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <For each={["default", "custom", "none"] as const}>
          {(kind) => (
            <ContextMenu.Sub key={kind}>
              <ContextMenu.SubTrigger
                value={kind}
                indicator={
                  kind === "none" ? null : kind === "custom" ? (
                    <Icon size="inherit">
                      <ArrowRight />
                    </Icon>
                  ) : undefined
                }
              >
                {kind}
              </ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item value="design">Design</ContextMenu.Item>
                <ContextMenu.Item value="engineering">
                  Engineering
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
          )}
        </For>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}
