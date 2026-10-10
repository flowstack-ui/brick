import { Tag, Check } from "lucide-react";
import { Chip, HStack, Icon } from "@flowstack-ui/brick";
export function ChipIcons() {
  return (
    <HStack gap={3}>
      <Chip.Root radius="control">
        <Chip.StartElement>
          <Icon>
            <Tag />
          </Icon>
        </Chip.StartElement>
        <Chip.Label>Design</Chip.Label>
      </Chip.Root>
      <Chip.Root radius="control">
        <Chip.Label>Verified</Chip.Label>
        <Chip.EndElement>
          <Icon>
            <Check />
          </Icon>
        </Chip.EndElement>
      </Chip.Root>
    </HStack>
  );
}
