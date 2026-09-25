import { IconButton, Toolbar } from "@flowstack-ui/brick";
import { Bold, Italic, Undo2, Redo2 } from "lucide-react";
export function ToolbarBasic() {
  return (
    <Toolbar.Root aria-label="Document tools">
      <Toolbar.Button asChild>
        <IconButton
          aria-label="Undo"
          size="md"
          variant="ghost"
          tone="neutral"
          focusRing="inside"
        >
          <Undo2 />
        </IconButton>
      </Toolbar.Button>
      <Toolbar.Button asChild>
        <IconButton
          aria-label="Redo"
          size="md"
          variant="ghost"
          tone="neutral"
          focusRing="inside"
        >
          <Redo2 />
        </IconButton>
      </Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.ToggleGroup
        type="multiple"
        aria-label="Text style"
        defaultValue={["bold"]}
      >
        <Toolbar.ToggleItem value="bold" iconOnly aria-label="Bold">
          <Bold />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="italic" iconOnly aria-label="Italic">
          <Italic />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator />
      <Toolbar.Link href="#usage">Help</Toolbar.Link>
    </Toolbar.Root>
  );
}
