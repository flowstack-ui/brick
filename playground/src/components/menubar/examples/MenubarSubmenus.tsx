import { Menubar, For, Icon } from "@flowstack-ui/brick";
import { ArrowRight } from "lucide-react";
export function MenubarSubmenus() {
  return (
    <Menubar.Root aria-label="Actions">
      <Menubar.Menu value="file">
        <Menubar.Trigger>Actions</Menubar.Trigger>
        <Menubar.Content>
          <For each={["default", "custom", "none"] as const}>
            {(kind) => (
              <Menubar.Sub key={kind}>
                <Menubar.SubTrigger
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
                </Menubar.SubTrigger>
                <Menubar.SubContent>
                  <Menubar.Item value="design">Design</Menubar.Item>
                  <Menubar.Item value="engineering">Engineering</Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Sub>
            )}
          </For>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="undo">Undo</Menubar.Item>
          <Menubar.Item disabled value="redo">
            Redo
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
