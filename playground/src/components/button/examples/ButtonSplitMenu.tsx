import {
  Button,
  ButtonGroup,
  DropdownMenu,
  IconButton,
} from "@flowstack-ui/brick";
import { ChevronDown } from "lucide-react";
export function ButtonSplitMenu() {
  return (
    <ButtonGroup attached size="sm" variant="outline" tone="neutral">
      <Button>Save changes</Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <IconButton aria-label="More save options">
            <ChevronDown />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content ariaLabel="Save options">
            <DropdownMenu.Item value="draft">
              <DropdownMenu.ItemLabel>Save as draft</DropdownMenu.ItemLabel>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </ButtonGroup>
  );
}
